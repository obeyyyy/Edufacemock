
<script setup lang="ts">

import Jobapplciations from './Jobapplciations.vue';



</script>

<template>
  <body style="background-color: aliceblue;"> 
    <ul class="navbar"> <!--Navbar  -->
      <img alt="Vue logo" class="logo" src="./assets/edufacelogoo.jpg" width="150" />
      <div class="navbar-right">
        <li><a href="#contact">Inloggen</a></li>
        <li style="background-color: black; border-radius: 25px; padding: 5px;"><a style="color:white;" href="#about">Sign up</a></li>
      </div>
    </ul>
    <div class="container">
      <h1 class="header">
        <span class="other">Sluit je aan bij het</span><span class="green"> Eduface Team</span>
      </h1>
    </div>

    <div> 
      <Jobapplciations /> <!-- Calling/render the job application components, supposed to return a list of job applications. and if empty; nothing-->
    </div>
  </body>

</template>

<style scoped>
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
  position: fixed;
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
