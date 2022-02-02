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
    getUserInputToCreateTitleAndDescriptions();
}

const installInstruct = [];
let installInstructionContinued = true;

// Get input for description, installation instructions, usage information, contribution guidelines, and test instructions
function getUserInputToCreateInstallInstructions() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'instruction',
                message: 'Enter your install instruction step.',
            },
            {
                type: 'input',
                name: 'code',
                message: 'Please enter associated code with this step, if applicable else leave blank and press Enter.',
            },
            {
                type: 'input',
                name: 'nextStep',
                message: 'Do you have any more steps for install instruction ? Type \'Y\' Yes and \'N\' for No',
            },
        ])
        .then((data) => {
            installInstruct.push(data);
            if (data.nextStep.toUpperCase() !== 'Y') {
                installInstructionContinued = false;
                const fileNameTest = 'log1.txt';
                writeToFile(fileNameTest, JSON.stringify(installInstruct));
            }
            else {
                getUserInputToCreateInstallInstructions();
            }
        });
}

function getUserInputToCreateTitleAndDescriptions() {
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
                name: 'installations',
                message: 'Please enter \'Y\', if you have install instructions applicable for your readme doc.',
            },
        ])
        .then((data) => {
            // const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;
            if (data.installations.toUpperCase() === 'Y') {
                getUserInputToCreateInstallInstructions();
            }
            const fileName = 'log.txt';
            writeToFile(fileName, gm.generateMarkdown(data));
            const fileNameReadme = './Others/Readme.md';
            writeToFile(fileNameReadme, gm.generateMarkdown(data));
        });
}

// Function call to initialize app
init();
