// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
let userData;
let singleNextLine = '\r\n';
let doubleNextLine = '\r\n\r\n';
let appProperties;
let readMe;

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
  // this.badge;
  this.formattedBadge = '';
  this.questions;
  this.formattedQuestions = `## Questions${doubleNextLine}`;
}
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

function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

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

function buildTableOfContents() {
  appProperties.tableOfContents = [];
  appProperties.tableOfContents.push({ name: 'Installation', link: '#Installation' });
  appProperties.tableOfContents.push({ name: 'Usage', link: '#Usage' });
  appProperties.tableOfContents.push({ name: 'Contributing', link: '#Contributing' });
  tableOfContentsFormattedArray = appProperties.tableOfContents.map(element => {
    return `- [${element.name}](${element.link})`;
  });
  appProperties.formattedTableOfContents += tableOfContentsFormattedArray.join('\r\n');
  appProperties.formattedTableOfContents += doubleNextLine;

}

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

function setLicense() {
  if (userData.length > 6) {
    if (userData[6].length > 0) {
      appProperties.license = userData[6];
      appProperties.formattedBadge += `![${appProperties.license[0].licenseInput}](${appProperties.badges.filter(element => {
        if (appProperties.license[0].licenseInput === element.name) { return true; }
      })[0].linkToBadge})${singleNextLine}`;
    }
    setLicenseText();
  }
}

function setLicenseText() {
  appProperties.formattedLicense += `< ${appProperties.license[0].notice + singleNextLine}`;
}


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  userData = data;
  return generateReadmeFileAsString();
}
module.exports = { generateMarkdown, createListOfBadges };
