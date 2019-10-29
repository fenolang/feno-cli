const inquirer   = require('inquirer');
const files      = require('./files');
const argv = require('minimist')(process.argv.slice(2));

module.exports = {

  askGithubCredentials: () => {
    const questions = [
      {
        name: 'projectname',
        type: 'input',
        message: 'Enter your project name:',
        default: argv._[0] || files.getCurrentDirectory(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project name.';
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter your project description:',
        default: 'My awesome nue project',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project description.';
          }
        }
      },
      {
        name: 'username',
        type: 'input',
        message: 'Enter your username:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username.';
          }
        }
      },
      {
          name: 'type',
          type: 'checkbox',
          message: 'Select what type of project'
      }
    ];
    return inquirer.prompt(questions);
  },
}