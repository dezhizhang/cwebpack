
const Compiler = require('./Compiler')

function webpack(options) {
    const argv = process.argv.slice(2);
    let shellOptions = argv.reduce((shellOptions) => {
        let [key,value] = options.split('=');
        shellOptions[key.slice(2)] = value;
        return shellOptions;
    },{});

    let finalOptions = {...options,...shellOptions}
    const compiler = new Compiler(options);

    //3加载所有配置的插件
    

}

module.exports = webpack;