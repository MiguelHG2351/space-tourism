const path = require("path");
const fs = require('fs');

module.exports = function getRoutes() {
    const routesPath = fs.readdirSync(path.resolve(__dirname, "../../frontend/src/routes"));
    
    const routesObj = routesPath.reduce((total, current) => {
        const location = path.resolve(__dirname, `../../frontend/src/routes/${current}`.slice(0, -3))
        return {...total, [current.slice(0, -3)]: ['webpack-hot-middleware/client?path=/__what&timeout=2000&reload=true',location]}
    }, {})

    return routesObj;
}
