const chalk = require('chalk');
const clear = require('clear');
const path = require('path');
const center = require('center-align');
const cli_version = require('./lib/v');

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

const help = `
    Usage: feno <command> [command-options]

    Commands:

      create-new        Create a new project from a template
      build             Generate production build of a feno project
      generate          Generate different things for feno
      help              Display help
      v, version        Display the version number

    Command Options:

      [create-new]
        name            Set name to the new project
      [generate]
        folders         Generate all folders to work with feno
        files           Generate all files to work with feno
        config          Generate configuration file for feno project
        nmfile          Generate nodemon configuration for feno project

`

clear();

const run = async () => {
    let order = argv._[0];
    if (order == 'create-new') {
        console.log(logo)
        console.log("Welcome to", chalk.green.bold("Feno CLI v1.0.0-beta"), "!")
        console.log("Prepare your new project:");
        const credentials = await inquirer.askPreferences();
        await files.createProject(credentials);
        clear();
        console.log("\u{1F98A}  Creating project in", path.join(process.cwd(), `/${credentials.projectname}`));
        console.log(`\u{1F389}  Successfully created project ${chalk.yellow(credentials.projectname)}`);
        console.log(`\u{1F449}  Get started with the following commands:`)
        console.log(`\n$ ${chalk.green(`cd ${credentials.projectname}`)}`)
        console.log(`$ ${chalk.green(`npm i`)}`);
        console.log(`$ ${chalk.green(`npm run dev`)}`);
        console.log(`\n${chalk.green.bold("Create something amazing!\n\n")}`);
    } else if (order == 'generate') {
        let option = argv._[1];
        if (option == 'folders') {
            await files.folders();
            console.log(`< \u{1F4E6}  Folders created successfully!`)
        } else if (option == 'files') {
            await files.files();
            console.log(`< \u{1F4E6}  Files created successfully!`)
        } else if (option == 'config') {
            await files.configfile();
            console.log(`< \u{1F4E6}  Config file created successfully!`)
        } else if (option == 'nmfile') {
            await files.nodemonfile();
            console.log(`< \u{1F4E6}  Nodemon file created successfully!`)
        } else {
            console.log(help);
        }
    } else if (order == 'help') {
        console.log(help);
    } else if (order == 'v' || order == 'version') {
        console.log(chalk.green.bold(`Feno CLI v${cli_version}\n`));
    } else {
        console.log(help);
    }
}

run();