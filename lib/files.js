const fse = require('fs-extra');
const fs = require('./fs');
const path = require('path');
const base = process.cwd();

module.exports = {
    getCurrentDirectory: () => {
        return path.basename(process.cwd());
    },

    createProject: async (options) => {
        return new Promise(async (resolve, reject) => {
            let name = options.projectname;
            let route = path.join(base, name);
            fse.mkdirs(route, async (err) => {
                if (err) return console.error(err);
                await fs.createFolder(path.join(route, "/src"));
                let folders = ["layouts", "components", "meta", "pages", "scripts", "styles"]
                folders.forEach(async name => {
                    fse.mkdirs(`${path.join(route, "/src")}/${name}`, async (err) => {
                        if (err) return console.error(err);
                        await fse.writeFile(`${route}/src/pages/index.feno`, `doc: {\n\t<p>Hello, World!</p>\n}`, async (err) => {
                            if (err) return console.error(err);
                            let config_content = `{\n\toutDir: "",\n\tscriptsDir: "",\n\tstylesDir: ""\n}`
                            await fs.writeFile({ route: `${route}/feconfig.feno`, content: config_content });
                            await fs.writeFile({ route: `${route}/nodemon.json`, content: `{\n\t"ext": "feno"\n}` });
                            await fs.writeFile({ route: `${route}/index.js`, content: `const Feno = require('feno');\n\nFeno.run();` });
                            await fse.readFile(`./lib/package-json.json`, 'utf8', async (err, data) => {
                                if (err) return console.error(err);
                                data = data.replace(/\$name/, name);
                                data = data.replace(/\$description/, options.description);
                                data = data.replace(/\$author/, options.author);
                                fse.writeFile(`${route}/package.json`, data, err => {
                                    if (err) return console.error(err);
                                    fse.copy('./lib/README.md', `${route}/README.md`, err => {
                                        if (err) return console.error()
                                        resolve();
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    },

    folders: async () => {
        return new Promise(async (resolve, reject) => {
            await fs.createFolder(`${base}/src`);
            let folders = ["layouts", "components", "meta", "pages", "scripts", "styles"]
            await new Promise((resolve, reject) => {
                folders.forEach(name => {
                    fse.mkdirs(`${path.join(base, "/src")}/${name}`, (err) => {
                        if (err) return console.error(err);
                    })
                })
                resolve()
            })
            resolve();
        })
    },

    files: async () => {
        return new Promise(async (resolve, reject) => {
            await fs.writeFile({ route: `${base}/src/pages/index.feno`, content: `doc: {\n\t<p>Hello, World!</p>\n}` });
            let config_content = `{\n\toutDir: "",\n\tscriptsDir: "",\n\tstylesDir: ""\n}`
            await fs.writeFile({ route: `${base}/feconfig.feno`, content: config_content });
            await fs.writeFile({ route: `${base}/index.js`, content: `const Feno = require('feno');\n\nFeno.run();` });
            await fs.writeFile({ route: `${base}/nodemon.json`, content: `{\n\t"ext": "feno"\n}` });
            resolve();
        })
    },

    configfile: async () => {
        return new Promise(async (resolve, reject) => {
            let config_content = `{\n\toutDir: "",\n\tscriptsDir: "",\n\tstylesDir: ""\n}`
            await fs.writeFile({ route: `${base}/feconfig.feno`, content: config_content });
            resolve();
        })
    },

    nodemonfile: async () => {
        return new Promise(async (resolve, reject) => {
            await fs.writeFile({ route: `${base}/nodemon.json`, content: `{\n\t"ext": "feno"\n}` });
            resolve();
        })
    }
}