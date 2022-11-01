
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
// console.log(this)
  const options = {};

  validate(schema, options, {name: 'MyLoader'});

  const newSource = `
  /**
   * Loader API Version: ${version}
   * Is this in "webpack mode": ${webpack}
   */
  /**
   * Original Source From Loader
   */
  ${source}`;
  

  return `${newSource}`;
}