/* --------------------
 * @overlook/plugin-order module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import Plugin from '@overlook/plugin';
import orderPlugin, * as namedExports from '@overlook/plugin-order/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => {
	it('default export is an instance of Plugin class', () => {
		expect(orderPlugin).toBeInstanceOf(Plugin);
	});

	describe('default export has properties', () => {
		itExports(orderPlugin);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});
