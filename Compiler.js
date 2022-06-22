
const { SyncBailHook,SyncHook } = require('tapable');
class Compiler{
    constructor(options) {
        this.options = options;
        this.hooks = {
            run:new SyncHook(),
            done:new SyncHook(),
        }
    }
}

module.exports = Compiler;