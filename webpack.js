
const Compiler = require('./Compiler')

function webpack(options) {
    const argv = process.argv.slice(2);
    let shellOptions = argv.reduce((shellOptions) => {
        let [key,value] = options.split('=');
        shellOptions[key.slice(2)] = value;
        return shellOptions;
    },{});

    let finalOptions = {...options,...shellOptions}
    //2用上一步的配置对像初始化Compiler对像
    const compiler = new Compiler(options);

    //3加载所有配置的插件
    const { plugins  } = finalOptions;
    for(let plugin of plugins) {
        plugin.apply(compiler);
    }
    return compiler
}

module.exports = webpack;