const fs = require('fs');
const path = require('path');

const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
class Compiler{
    constructor(options) {
        this.options = options;
        this.hooks = {
            run:new SyncHook(),
            done:new SyncHook(),
        }
    }
    run(callback) {
        this.hooks.run.call();
        const onCompiled = (err,stats,fileDependencies) => {
            for(let filename in stats.assets) {
                let filePath = path.join(this.options.output.path,filename);
                fs.writeFileSync(filePath,stats.assets[filename],'utf-8');
            }

            callback(err,{
                toJson:() => stats
            })
            this.hooks.done.call();
        }
        // 开始编译
        this.compile(onCompiled);
    }
    compile(callback) {
        let compilation = new Compilation(this.options);
        compilation.build(callback)
    }
}

module.exports = Compiler;