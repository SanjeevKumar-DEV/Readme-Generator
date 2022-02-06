// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
let userData;
function Data(title) {
  this.title = title;
  this.formattedTitle;
  this.description;
  this.formattedDesc;
  this.installInstruction = [];
  this.formattedInstallInstruction;
}
let appProperties;

function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// Set Title
function setTitle() {
  appProperties = new Data(userData[0].title);
  appProperties.formattedTitle = `# ${appProperties.title}`;
}

// Set Descriptions
function setDesc() {
  appProperties.description = userData[0].description;
  appProperties.formattedDesc = '';
  // appProperties.formattedDesc = `# ${appProperties.description}`;
  const maxNumberOfCharsPerLine = 50;
  let descArray = appProperties.description.split(' ');
  let currentCountInLine = 0;
  let currentLine = '';
  descArray.forEach(element => {
    if (currentCountInLine == 0) {
      appProperties.formattedDesc += '\r\n> ';
      currentLine = '\r\n> ';
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
}
function setInstallInstruction() {
  appProperties.installInstruction = userData[1];
  appProperties.formattedInstallInstruction = '\r\n# Install Instructions';
  appProperties.installInstruction.forEach(element => {
    if(element.instruction.length > 0)
    {
      appProperties.formattedInstallInstruction += '\r\n- ' + element.instruction;
    }
    if(element.code.length > 0)
    {
      appProperties.formattedInstallInstruction += '\r\n' + '```' +  element.code + '```';
    } 
  });
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  userData = data;
  setTitle();
  setDesc();
  setInstallInstruction();
  return appProperties.formattedTitle + appProperties.formattedDesc + appProperties.formattedInstallInstruction;
}
module.exports = { generateMarkdown };
