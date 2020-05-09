/* --------------------
 * @overlook/plugin-order module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(orderPlugin) {
	describe.skip('methods', () => { // eslint-disable-line jest/no-disabled-tests
		it.each([
			'TEMP'
		])('%s', (key) => {
			expect(orderPlugin[key]).toBeFunction();
		});
	});

	describe('symbols', () => {
		it.each([
			'TEMP'
		])('%s', (key) => {
			expect(typeof orderPlugin[key]).toBe('symbol');
		});
	});
};
