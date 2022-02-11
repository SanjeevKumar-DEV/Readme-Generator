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
        ])
        .then((data) => {
            readMeInputObject.push(data);
            const fileName = 'titleAndDesciption.txt';
            writeToFile(fileName, JSON.stringify(data));
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
                const fileName = 'usageInfo.txt';
                writeToFile(fileName, JSON.stringify(usageInfo));
                readMeInputObject.push(usageInfo);
                // console.log(readMeInputObject);
                prepareReadMeInput();
                getUserInputForContributing();
            }
            else {
                usageInfoCounter++;
                getUserInputForUsageInformation();
            }
        });
}

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
            const fileName = 'contributing.txt';
            writeToFile(fileName, JSON.stringify(contributing));
            readMeInputObject.push(contributing);
            // console.log(readMeInputObject);
            prepareReadMeInput();
            getUserInputOnHowToTestApplication();
        });
}

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
                const fileName = 'tests.txt';
                writeToFile(fileName, JSON.stringify(data));
                readMeInputObject.push(tests);
                // console.log(readMeInputObject);
                prepareReadMeInput();
                getUserInputOnLicenseRequirement();
            }
            else {
                testCounter++;
                getUserInputOnHowToTestApplication();
            }
        });

}

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
            const fileName = 'license.txt';
            writeToFile(fileName, JSON.stringify(data));
            readMeInputObject.push(license);
            console.log(readMeInputObject);
            prepareReadMeInput();
        });

}


function prepareReadMeInput() {
    const fileNameReadme = './Others/README.md';
    writeToFile(fileNameReadme, gm.generateMarkdown(readMeInputObject));
}

// Function call to initialize app
init();
