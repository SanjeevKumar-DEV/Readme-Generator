// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
let userData;
function Data(title) {
  this.title = title;
  this.formattedTitle;
  this.description;
  this.formattedDesc;
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
  appProperties = new Data(userData.title);
  appProperties.formattedTitle = `# ${appProperties.title}`;
}

// Set Descriptions
function setDesc() {
  appProperties.description = userData.description;
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

    if ((currentLine + element + ' ').length < maxNumberOfCharsPerLine ) {
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

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  userData = data;
  setTitle();
  setDesc();
  return appProperties.formattedTitle + appProperties.formattedDesc;
}
module.exports = { generateMarkdown };
