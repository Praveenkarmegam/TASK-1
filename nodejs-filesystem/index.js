const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000; // Define your port
const folderPath = path.join(__dirname, "public"); // Define the folder for storing files

// Check if the folder exists; if not, create it
if (!fs.existsSync(folderPath)) {
  console.log("Creating public folder");
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const timestamp = new Date(); // Get the current timestamp
  const fileName = `${timestamp.toISOString().replace(/:/g, "-")}.txt`; // Create a valid filename
  const filePath = path.join(folderPath, fileName); // Create the file path

  // Write the timestamp to the file
  fs.writeFile(filePath, timestamp.toISOString(), (err) => {
    if (err) {
      console.log("Error creating file", err);
      return res.status(500).json({ message: `Error writing file -${err}` });
    }
    res.json({ message: "File created successfully", fileName });
  });
});

// Endpoint to retrieve all the files in the public folder
app.get("/get-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log("Error reading file", err);
      return res.status(500).json({ message: `Error reading files -${err}` });
    }
    res.json({ message: "Files retrieved successfully", files });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
