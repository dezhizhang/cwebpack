const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

console.log('generator',generator)

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

            console.log('entryModule',entryModule);
        }
    }
    buildModule(name,modulePath) {
        //读取模块内容
      
        let sourceCode = fs.readFileSync(modulePath,'utf-8');
        // 获取模块id
        let moduleId = './' + path.posix.relative(baseDir,modulePath);
        //创建一个模块
        let module = {id:moduleId,name:[name],dependencies:[]}
        // //查找对应的loader
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
        },sourceCode);

        //再找到依赖的模块
        let ast = parser.parse(sourceCode,{sourceType:'module'});
        console.log('ast',ast);
        traverse(ast,{
            CallExpression(nodePath) {
                const { node } = nodePath;
                if(node.callee.name === 'require') {
                    let depModuleName = node.arguments[0].value;
                    let dirname = path.posix.dirname(modulePath);
                    let depModulePath = path.posix.join(dirname,depModuleName);
                    let extensions = this.options.resolve.extensions;
                    depModulePath = tryExtensions(depModulePath,extensions);
                    
                    let depModuleId = './' + path.posix.relative(baseDir,depModulePath);
                    node.arguments  = [types.stringLiteral(depModuleId)];
                    //添加依赖
                    module.dependencies.push({depModuleId,depModulePath});

                }
            }
        });
        //重新生成新的代码
        let { code } = generator(ast);
        //把转译后的源代码存放在module._source属性下
        module._source = code;
        
        //再递归本找到依赖的模块进行编译
        module.dependencies.forEach(({depModuleId,depModulePath}) => {
            let existModule = this.modules.find(item => item.id === depModuleId);
            if(existModule) {
                existModule.name.push(name);
            }else {
                let depModule = this.buildModule(name,depModulePath);
                this.modules.push(depModule);
            }
        });
        return module;
    }
}

function tryExtensions(modulePath,extensions) {
    if(fs.existsSync(modulePath)) {
        return modulePath;
    }
    for(let i=0;i < extensions.length;i++) {
        let filePath = modulePath + extensions[i];
        if(fs.existsSync(filePath)) {
            return filePath;
        }
    }
    throw new Error(`无法找到${modulePath}`);
}

module.exports = Compilation;