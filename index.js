const chalk = require('chalk');
const clear = require('clear');
const path = require('path');
const center = require('center-align');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const argv = require('minimist')(process.argv.slice(2));

var options = {
    fit: 'box',
    width: 15,
    height: 15
}

const logo = `
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMM++++++++++++NMsh+++++++++++mMM
MMMMMMMM           MMMs           MMMM
MMMMMMMM    MMMMMMMMMMs     MMMMMMMMMM
MMMMMMMM    MMMMMMMMMMs     MMMMMMMMMM
MMMMMMMM           MMMs           MMMM
MMMMMMMM    sssssssMMMs     MMMMMMMMMM
MMMMMMMM    MMMMMMMMMMs     MMMMMMMMMM
MMMMMMMM    MMMMMMMMMMs     NNNNNNNMMM
MMMMMMMM    MMMMMMMMMMs            MMM
MMMMMMMMhssshMMMMMMMMMMdsssssssssssmMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
`

clear();

const run = async () => {
    let order = argv._[0];
    if (order == 'create-new') {
        console.log(logo)
        console.log("Welcome to", chalk.green.bold("Feno CLI v1.0.0-beta"), "!")
        console.log("Prepare your new project:");
        const credentials = await inquirer.askGithubCredentials();
        await files.createProject(credentials);
        clear();
        console.log("\u{1F98A}  Creating project in", path.join(process.cwd(), `/${credentials.projectname}`));
        console.log(`\u{1F389}  Successfully created project ${chalk.yellow(credentials.projectname)}`);
        console.log(`\u{1F449}  Get started with the following commands:`)
        console.log(`\n$ ${chalk.green(`cd ${credentials.projectname}`)}`)
        console.log(`$ ${chalk.green(`npm i`)}`);
        console.log(`$ ${chalk.green(`npm run dev`)}`);
        console.log(`\n${chalk.green.bold("Create something amazing!\n\n")}`);
    } else {

    }
}

run();