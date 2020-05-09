/* --------------------
 * @overlook/plugin-order module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	Route = require('@overlook/route'),
	orderPlugin = require('@overlook/plugin-order');

// Init
require('./support/index.js');

// Tests

describe('Plugin', () => { // eslint-disable-line jest/lowercase-name
	it('is an instance of Plugin class', () => {
		expect(orderPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const OrderRoute = Route.extend(orderPlugin);
		expect(OrderRoute).toBeFunction();
		expect(Object.getPrototypeOf(OrderRoute)).toBe(Route);
		expect(Object.getPrototypeOf(OrderRoute.prototype)).toBe(Route.prototype);
	});
});
