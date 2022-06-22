const webpack = require('./webpack');
const config = require('./webpack.config');


debugger;
const compiler = webpack(config);
compiler.run((err,stats) => {
    console.log(stats.toJson({
        assets:true,
        chunks:true,
        modules:true
    }))
})