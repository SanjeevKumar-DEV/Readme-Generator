// TODO: Include packages needed for this application
const fs = require('fs');
const gm = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
//let questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}

// TODO: Create a function to initialize app
function init() {
    getUserInputToCreateReadMeFileAndCallFileGenerator();
}

// Get input for description, installation instructions, usage information, contribution guidelines, and test instructions

function getUserInputToCreateReadMeFileAndCallFileGenerator() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter Title of this application.',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter description of this application.',
        },
        {
            type: 'input',
            //   message: 'What languages do you know?',
            name: 'installations',
            //   choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
            message: 'Please write install instructions as series of steps',
        },
    ])
    .then((data) => {
        // const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;
        const fileName = 'log.txt';
        fs.writeFile(fileName, JSON.stringify(data, null, '\t'), (err) =>
            err ? console.log(err) : console.log('Success!')
        );
        const fileNameReadme = './Others/Readme.md';
        writeToFile(fileNameReadme, gm.generateMarkdown(data));
    });
}

// Function call to initialize app
init();
