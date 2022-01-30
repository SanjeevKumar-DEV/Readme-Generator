// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function Data(title) {
  this.title = title;
}
let appProperties;

function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// Set Title
function setTitle(title) {
  appProperties = new Data(title);
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(title) {
  setTitle(title);
  return `# ${appProperties.title}`;
}

module.exports = {generateMarkdown};
