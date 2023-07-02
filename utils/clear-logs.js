const fs = require('fs');
const path = require('path');

// Specify the directory to delete
const logDirectory = './logs';

// Delete the directory recursively
fs.rmdir(logDirectory, { recursive: true }, err => {
  if (err) {
    console.error(`Error deleting directory: ${err}`);
  } else {
    console.log(`Deleted directory: ${logDirectory}`);
  }
});
