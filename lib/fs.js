const fse = require('fs-extra');

module.exports = {
    createFoldersOnPath: async (folders) => {
        return new Promise(async (resolve, reject) => {
            folders.names.forEach(name => {
                fse.mkdirs(`${folders.route}/${name}`, (err) => {
                    if (err) return console.error(err);
                })
            })
            resolve();
        })
    },

    createFolders: async (folders) => {
        return new Promise(async (resolve, reject) => {
            await folders.forEach(async folder => {
                fse.mkdirs(`${folder.path}`, (err) => {
                    if (err) return console.error(err);
                })
            })
            resolve();
        })
    },

    createFolder: async (folder) => {
        return new Promise(async (resolve, reject) => {
            fse.mkdirs(`${folder}`, (err) => {
                if (err) return console.error(err);
                resolve();
            })
        })
    },

    writeFiles: async (files) => {
        return new Promise(async (resolve, reject) => {
            files.forEach(file => {
                fse.writeFile(file.route, file.content, (err) => {
                    if (err) return console.error(err);
                })
            })
            resolve();
        })
    },

    writeFile: async (file) => {
        return new Promise(async (resolve, reject) => {
            fse.writeFile(file.route, file.content, (err) => {
                if (err) return console.error(err);
                resolve();
            })
        })
    }
}