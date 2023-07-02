const fs = require('fs');
const path = require('path');

// Specify the directory where log files are located
const logDirectory = './';

// Read the directory
fs.readdir(logDirectory, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
  } else {
    // Loop through each file in the directory
    files.forEach(file => {
      // Check if the file is a .log file
      if (path.extname(file) === '.log') {
        // Delete the file
        fs.unlink(path.join(logDirectory, file), err => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
          } else {
            console.log(`Deleted file: ${file}`);
          }
        });
      }
    });
  }
});
