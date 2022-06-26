class WebpckRunPlugin{
    apply(compiler) {
        compiler.hooks.run.tap('WebpckRunPlugin',() => {
            console.log('开始编译')
        })
    }
}

module.exports = WebpckRunPlugin;
