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

  if(!ignoreFolders.some(folder => this.resourcePath.includes(folder))) {
    newSource = `
    /**
     * Loader API Version: ${version}
     * File path: ${path.join(this.resourcePath)}
     * Is this in "webpack mode": ${webpack}
     */
    /**
     * Original Source From Loader
     */
    ${source}`;
    const txt = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8');
      fs.writeFileSync(path.join(__dirname, 'test.txt'), `${txt}\n${newSource}`, {
          // avoid override file
      });
  }
  // write new source

  return `${newSource}`;
}