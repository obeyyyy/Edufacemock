const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");



// innit
const app = express(); 
app.use(bodyParser.json()); // invoke parsing method for json

// middleware between front and backend (using cors)
app.use(cors());


const db = new sqlite3.Database("./job_applications.db"); // This will create the db file in the backend directory

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY,
      title TEXT,
      company TEXT,
      location TEXT
    )
  `);
});



// fetch api 
app.get("/fetch-applications", (req, res) => {
  const filePath = path.join(__dirname, "mockapplications.json");

  // read the fetched file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Failed to fetch job applications while trying to read");
    } else {
      res.json(JSON.parse(data)); // Send mock job applications as JSON
    }
  });
});


// save a job application to the database
app.post("/save-application", (req, res) => {
  const { id, title, company, location } = req.body;

  // SQL query to insert the job application into the database
  const query = "INSERT INTO job_applications (id, title, company, location) VALUES (?, ?, ?, ?)";

  db.run(query, [id, title, company, location], function (err) {
    if (err) {
      res.status(500).send("Failed to save application");
    } else {
      res.send("Application saved successfully");
    }
  });
});

// Start the Express server
app.listen(3000, () => {
  console.log("Backend server running at http://localhost:3000");
  
});

// Debug endpoint to print the contents of the database
app.get("/debug-db", (req, res) => {
    const query = "SELECT * FROM job_applications"; // Query to fetch all rows
  
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching database contents for debugging: ", err);
        return res.status(500).send("Failed to fetch database contents for debugging");
      }
  
      // Print the contents of the database to the console
      console.log("Database contents:", rows);
  
      // Send the contents of the database as a JSON response
      res.json(rows);
    });
});