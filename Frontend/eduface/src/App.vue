<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import JobApplications from './Jobapplciations.vue';
import {iframeContent} from './iframeContent';

const inIframeView = ref(false); // State to track iframe on or off

</script>

<template>
  <div class="body">
    <ul class="navbar">
      <img alt="logo" class="logo" src="./assets/edufacelogoo.jpg" width="150" />
      <div class="navbar-right">
        <li><a>Inloggen</a></li>
        <li style="background-color: black; border-radius: 25px;">
          <a style="color:white;">Sign up</a>
        </li>
      </div>
    </ul>
    <div style="text-align: center; margin-top: 50px; padding: 10px;">
      <button  class="button"  @click="inIframeView = !inIframeView">
        {{ inIframeView ? 'Hide Iframe' : 'Show Iframe' }}
      </button>
    </div>
    <div v-if="inIframeView">
      <iframe
        :srcdoc="iframeContent"
        style="width: 90%; height: 500px; border: 1px solid #ccc;"
      ></iframe>
    </div>
    <div v-else>
      <div class="container">
        <h1 class="header">
          <span class="other">Sluit je aan bij het</span><span class="green"> Eduface Team</span>
        </h1>
      </div>
      <JobApplications/> <!-- render the JobApplication component-->
    </div>
  </div>
</template>
<style scoped>
iframe {
  display: block;
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
  width: 90%; /* Ensures iframe is responsive */
  height: 500px;
  margin: 0 auto; /* Centers iframe horizontally */
}

.body {
  overflow-x: hidden; /* Prevent horizontal scrolling */
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column; /* Adjust layout for smaller screens */
  align-items: center;
  width: 100%;
  padding: 10px;
}

.header {
  text-align: center;
  font-size: 3rem; /* Reduced font size for better scaling */
  font-weight:900;
  white-space: normal; /* Allow text wrapping on smaller screens */
  margin: 20px;
}

.other {
  font-weight: 600;
  color: rgb(16, 16, 72);
}

.green {
  font-weight: 600;
  color: rgb(1, 255, 39);
}

.navbar {
  list-style-type: none;
  position: relative; /* Changed to relative for better positioning on small screens */
  width: 100%;
  z-index: 1000;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap; /* Enables wrapping of elements for smaller screens */
  align-items: center;
  
}

.logo {
  display: block;
  width: 120px; /* Resize logo for smaller screens */
}

.navbar-right {
  display: flex;
  flex-wrap: wrap; /* Allows items to stack if needed */
  margin-left: auto;
  gap: 15px; /* Adjust gap for smaller screens */
}

.navbar li {
  list-style: none;
}

.navbar li a {
  display: block;
  color: black;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.5s ease;
}

.navbar li a:hover {
  cursor:pointer;
  background-color: black;
  border-radius: 25px;
  color: white;
}

.button{
    color:white;
    font-size: 1rem;
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

/* Responsive Media Queries */
@media (max-width: 768px) {
  .navbar {
  
    align-items: center;
  }

  .navbar-right {
    flex-direction: column;
    align-items: center;
  }

  .navbar li a {
    padding: 8px 10px;
    font-size: 0.9rem; /* Smaller font for mobile screens */
  }

  .header {
    font-size: 3rem; /* Adjust font size */
    margin: 15px;
  }

  .logo {
    width: 100px; /* Smaller logo */
  }

  iframe {
    width: 100%; /* Full width on smaller screens */
    height: 300px; /* Reduced height */
  }
}



@media (max-width: 480px) {
  .navbar {
    padding: 5px 10px;
  }

  .navbar li a {
    font-size: 0.8rem;
  }

  .header {
    font-size: 1.5rem; /* Further adjust font size */
  }

  iframe {
    height: 250px; /* Adjust iframe height for mobile */
  }
}
</style>

