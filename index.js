// TODO: Include packages needed for this application
const fs = require('fs');
const gm = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

// TODO: Create a function to initialize app
function init() { 
    let fileName = './Others/Readme.md';
    writeToFile(fileName, gm.generateMarkdown('Great Coding  Quiz.'));
}

// Function call to initialize app
init();
