<script>
import axios from "axios";
export default {
  data() {
    return {
      applications: [], // array to store applications
      loading: false, // loadig=ng bool
      error: null, // error state , might be needed
    };
  },
  methods: {
    // application getter from endpoints after being fetched from the mock lms api 
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
    if (!window._messageListenerAdded) {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.action === "saveApplication") {
        const application = this.applications.find(app => app.id === event.data.app.id);
        if (application) {
          this.saveApplication(application);
        } 
        else {
          console.error("Application not found.");
        }
      }
    });
    window._messageListenerAdded = true;  // prevent adding the listener multiple times and causes multiple messages requests
    }
  return this.applications; //return application list for normal view
  },
};
</script>
<template>
    <div style="width: auto; /* Ensures container is fully contained within the viewport */">
      <!-- display list of job applications -->
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{error}}</div>
      <ul  v-if="applications.length > 0" style="padding: 0;">
        <li class="card" v-for="app in applications" :key="app.id">
          <div class="header">
            <h2 class="title">{{ app.title }}</h2>
            <p1 class="description">Description of the job maybe..</p1>
          </div>
          <div>
          <p class="company">Company: {{ app.company }}</p>
          <p class="location">Location: {{ app.location }}</p>
          <p class="salary">Salary: 99,999 £ </p>    <!-- these new descriptions are for ui testing only, i know they aren't expected to be saved to database as well!-->
          <!--, but i was curious how extra description would look :) -->
        </div>
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
    grid-column: 2;
  }

  .card p{
    font-weight: 600;
    margin: 15px;
    gap:0;
    padding: 0;
  }
  header{
    grid-column: 1;
  }

  .title{ 
    color:rgb(2, 2, 82);
    font-weight: 600;
    font-size: 3rem;
    width: auto;
    padding:10px;
    
  }
  .card{
    display: grid;
    border-radius: 15px;
    width:auto;
    margin:30px;
    padding:20px;
    background-color: white;
    box-shadow: 1px 5px 30px 0px #6c6c746b;
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

  @media (max-width:950px) {
    .card{
      display:block !important;
      justify-items: center;
      width: min-content 654px;
    }
    .description p1{
      text-align: center;

    }

  }

  @media (max-width:375px) {
    .title{
      font-size: 1.5rem;
    }
    
    
  }
  </style>
  