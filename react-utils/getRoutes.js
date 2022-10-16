const path = require("path");
const fs = require('fs');

module.exports = function getRoutes() {
    const routesPath = fs.readdirSync(path.resolve(__dirname, "../frontend/src/routes"));
    
    const routesObj = routesPath.reduce((total, current) => {
        return {...total, [current.slice(0, -3)]: path.resolve(__dirname, `../frontend/src/routes/${current}`)}
    }, {})

    return routesObj;
}
