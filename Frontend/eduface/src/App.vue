
<script setup lang="ts">
import { ref , computed} from 'vue'; // Vue's reactive variable
import Jobapplciations from './Jobapplciations.vue';
import { Style } from 'util';

const inIframeView = ref(true); // State to track iframe mode

// Create the iframe content dynamically
const iframeContent = computed(() => {
  const navbarHTML = document.querySelector('.navbar')?.outerHTML || '';
  const containerHTML = document.querySelector('.jobapp')?.outerHTML || '';

  const styles = `
    <style>
      .jobapp .error {
        color: red;
      }

      .jobapp ul{
      text-align:center;
      margin-right:35px;
      }

      .jobapp .company {
      font-weight:600;
        font-size:15px;
        
        grid-column:2;
      }
        .jobapp .description{
        margin-bottom:auto;
        font-size:8px;
        }

      .jobapp .card {
        place-self: center;
        display: flex-box;
        border-radius: 15px;
        margin: 5px;
        width: 180px;
        padding: 15px;
        background-color: white;
        box-shadow: 5px 1px 20px #c7c6c6;
        list-style-type: none;
      }

      .jobapp .title {
        color: rgb(2, 2, 82);
        font-weight: 600;
        font-size: 1.8rem;
      
    
      }
        .jobapp .location{
        font-weight:600;
        
        }

      .jobapp .button {
        
        text-decoration: double;
        border-color: white;
        background-color: rgb(35, 200, 60);
        padding: 5px;
        border-radius: 15px 5px;
        font-size:10px;
      }

      .button:hover {
        cursor: pointer;
        background-color: rgb(16, 16, 72);
        color: white;
      }

      .button p {
        margin-top: 10px;
        font-size: larger;
        font-weight: 600;
      }
    </style>
  `;

  return `
    <html>
      <head>${styles}</head>
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
        ${containerHTML}
      </body>
    </html>
  `;
});

</script>

<template>
  <body style="background-color: aliceblue;">
    <ul class="navbar"> <!--Navbar-->
      <img alt="logo" class="logo" src="./assets/edufacelogoo.jpg" width="150" />
      <div class="navbar-right">
        <li style=" padding: 5px;"><a href="#contact">Inloggen</a></li>
        <li style="background-color: black; border-radius: 25px; padding: 5px;">
          <a style="color:white;" href="#about">Sign up</a>
        </li>
      </div>
    </ul>

    <!-- Button to toggle iframe view -->
    <div style="text-align: center; margin-top: 50px;">
      <button @click="inIframeView = !inIframeView" style="padding: 10px 20px; border-radius: 5px; background: green; color: white;">
        Toggle Inframe
      </button>
    </div>

    <!-- Show iframe or normal content -->
    <div v-if="inIframeView" style="margin-top: 20px;">
      <iframe
    src="https://localhost:5173"
    style="width: 80%; height: 500px; border: 1px solid #ccc;":srcdoc="iframeContent" />
    </div>
    <div v-else>
      <div class="container">
        <h1 class="header">
          <span class="other">Sluit je aan bij het</span><span class="green"> Eduface Team</span>
        </h1>
      </div>

      <div class="jobapp">
        <Jobapplciations />
      </div>
    </div>
  </body>
</template>
<style scoped>
iframe {
  border: 1px solid #000;
  border-radius: 10px;
}

body {
  margin: 0;
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
  font-weight: bold;
  white-space: nowrap; /* Prevents text from wrapping */
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
  position:absolute;
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
