// TODO: Include packages needed for this application
const fs = require('fs');
const gm = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
let readMeInputObject = [];
// let installInstructionContinued = true;
let installInstruct = [];

// TODO: Create an array of questions for user input
//let questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : 'Success!'
    );
}

// TODO: Create a function to initialize app
function init() {
    getUserInputForAppRepositoryInformation();
}

function getUserInputForAppRepositoryInformation() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'applicationName',
                message: 'Welcome to README.md generator. Please enter repo name of this application.',
            },
            {
                type: 'input',
                name: 'repoURL',
                message: 'Please enter repository URL for this application.',
            },
        ])
        .then((data) => {
            readMeInputObject.push(data);
            const fileName = 'repo.txt';
            writeToFile(fileName, JSON.stringify(data));
            prepareReadMeInput();
            getUserInputToCreateTitleAndDescriptions();
        })
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
            readMeInputObject.push(data);
            const fileName = 'titleAndDesciption.txt';
            writeToFile(fileName, JSON.stringify(data));
            if (data.installations.toUpperCase() === 'Y') {
                getUserInputToCreateInstallInstructions();
            }
        })
}

let instructionStep = 1;

// Get input for description, installation instructions, usage information, contribution guidelines, and test instructions
function getUserInputToCreateInstallInstructions() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'instruction',
                message: `Enter your install instruction step ${instructionStep} .`,
            },
            {
                type: 'input',
                name: 'code',
                message: `Please enter associated code with this step ${instructionStep}, if applicable else leave blank and press Enter.`,
            },
            {
                type: 'input',
                name: 'nextStep',
                message: 'Do you have more steps for install instructions as part of your readme ? Type \'Y\' Yes and \'N\' for No',
            },
        ])
        .then((data) => {
            installInstruct.push(data);
            if (data.nextStep.toUpperCase() !== 'Y') {
                // installInstructionContinued = false;
                const fileNameTest = 'installInstruct.txt';
                writeToFile(fileNameTest, JSON.stringify(installInstruct));
                readMeInputObject.push(installInstruct);
                // console.log(readMeInputObject);
                prepareReadMeInput();
                getUserInputForUsageInformation();
            }
            else {
                instructionStep++;
                getUserInputToCreateInstallInstructions();
            }
        });
}

let usageInfoCounter = 1;
let usageInfo = [];

function getUserInputForUsageInformation() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'usageDesc',
                message: `Enter your uasge instruction step ${usageInfoCounter} .`,
            },
            {
                type: 'input',
                name: 'altText',
                message: `If there is any image associated with this usage step ${usageInfoCounter}, please enter alt image name of it, if applicable else leave blank and press Enter.`,
            },
            {
                type: 'input',
                name: 'imageLocation',
                message: `Please enter associated image location with this step ${instructionStep}, if applicable else leave blank and press Enter.`,
            },
            {
                type: 'input',
                name: 'nextStep',
                message: 'Do you have more steps for uasge instructions ? Type \'Y\' Yes and \'N\' for No',
            },
        ])
        .then((data) => {
            usageInfo.push(data);
            if (data.nextStep.toUpperCase() !== 'Y') {
                // installInstructionContinued = false;
                const fileName = 'usageInfo.txt';
                writeToFile(fileName, JSON.stringify(usageInfo));
                readMeInputObject.push(usageInfo);
                console.log(readMeInputObject);
                prepareReadMeInput();
            }
            else {
                usageInfoCounter++;
                getUserInputForUsageInformation();
            }
        });
}


function prepareReadMeInput() {
    const fileNameReadme = './Others/README.md';
    writeToFile(fileNameReadme, gm.generateMarkdown(readMeInputObject));
}

// Function call to initialize app
init();
