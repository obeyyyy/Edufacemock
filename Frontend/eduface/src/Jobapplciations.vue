
<template>
    <div>
      <h1>Job Applications</h1>
  
      <!-- display list of job applications -->
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <ul v-if="applications.length > 0">
        <li v-for="app in applications" :key="app.id">
          <h2>{{ app.title }}</h2>
          <p>Company: {{ app.company }}</p>
          <p>Location: {{ app.location }}</p>
          <button @click="saveApplication(app)">Save to Database</button>
        </li>
      </ul>
  
      <div v-if="applications.length === 0 && !loading">
        <p>No job applications available.</p>
      </div>
    </div>
  </template>  
  <script>


  import axios from "axios";
  export default {
    data() {
      return {
        applications: [], // Array to store fetched applications
        loading: false,    // For loading state
        error: null,       // For error handling
      };
    },
    methods: {
      // fetch job applications from the api
      async fetchApplications() {
        this.loading = true;
        try {
          const response = await axios.get("http://localhost:3000/fetch-applications");
          this.applications = response.data; // Store the fetched data
        } catch (err) {
          this.error = "Failed to fetch job applications"; // Handle errors
        } finally {
          this.loading = false;
        }
      },
  
      // Save the job application to the database
      async saveApplication(app) {
        try {
          const response = await axios.post("http://localhost:3000/save-application", app);
          alert(response.data); // Show alert message
        } catch (err) {
          alert("Failed to save the application");
        }
      }
    },
    mounted() {
      this.fetchApplications(); // Fetch applications when the component is mounted
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  