/* --------------------
 * @overlook/plugin-order module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(orderPlugin) {
	describe('symbols', () => {
		it.each([
			'ORDER'
		])('%s', (key) => {
			expect(typeof orderPlugin[key]).toBe('symbol');
		});
	});
};
