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

describe('Plugin', () => {
	it('is an instance of Plugin class', () => {
		expect(orderPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const OrderRoute = Route.extend(orderPlugin);
		expect(OrderRoute).toBeDirectSubclassOf(Route);
	});
});
