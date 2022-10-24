const fs = require('fs');
const path = require('path');

function templateRender(filename) {
    const template = (
        `
        import React from 'react'
        import ReactDOM from 'react-dom'
        import App from '~/index.js'
        import Component from '~/routes/${filename}'
        
        const domNode = document.getElementById('root')

        ReactDOM.hydrateRoot(domNode, <App Component={Component} />)
        `
    )
    
    return template.split('\n').map(line => line.trim()).join('\n') 
}

function clientFile(routeName) {
    const layout = path.join(__dirname, 'frontend', 'src', 'index.client.js');
    const file = fs.readFileSync(layout, 'utf8').toString();

    return txt
}

function readFile() {
    const layout = path.join(__dirname, 'dist', 'index.home.js');
    const file = fs.readFileSync(layout, 'utf8')

    console.log(splitData.join('\n'))
}

function createFiles() {
    const routesPath = fs.readdirSync(path.resolve(__dirname, "frontend/src/routes"));
    routesPath.forEach((route) => {
        const tmpRoute = path.join(__dirname, 'dist');
        const routePages = path.join(tmpRoute, `index.${route.slice(0, -3)}.js`);
        
        fs.writeFileSync(routePages, templateRender(route).trim())
    })
}

createFiles()
// console.log(templateRender('home.js'))
