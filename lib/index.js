/* --------------------
 * @overlook/plugin-order module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin');

// Imports
const pkg = require('../package.json');

// Exports

const orderPlugin = new Plugin(
	pkg,
	{symbols: ['TEMP']},
	extend
);

module.exports = orderPlugin;

const {TEMP} = orderPlugin; // eslint-disable-line no-unused-vars

function extend(Route) {
	return class orderRoute extends Route {
		// TODO Capitalize class name above
	};
}
