
<script>
  import axios from "axios";
  export default { data(){
      return {
        applications: [], // Array to store fetched applications
        loading: false,    // For loading state
        error: null,       // For error handling
      };
    },
    methods: { // functions that i will use //
     
      async fetchApplications() { // fetch job applications from the api, and thats by getting a response from the api, and pass it to the array.
        this.loading = true;
        try {
          const response = await axios.get("http://localhost:3000/fetch-applications"); // get response
          this.applications = response.data; // Store the data received
        } catch (err) {
          this.error = "Failed to fetch job applications"; // Handle errors
        } finally {
          this.loading = false;
        }
      },
  
      // Save the job application to the db
      async saveApplication(app) {
        
        try {
          const response = await axios.post("http://localhost:3000/save-application", app); // post the saved application to the db endpoint
          alert(response.data); // Show alert message
        } catch (err) {
          alert(err);
          
        }
      }
    },
    mounted() { // didn't understand mounted at first, but from looking up, it means, when dom is mounted/displayed/triggered? do whatever
      this.fetchApplications(); // Fetch applications when the component is mounted
    }
  };
  </script>
  


<template>
    <div>
      <!-- display list of job applications -->
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{error}}</div>
  
      <ul v-if="applications.length > 0">
        <li class="card" v-for="app in applications" :key="app.id">
          <div class="header">
            <h2 class="title">{{ app.title }}</h2>
            <p1 class="description">Description of the job maybe..</p1>
          </div>
          <p class="company">Company: {{ app.company }}</p>
          <p class="location">Location: {{ app.location }}</p>
          <p class="salary">Salary: 99,999 £ </p>    <!-- these new descriptions are for ui testing only, i know they aren't expected to be saved to database as well!-->
          <!--, but i was curious how extra description would look :) -->
          <button class="button"@click="saveApplication(app)"><p>Save to Database</p></button>
        </li>
      </ul>
  
      <div v-if="applications.length === 0 && !loading">
        <p>No job applications available at the moment!</p>
      </div>
    </div>
  </template>  
  
  <style scoped>
  .error {
    color: red;
  }

  .company{
    margin-top: 40px !important;
  }

  .card p{
    font-weight: 600;
    grid-column:2;
    margin: 5px;
    gap:0;
    margin-bottom: 20px;
    padding: 0;
  }
  header{
    grid-column: 1;
  }
  .description{
   
  }
  .title{ 
    color:rgb(2, 2, 82);
    font-weight: 600;
    font-size: 2.5rem;
    
  }
  .card{
    display: grid;
    border-radius: 15px;
    margin:15px;
    width:750px;
    padding:20px;
    background-color: white;
    box-shadow: 5px 1px 20px #c7c6c6;
    list-style-type: none;
  }

  .button{
    grid-column: 2;
    text-decoration: double;
    border-color: white;
    background-color: rgb(35, 200, 60);
    padding: 10px;
    border-radius: 15px 5px; /**  i added this button style by playing with random numbers and thought it looked cool*/
  }
  .button:hover{
    cursor: pointer;
    background-color:  rgb(16, 16, 72);
    color: white;
  }
  .button p{
    margin-top: 10px;
    font-size: larger;
    font-weight: 600;
  }
  </style>
  