const fs = require('fs');
const path = require('path');

function clientFile(routeName) {
    const layout = path.join(__dirname, 'frontend', 'src', 'index.client.js');
    const file = fs.readFileSync(layout, 'utf8').toString();
    const init = file.indexOf('//app_ref')
    const txt = file.slice(0, init) + `import App from "${routeName}";` + file.slice(init + 9);

    return txt
}

function copyFrontendFolder() {
    const frontendPath = path.join(__dirname, 'frontend');
    const tmpPath = path.join(__dirname, 'tmp');
    const frontendBuildPath = path.join(frontendPath, 'build');
    const tmpBuildPath = path.join(tmpPath, 'build');

    fs.copyFileSync(frontendPath, tmpPath);
    fs.copyFileSync(frontendBuildPath, tmpBuildPath);
}

function createFiles() {
    const routesPath = fs.readdirSync(path.resolve(__dirname, "frontend/src/routes"));
    routesPath.forEach((route) => {
        const _route = `./routes/${route}`
        const tmpRoute = path.join(__dirname, 'tmp');
        const routePages = path.join(tmpRoute, `index.${route.slice(0, -3)}.js`);
        
        fs.writeFileSync(routePages, clientFile(_route))
    })
}
createFiles()
