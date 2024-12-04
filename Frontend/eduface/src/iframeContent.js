// this js file has the iframe html content, and it communicates with the parent side by sending messages that the parent listens to
//then act upon its. it renders the ui and fetches the job app list from the endpoint on its own, But it leaves the saving 
// of job application to the database to the parent side to handle.
export const iframeContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <style> 
        .jobapp{justify-content:center; }
        .jobapp .error { color: red; }
        .jobapp ul { text-align: center; margin-right: 35px; }
        .jobapp .company {margin-top: 40px !important; font-weight: 600; font-size: 15px; grid-column: 2; }
        .jobapp .description { margin-bottom: auto; font-size: 8px; }
        .jobapp .card { display: flex-box; border-radius: 15px; margin:15px; gap:10px; width: 180px; padding: 15px; background-color: white; box-shadow: 5px 1px 20px #c7c6c6; list-style-type: none; }
        .jobapp .title { color: rgb(2, 2, 82); font-weight: 600; font-size: 1.8rem; }
        .jobapp .location { font-weight: 600; }
        .jobapp .button { text-decoration: double; border-color: white; background-color: rgb(35, 200, 60); padding: 5px; border-radius: 15px 5px; font-size: 10px; }
        .button:hover { cursor: pointer; background-color: rgb(16, 16, 72); color: white; }
        .button p { margin-top: 10px; font-size: larger; font-weight: 600; }
      </style>
    </head>
    <body style="padding:5px;">
     <body style="background-color: aliceblue; margin: 0; padding:10px;">
        <ul class="navbar" style="list-style: none; padding: 0; display: flex; align-items: center; font-size: small;">
          <img alt="logo" class="logo" src="../src/assets/edufacelogoo.jpg" width="50" />
          <div style="display: flex; margin-left: auto; gap: 5px;">
            <li style="list-style: none; padding: 5px;">
              <a href="#contact">Inloggen</a>
            </li>
            <li style="list-style: none; background-color: black; border-radius: 25px; padding: 5px;">
              <a style="color: white;" href="#about">Sign up</a>
            </li>
          </div>
        </ul>
        <span>Sluit je aan bij het</span><span style="color: green"> Eduface Team</span>
      <div class="jobapp">
        <div id="loading" style="text-align: center;">Loading...</div>
        <div id="error" style="color: red; display: none;">Failed to fetch job applications</div>
        <ul id="applications" style="list-style: none; padding: 0;"></ul>
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
                <p class="company">Company: \${app.company}</p>
                <p class="location">Location: \${app.location}</p>
                <p class="salary">Salary: \${app.salary || 'no salary available yet'}</p>
                <button class="button" onclick="saveApplication(\${JSON.stringify(app).replace(/"/g, '&quot;')})">
                  <p>Save to Database</p>
                </button>
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
