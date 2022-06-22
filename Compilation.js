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
        //
    }
}

module.exports = Compilation;