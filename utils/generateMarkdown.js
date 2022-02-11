// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
let userData;
let singleNextLine = '\r\n';
let doubleNextLine = '\r\n\r\n';
let appProperties;
let readMe;

// Data Class to to store all inputs in one object

function Data(applicationName, repoURL) {
  this.applicationName = applicationName;
  this.repoURL = repoURL;
  this.title;
  this.formattedTitle = `# <Title-Of-My-Project>${doubleNextLine}`;
  this.description;
  this.formattedDesc = `## Description${doubleNextLine}`;
  this.tableOfContents;
  this.formattedTableOfContents = `## Table of Contents${doubleNextLine}`;
  this.installInstruction = [];
  this.formattedInstallInstruction = `## Installation${doubleNextLine}`;
  this.usage;
  this.formattedUsage = `## Usage${doubleNextLine}`;
  this.license;
  this.formattedLicense;
  this.contributing;
  this.formattedContributing = `## Contributing${doubleNextLine}`;
  this.tests;
  this.formattedTests = `## Tests${doubleNextLine}`;
  this.license;
  this.formattedLicense = `## License${doubleNextLine}`;
  this.badges = createListOfBadges();
  this.formattedBadge = '';
  this.questions;
  this.formattedQuestions = `## Questions${doubleNextLine}`;
  this.githubUsername;
  this.formattedGithubUserProfile = '';
  this.emailAddress;
  this.formattedEmailAddress = '';
}

// Creating list of licenses
function createListOfBadges() {
  {
    listOfBadges = [
      {
        name: 'Apache 2.0 License',
        version: '2.0',
        linkToBadge: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg'
      },
      {
        name: 'Boost Software License 1.0',
        version: '1.0',
        linkToBadge: 'https://img.shields.io/badge/License-Boost_1.0-lightblue.svg'
      },
      {
        name: 'BSD 3-Clause License',
        version: '3-Clause',
        linkToBadge: 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg'
      },
      {
        name: 'BSD 2-Clause License',
        version: '2-Clause',
        linkToBadge: 'https://img.shields.io/badge/License-BSD_2--Clause-orange.svg'
      },
      {
        name: 'GNU GPL v3',
        version: 'GPL v3',
        linkToBadge: 'https://img.shields.io/badge/License-GPLv3-blue.svg'
      }
    ]
    return listOfBadges;
  }

}

// Generating read me file as one String

function generateReadmeFileAsString() {
  appProperties = new Data(userData[0].applicationName, userData[0].repoURL);
  setLicense();
  setTitle();
  setDesc();
  buildTableOfContents();
  setInstallInstruction();
  setUsageInformation();
  setContributingInfo();
  setTestsInstructions();
  setGithubProfile();
  setEmailAddressAsContact();
  readMe = appProperties.formattedBadge + appProperties.formattedTitle + appProperties.formattedDesc + appProperties.formattedTableOfContents + appProperties.formattedInstallInstruction + appProperties.formattedUsage + appProperties.formattedContributing + appProperties.formattedTests + appProperties.formattedQuestions + appProperties.formattedLicense;
  return readMe;
}

// Set Title
function setTitle() {
  if (userData.length > 1) {
    appProperties.title = userData[1].title;
    appProperties.formattedTitle = `# ${appProperties.title}${doubleNextLine}`;
  }
}

// Set Descriptions
function setDesc() {
  if (userData.length > 1) {
    appProperties.description = userData[1].description;
    const maxNumberOfCharsPerLine = 50;
    let descArray = appProperties.description.split(' ');
    let currentCountInLine = 0;
    let currentLine = '';
    descArray.forEach(element => {
      if (currentCountInLine == 0) {
        appProperties.formattedDesc += '> '
        currentLine = '> ';
        currentCountInLine = currentLine.length;
      }

      if ((currentLine + element + ' ').length < maxNumberOfCharsPerLine) {
        appProperties.formattedDesc += element + ' ';
        currentLine += element + ' ';
        currentCountInLine = currentLine.length;
      }
      else {
        appProperties.formattedDesc += '\r\n> ' + element + ' ';
        currentLine = '\r\n> ' + element + ' ';
        currentCountInLine = currentLine.length;
      }

    });
    appProperties.formattedDesc += doubleNextLine;
  }
}

// Setting install instructions string for Readme file 
function setInstallInstruction() {
  if (userData.length > 2) {
    appProperties.installInstruction = userData[2];
    appProperties.installInstruction.forEach(element => {
      if (element.instruction.length > 0) {
        appProperties.formattedInstallInstruction += element.instruction + singleNextLine;
      }
      if (element.code.length > 0) {
        appProperties.formattedInstallInstruction += '```' + singleNextLine + element.code + singleNextLine + '```' + singleNextLine;
      }
    });
    appProperties.formattedInstallInstruction += singleNextLine;
  }
}

