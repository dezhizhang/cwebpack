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
            //从入口文件出发，调用所有配置的loader规则
            let entryModule = this.buildModule(entryName,entryFilePath);

            console.log('entryFilePath',entryFilePath);
        }
    }
    buildModule(name,modulePath) {
        //读取模块内容
        let sourceCode = fs.readFileSync(modulePath,'utf-8');
        //查找对应的loader
        let loaders = [];
        let rules = this.options.module.rules || [];
        rules.forEach(rule => {
            let test = rule.test;
            if(modulePath.match(test)) {
                loaders.push(...rule.use);
            }
        });

        //自右向左对模块进行转换
        sourceCode = loaders.reduceRight((sourceCode,loader) => {
            return require(loader)(sourceCode);
        },sourceCode)

    }
}

module.exports = Compilation;