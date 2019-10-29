const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

clear();
console.log(chalk.green(figlet.textSync('N U E',{horizontalLayout:'full'})))

const run = async () => {
    const credentials = await inquirer.askGithubCredentials();
    console.log(credentials);
}

run();