// Building table of Contents as clickable links 

function buildTableOfContents() {
  appProperties.tableOfContents = [];
  appProperties.tableOfContents.push({ name: 'Installation', link: '#Installation' });
  appProperties.tableOfContents.push({ name: 'Usage', link: '#Usage' });
  appProperties.tableOfContents.push({ name: 'Contributing', link: '#Contributing' });
  appProperties.tableOfContents.push({ name: 'Tests', link: '#Tests' });
  appProperties.tableOfContents.push({ name: 'Questions', link: '#Questions' });
  appProperties.tableOfContents.push({ name: 'License', link: '#License' });
  tableOfContentsFormattedArray = appProperties.tableOfContents.map(element => {
    return `- [${element.name}](${element.link})`;
  });
  appProperties.formattedTableOfContents += tableOfContentsFormattedArray.join('\r\n');
  appProperties.formattedTableOfContents += doubleNextLine;

}

// Setting application usage instructions as string for Readme file 

function setUsageInformation() {
  if (userData.length > 3) {
    if (userData[3].length > 0) {
      appProperties.usage = userData[3];

      appProperties.usage.forEach(element => {
        if (element.usageDesc !== '') {
          appProperties.formattedUsage += `> ${element.usageDesc} ${singleNextLine}`;
        }
        if (element.imageLocation !== '') {
          appProperties.formattedUsage += `![${element.altText}](${element.imageLocation}) ${singleNextLine}`;
        }

      });
    }
    appProperties.formattedUsage += singleNextLine;
  }

}

// Setting Contributing instruction string for Readme file with applicable links 

function setContributingInfo() {
  if (userData.length > 4) {
    if (userData[4].length > 0) {
      appProperties.contributing = userData[4];

      appProperties.contributing.forEach(element => {
        if (element.contributingText !== '') {
          appProperties.formattedContributing += `> ${element.contributingText} ${singleNextLine}`;
        }
        if (element.linkURL !== '') {
          appProperties.formattedContributing += `${singleNextLine}![${element.nameOfTheLink}](${element.linkURL}) ${singleNextLine}${singleNextLine}`;
        }

      });
    }
    appProperties.formattedContributing += singleNextLine;
  }
}

// Set Test instructions text as string for readme file 

function setTestsInstructions() {
  if (userData.length > 5) {
    if (userData[5].length > 0) {
      appProperties.tests = userData[5];

      appProperties.tests.forEach(element => {
        if (element.testStep !== '') {
          appProperties.formattedTests += `> ${element.testStep} ${singleNextLine}`;
        }
      });
    }
    appProperties.formattedTests += singleNextLine;
  }
}

// Set License text and badge as string for readme file

function setLicense() {
  if (userData.length > 6) {
    if (userData[6].length > 0) {
      appProperties.license = userData[6];
      appProperties.formattedBadge += `![${appProperties.license[0].licenseInput}](${appProperties.badges.filter(element => {
        if (appProperties.license[0].licenseInput === element.name) { return true; }
      })[0].linkToBadge})${singleNextLine}`;
      setLicenseText();
    }
  }
}

function setLicenseText() {
  appProperties.formattedLicense += `> ${appProperties.license[0].notice + singleNextLine}`;
}

// Set github profile link in the readme  profile

function setGithubProfile() {
  if (userData.length > 7) {
    if (userData[7] != 'undefined') {
      appProperties.githubUsername = userData[7];
      appProperties.formattedGithubUserProfile += `> Q1. What is my link to my github profile ? ${singleNextLine}Answer: [Github Username](https://github.com/${appProperties.githubUsername.githubUsername}) ${doubleNextLine}`;
      appProperties.formattedQuestions += appProperties.formattedGithubUserProfile;
    }
  }
}

// Set email contact as clickable link for readme file 

function setEmailAddressAsContact() {
  if (userData.length > 8) {
    if (userData[8] !== 'undefined') {
      appProperties.emailAddress = userData[8];
      appProperties.formattedEmailAddress += `> Q2. How to reach me with additional questions ? ${singleNextLine}Answer: [Contact Email](mailto:${appProperties.emailAddress.emailAddress})${doubleNextLine}`;
      appProperties.formattedQuestions += appProperties.formattedEmailAddress;
    }
  }
}


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  userData = data;
  return generateReadmeFileAsString();
}
module.exports = { generateMarkdown, createListOfBadges };
