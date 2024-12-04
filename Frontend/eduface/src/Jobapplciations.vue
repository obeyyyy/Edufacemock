<script>
import axios from "axios";
export default {
  data() {
    return {
      applications: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchApplications() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/fetch-applications");
        this.applications = response.data;
      } catch (err) {
        this.error = "Failed to fetch job applications";
      } finally {
        this.loading = false;
      }
    },

// save application to db by posting it to the db endpoint, then server.js will read it and insert 
// the application to the db if its not there already.
    async saveApplication(app) { 
      try {
        const response = await axios.post("http://localhost:3000/save-application", app);
        alert(response.data); // log
      } catch (err) {
        alert(err); 
      }
    },
  },

  mounted() {
    this.fetchApplications(); // fetch applications for normal ui
    window.addEventListener("message", (event) => { // listen for iframe message that is broadcasted when  save button is clicked
// Ensure the message is valid and not just any message
    if (event.data && event.data.action === "saveApplication") {
      // get the id of the application
      const applicationId = event.data.app.id;
      
// Find the application with the matching id
      const application = this.applications.find(app => app.id === applicationId);
      
      if (application) {
        this.saveApplication(application); // Save the matched application
      } else {
        console.error("Application with the given ID not found.");
      }
    }
  });
    return this.applications; //return application list for normal view
  },
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
    color:white;
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
  