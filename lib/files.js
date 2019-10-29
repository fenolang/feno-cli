const fse = require('fs-extra');
const path = require('path');

module.exports = {
    getCurrentDirectory: () => {
        return path.basename(process.cwd());
    }
}