const fs = require('fs');
const path = require('path');

function toUnixPath(path) {
    return path.replace(/\\/g,'/');
}

const baseDir = toUnixPath(process.cwd());

class Compilation{
    constructor(options) {
        this.options = options;
        this.modules = [];
        this.chunks = [];
        this.assets = [];
        this.fileDependencies = [];
    }
    build() {
        //5根据配置文件的entry的配置项找到所有的入口
        let entry = {};
        if(typeof this.options.entry === 'string') {
            entry.main = this.options.entry;
        }else {
            entry = this.options.entry;
        }
        //从入口文件出发，调用所有配置的loader
        for(let entryName in entry) {
            let entryFilePath = path.posix.join(baseDir,entry[entryName]);
            console.log('entryFilePath',entryFilePath);
        }
    }
}

module.exports = Compilation;