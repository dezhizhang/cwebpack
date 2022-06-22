class WebpckRunPlugin{
    apply(compiler) {
        compiler.hooks.run.tap('WebpckRunPlugin',() => {
            console.log('开始编译')
        })
    }
    run() {
        this.hooks.run.call();

        const onCompiled = () => {
            this.hooks.done.call();
        }
        
        this.compile(onCompiled)
    }
}

module.exports = WebpckRunPlugin;
