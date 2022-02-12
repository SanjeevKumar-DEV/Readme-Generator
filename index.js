// TODO: Include packages needed for this application
const fs = require('fs');
const gm = require('./utils/generateMarkdown.js');
const inquirer = require('inquirer');
let readMeInputObject = [];
// let installInstructionContinued = true;
let installInstruct = [];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : 'Success!'
    );
}

// TODO: Create a function to initialize app and start capture of user input for readme file
function init() {
    getUserInputForAppRepositoryInformation();
}

// Capture application name, repository URL
function getUserInputForAppRepositoryInformation() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'applicationURL',
                message: 'Welcome to README.md generator. Please enter application URL of this application if applicable.',
            },
            {
                type: 'input',
                name: 'repoURL',
                message: 'Please enter repository URL for this application.',
            },
        ])
        .then((data) => {
            readMeInputObject.push(data);
            prepareReadMeInput();
            getUserInputToCreateTitleAndDescriptions();
        })
}

// Capture title and description input from user 

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
        ])
        .then((data) => {
            readMeInputObject.push(data);
            getUserInputToCreateInstallInstructions();
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
                readMeInputObject.push(installInstruct);
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

// Capture application usage information input from user

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
                message: `Please enter associated image location with this step ${usageInfoCounter}, if applicable else leave blank and press Enter.`,
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
                readMeInputObject.push(usageInfo);
                prepareReadMeInput();
                getUserInputForContributing();
            }
            else {
                usageInfoCounter++;
                getUserInputForUsageInformation();
            }
        });
}

// Capture contribution information as input from user

let contributing = [];
function getUserInputForContributing() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'contributingText',
                message: `If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. Enter guidelines text here.`,
            },
            {
                type: 'input',
                name: 'nameOfTheLink',
                message: `If there is a documentation link available for contribution process and guideline. Please enter name of that link and press Enter`,
            },
            {
                type: 'input',
                name: 'linkURL',
                message: `Please enter url of that link and press Enter.`,
            },
        ])
        .then((data) => {
            contributing.push(data);
            readMeInputObject.push(contributing);
            prepareReadMeInput();
            getUserInputOnHowToTestApplication();
        });
}

// Capture test instruction information as input from user

let tests = [];
let testCounter = 1;
function getUserInputOnHowToTestApplication() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'testStep',
                message: `If tests are applicable, Enter paragraph ${testCounter} or step ${testCounter} on how to test and press Enter.`,
            },
            {
                type: 'input',
                name: 'nextStep',
                message: `Do you have anymore text to be inserted on how to set up test instructions ? Type \'Y\' for Yes and \'N\' for No`,
            },
        ])
        .then((data) => {
            tests.push(data);
            if (data.nextStep.toUpperCase() !== 'Y') {
                readMeInputObject.push(tests);
                prepareReadMeInput();
                getUserInputOnLicenseRequirement();
            }
            else {
                testCounter++;
                getUserInputOnHowToTestApplication();
            }
        });

}

// Capture license information as input from user

let license = [];
let licenseOptions = gm.createListOfBadges().map((element) => { return element.name });
function getUserInputOnLicenseRequirement() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please choose license from list of options applicable to your application ?',
                name: 'licenseInput',
                choices: licenseOptions,
            },
            {
                type: 'input',
                name: 'notice',
                message: `Please enter text for license description or information this application is covered under.`,
            },
        ])
        .then((data) => {
            license.push(data);
            readMeInputObject.push(license);
            prepareReadMeInput();
            getUserInputToCaptureGithubUsername();
        });

}

// Capture github user information as input from user

function getUserInputToCaptureGithubUsername() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'githubUsername',
                message: `Please enter github username to make your github profile as part of your README.`,
            },
        ])
        .then((data) => {
            readMeInputObject.push(data);
            prepareReadMeInput();
            getUserInputToCaptureEmailAddress();
        });

}

// Capture email address information as input from user

function getUserInputToCaptureEmailAddress() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'emailAddress',
                message: `Please enter email address to be contacted on and be added to part of questions in README file.`,
            },
        ])
        .then((data) => {
            readMeInputObject.push(data);
            prepareReadMeInput();
        });

}

// prepare README.md doc

function prepareReadMeInput() {
    const fileNameReadme = './GeneratedReadme/README.md';
    writeToFile(fileNameReadme, gm.generateMarkdown(readMeInputObject));
}

// Function call to initialize app
init();
