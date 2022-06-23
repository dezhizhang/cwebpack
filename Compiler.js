
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
    run() {
        this.hooks.run.call();
        const onCompiled = () => {
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