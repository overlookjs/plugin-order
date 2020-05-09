/* --------------------
 * @overlook/plugin-order module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	orderPlugin = require('@overlook/plugin-order');

// Init
require('./support/index.js');

// Tests

describe('Plugin', () => { // eslint-disable-line jest/lowercase-name
	it('is an instance of Plugin class', () => {
		expect(orderPlugin).toBeInstanceOf(Plugin);
	});
});
