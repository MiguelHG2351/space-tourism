const path = require('path');
const fs = require('fs');
// const {  } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = {
	"type": "object",
	"properties": {
	  "name": {
		"type": "boolean"
	  }
	},
	"additionalProperties": false
  };

module.exports.raw = true;

module.exports = function loader(source) {
  const ignoreFolders = ['/src/routes/', 'dist/tmp/', 'build/'];
  this.cacheable && this.cacheable();
  const { version, webpack } = this;
    // console.log(source)
  const options = {};

  validate(schema, options, {name: 'MyLoader'});

  let newSource = source;

  if(this.resourcePath.includes('/src/routes/')) {
    const fileName = this.resourcePath.split('/src/routes/')[1];
    const componentName = fileName.replace(fileName[0], fileName[0].toUpperCase()).slice(0, -3);
    const hydrate = `import { hydrateRoot } from 'react-dom/client';\n`
    const app = `import App from '../components/Layout'\n`
    const removeExport = `export default ${componentName}`
    const layout = `hydrateRoot(document.getElementById('root'), <App Component={${componentName}} />)`
    console.log(componentName)

    newSource = hydrate + app + source

    newSource = newSource.replace(removeExport, layout)


    const txt = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8');
      fs.writeFileSync(path.join(__dirname, 'test.txt'), `${txt}\n${newSource}`, {
          // avoid override file
      });
  }
  // write new source

  return `${newSource}`;
}