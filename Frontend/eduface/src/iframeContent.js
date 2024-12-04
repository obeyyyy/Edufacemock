// this js file has the iframe html content, and it communicates with the parent side by sending messages that the parent listens to
//then act upon its. it renders the ui and fetches the job app list from the endpoint on its own, But it leaves the saving 
// of job application to the database to the parent side to handle.
export const iframeContent = `
  <!DOCTYPE html>
  <html>
    <head>
       <style>
        body {
         font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          padding: 10px;
          margin: 5px;
          overflow-x: hidden;
          background-color: aliceblue;
        }
        .navbar {
          list-style: none;
          padding: 0;
          display: flex;
          align-items: center;
          font-size: small;
          width: 100%;
        }
        .navbar img.logo {
          display: block;
          width: 100px;
        }
        .navbar div {
          display: flex;
          margin-left: auto;
          gap: 10px;
        }
        .navbar li {
          list-style: none;
          padding: 5px;
        }
        .navbar li a {
          text-decoration: none;
          color: black;
          font-weight: 600;
        }
        .navbar li:nth-child(2) {
          background-color: black;
          border-radius: 25px;
          padding: 5px;
        }
        .navbar li:nth-child(2) a {
          color: white;
        }
        .jobapp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          padding: 10px;
          width:auto !important;
        }
        .jobapp .error {
          color: red;
        }
        .jobapp ul {
          text-align: center;
          margin-right: 35px;
          padding: 0;
        }
        .jobapp .card {
          display: grid;
          border-radius: 15px;
          width:auto;
          margin:30px;
          padding:20px;
          background-color: white;
          box-shadow: 1px 5px 30px 0px #6c6c746b;
         list-style-type: none;  
         
        }

        .header {
        text-align: center;
        font-size: 2rem; /* Reduced font size for better scaling */
        font-weight: 600;
        white-space: normal; /* Allow text wrapping on smaller screens */
        margin: 20px;
        }
        .jobapp .title {
          grid-column:1;
          color: rgb(2, 2, 82);
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 5px;
        }
        .jobapp .company {
          grid-column:2;
          margin-top: 20px !important;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: center;
        }
        .jobapp .description {
          grid-column:1;
          margin-bottom: auto;
          font-size: 0.8rem;
          color: #555;
        }
        .jobapp .location {
          grid-column:2;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .jobapp .button {
          grid-column:2;
          text-decoration: none;
          border: none;
          background-color: rgb(35, 200, 60);
          padding: 5px 10px;
          border-radius: 15px 5px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }
        .jobapp .button:hover {
          background-color: rgb(16, 16, 72);
          color: white;
        }
        .jobapp .button p {
          margin-top: 10px;
          font-size: 1rem;
          font-weight: 600;
        }
  
        @media (max-width: 480px) {
          .navbar {
            flex-direction: column;
            gap: 5px;
          }

          .jobapp .card {
            display:block !important;
            justify-items: center;
            width: min-content 654px;
            padding: 10px;
            box-shadow: 3px 1px 15px #c7c6c6;
          }
          .jobapp .title {
            font-size: 1.3rem;
          }
          .jobapp .button {
            font-size: 0.6rem;
            padding: 5px;
          }
            .jobapp{
            display: block;}
        }
      </style>
    </head>
    <body>
      <ul class="navbar">
        <img alt="logo" class="logo" src="../src/assets/edufacelogoo.jpg" />
        <div>
          <li>
            <a href="#contact">Inloggen</a>
          </li>
          <li>
            <a href="#about">Sign up</a>
          </li>
        </div>
      </ul>
      <div class="header">
      <span>Sluit je aan bij het</span><span style="color: rgb(1, 255, 39);"> Eduface Team</span>
      </div>
      <div class="jobapp">
        <div id="loading">Loading...</div>
        <div id="error" style="display: none;">Failed to fetch job applications</div>
        
        <ul id="applications"></ul>
        
      </div>
      <script> // FETCH APPLICATIONS TO DISPLAY ON LIST 
        async function fetchApplications() {
          const loadingElement = document.getElementById('loading');
          const errorElement = document.getElementById('error');
          const applicationsElement = document.getElementById('applications');

          loadingElement.style.display = 'block';
          errorElement.style.display = 'none';

          try {
            const response = await fetch("http://localhost:3000/fetch-applications");
            if (!response.ok) throw new Error('Failed to fetch applications');

            const applications = await response.json();
            loadingElement.style.display = 'none';

            applications.forEach(app => {
              const card = document.createElement('li');
              card.classList.add('card');
              card.innerHTML = \`
                <div class="header">
                  <h2 class="title">\${app.title}</h2>
                  <p class="description">\${app.description || 'no description available yet'}</p>
                </div>
                <div style="grid-column:2;">
                <p class="company">Company: \${app.company}</p>
                <p class="location">Location: \${app.location}</p>
                <p class="salary">Salary: \${app.salary || 'no salary available yet'}</p>
                <button class="button" onclick="saveApplication(\${JSON.stringify(app).replace(/"/g, '&quot;')})">
                  <p>Save to Database</p>
                </button>
                </div>
              \`;
              applicationsElement.appendChild(card); 
            });
          } catch (error) {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
          }
        } // SEND MESSAGE 'saveApplication' to parent side to handle the application saving to db
        function saveApplication(app) {
          window.parent.postMessage({ action: 'saveApplication',app}, '*');
        }
        fetchApplications();
      </script>
    </body>
  </html>
`;
