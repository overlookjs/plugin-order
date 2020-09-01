/* --------------------
 * @overlook/plugin-order module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	orderPlugin = require('@overlook/plugin-order');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => {
	it('is an instance of Plugin class', () => {
		expect(orderPlugin).toBeInstanceOf(Plugin);
	});

	describe('has properties', () => {
		itExports(orderPlugin);
	});
});
