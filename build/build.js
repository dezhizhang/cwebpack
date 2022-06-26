
    (() => {
        var modules = ({
            "./src/index.js":(module) =>{
                console.log('hello');
            }
        });
        var cache = {};
        function require(moduleId) {
            var cachedModule = cache[moduleId];
            if(cachedModule !== undefined) {
                return cachedModule.exports;
            }
            var module = chche[moduleId] = {
                exports:{}
            };
            modules[moduleId](module,module.exports,require);
            return modules.exports;
           
        }
        var exports = {};
        console.log('hello');
    })();
    