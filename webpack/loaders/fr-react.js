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
  this.cacheable && this.cacheable();
  const { version, webpack } = this;
    // console.log(source)
  const options = {};

  validate(schema, options, {name: 'MyLoader'});

  const newSource = `
  /**
   * Loader API Version: ${version}
   * File path: ${path.join(this.resourcePath)}
   * Is this in "webpack mode": ${webpack}
   */
  /**
   * Original Source From Loader
   */
  ${source}`;
  // write new source
  const txt = fs.readFileSync(path.join(__dirname, 'test.txt'), 'utf8');
    fs.writeFileSync(path.join(__dirname, 'test.txt'), `${txt}\n${newSource}`, {
        // avoid override file
    });

  return `${newSource}`;
}