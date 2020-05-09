/* --------------------
 * @overlook/plugin-order
 * Tests set-up
 * ------------------*/

'use strict';

/*
 * Throw any unhandled promise rejections
 */
process.on('unhandledRejection', (err) => {
	throw err;
});

/*
 * `expect(...).toHaveChildren(...)` custom matcher
 */
expect.extend({
	toHaveChildren(route, expectedChildren) {
		const {children} = route;

		let pass = true;
		if (expectedChildren.length !== children.length) {
			pass = false;
		} else {
			for (let i = 0; i < children.length; i++) {
				if (expectedChildren[i] !== children[i]) {
					pass = false;
					break;
				}
			}
		}

		const {utils} = this;
		return {
			message: () => `expected children ${utils.printReceived(children.map(c => c.name).join(', '))} to be ${utils.printExpected(expectedChildren.map(c => c.name).join(', '))}`,
			pass
		};
	}
});
