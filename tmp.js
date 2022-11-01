const fs = require('fs');
const path = require('path');

function prodTemplate(filename) {
    return (
        `
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from '~/components/Layout'
        import Component from '~/routes/${filename}'
        
        const domNode = document.getElementById('root')
        ReactDOM.hydrateRoot(domNode, <App Component={Component} />)
    `
    )
}

function devTemplate(filename) {
    return (
        
        `
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from '~/components/Layout'
        import Component from '~/routes/${filename}'
        
        const domNode = document.getElementById('root')
        ReactDOM.hydrateRoot(domNode, <App Component={Component} />)
    `
    )
}

function templateRender(filename) {
    const template = prodTemplate(filename.slice(0, -3))
    
    return template.split('\n').map(line => line.trim()).join('\n') 
}

function createFiles() {
    const routesPath = fs.readdirSync(path.resolve(__dirname, "frontend/src/routes"));
    routesPath.forEach((route) => {
        const tmpRoute = path.join(__dirname, 'build', 'tmp');
        const routePages = path.join(tmpRoute, `${route.slice(0, -3)}.js`);
        
        try {
            fs.writeFileSync(routePages, templateRender(route).trim())
        } catch {
            // create and add file
            fs.mkdirSync(tmpRoute);
            fs.writeFileSync(routePages, templateRender(route).trim());
        }
    })
}

createFiles()
console.log('rendering')
// console.log(templateRender('home.js'))
