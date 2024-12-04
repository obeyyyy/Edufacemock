<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import JobApplications from './Jobapplciations.vue';
import {iframeContent} from './iframeContent';

const inIframeView = ref(false); // State to track iframe on or off


</script>

<template>
  <div>
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
      <button @click="inIframeView = !inIframeView">
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
      <JobApplications/>
    </div>
  </div>
</template>

<style scoped>
iframe {
  border: 1px solid #000;
  border-radius: 10px;
}

body {
  margin: 2px;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
}

.header {
  text-align: center;
  font-size: 3rem; /* Adjust the font size */
  font-weight: 600;
  white-space: nowrap; /* Prevents text from wrapping */
  margin: 30px;
}

.other {
  font-weight:600; /* make the text bolder */
  color: rgb(16, 16, 72);
}

.green {
  font-weight:600;
  color: rgb(35, 200, 60);
}

.navbar {
  list-style-type: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  z-index: 1000; /* Ensures it stays above other elements */
  padding: 0 100px; /* Adds spacing on the sides */
  margin: 50px;
  display: flex; 
  align-items: center; 
}

.logo {
  display: block;
}

.navbar-right {
  display: flex; /* Aligns the text horizontally */
  margin-left: auto; /* Pushes the items to the right */
  gap: 50px; /* Adds space between the items */
}

.navbar li {
  list-style: none;
}

.navbar li a {  
  display: block;
  color: black;
  text-align: left;
  margin: 5px 35px; /* Adds padding for better spacing */
  text-decoration: none;
}

</style>

