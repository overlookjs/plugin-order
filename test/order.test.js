/* --------------------
 * @overlook/plugin-order module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	orderedPlugin = require('@overlook/plugin-ordered'),
	{IS_BEFORE} = orderedPlugin,
	orderPlugin = require('@overlook/plugin-order');

// Init
require('./support/index.js');

// Tests

const OrderRoute = Route.extend(orderPlugin),
	OrderedRoute = Route.extend(orderedPlugin);

describe('orders children', () => {
	it('does nothing if no children', async () => {
		const root = new OrderRoute();
		await root.init();
		expect(root).toHaveChildren([]);
	});

	it('does nothing if 1 child', async () => {
		const root = new OrderRoute();
		const child = new OrderedRoute();
		root.attachChild(child);
		await root.init();
		expect(root).toHaveChildren([child]);
	});

	describe('with 2 routes', () => {
		let root, child1, child2;
		beforeEach(() => {
			root = new OrderRoute({name: 'root'});
			child1 = new OrderedRoute({name: 'child1'});
			child2 = new OrderedRoute({name: 'child2'});
			root.attachChild(child1);
			root.attachChild(child2);
		});

		it('in original order by default', async () => {
			await root.init();
			expect(root).toHaveChildren([child1, child2]);
		});

		it('in original order if `[IS_BEFORE]()` returns null', async () => {
			child1[IS_BEFORE] = () => null;
			child2[IS_BEFORE] = () => null;
			await root.init();
			expect(root).toHaveChildren([child1, child2]);
		});

		it('if 1st child indicates it is first', async () => {
			child1[IS_BEFORE] = () => true;
			await root.init();
			expect(root).toHaveChildren([child1, child2]);
		});

		it('if 1st child indicates it is last', async () => {
			child1[IS_BEFORE] = () => false;
			await root.init();
			expect(root).toHaveChildren([child2, child1]);
		});

		it('if 2nd child indicates it is first', async () => {
			child2[IS_BEFORE] = () => true;
			await root.init();
			expect(root).toHaveChildren([child2, child1]);
		});

		it('if 2nd child indicates it is last', async () => {
			child2[IS_BEFORE] = () => false;
			await root.init();
			expect(root).toHaveChildren([child1, child2]);
		});

		it('if both indicate 1st child is first', async () => {
			child1[IS_BEFORE] = () => true;
			child2[IS_BEFORE] = () => false;
			await root.init();
			expect(root).toHaveChildren([child1, child2]);
		});

		it('if both indicate 1st child is last', async () => {
			child1[IS_BEFORE] = () => false;
			child2[IS_BEFORE] = () => true;
			await root.init();
			expect(root).toHaveChildren([child2, child1]);
		});
	});

	describe('with 4 routes', () => {
		let root, child1, child2, child3, child4;
		beforeEach(() => {
			root = new OrderRoute({name: 'root'});
			child1 = new OrderedRoute({name: 'child1'});
			child2 = new OrderedRoute({name: 'child2'});
			child3 = new OrderedRoute({name: 'child3'});
			child4 = new OrderedRoute({name: 'child4'});
			root.attachChild(child1);
			root.attachChild(child2);
			root.attachChild(child3);
			root.attachChild(child4);
		});

		it('in original order by default', async () => {
			await root.init();
			expect(root).toHaveChildren([child1, child2, child3, child4]);
		});

		it('in original order if `[IS_BEFORE]()` returns null', async () => {
			child1[IS_BEFORE] = () => null;
			child2[IS_BEFORE] = () => null;
			child3[IS_BEFORE] = () => null;
			child4[IS_BEFORE] = () => null;
			await root.init();
			expect(root).toHaveChildren([child1, child2, child3, child4]);
		});

		describe('moves child to latest possible', () => {
			it('when new child declares it is before a sibling', async () => {
				child4[IS_BEFORE] = sibling => (sibling === child3 ? true : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child4, child3]);
			});

			it('when sibling declares it is after new child', async () => {
				child3[IS_BEFORE] = sibling => (sibling === child4 ? false : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child4, child3]);
			});

			it('when last child declares it is after a sibling', async () => {
				child4[IS_BEFORE] = sibling => (sibling === child1 ? false : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child3, child4]);
			});

			it('when sibling declares it is before last child', async () => {
				child1[IS_BEFORE] = sibling => (sibling === child4 ? true : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child3, child4]);
			});

			it('when new child declares it is after one sibling and before another', async () => {
				child4[IS_BEFORE] = sibling => (sibling === child1 ? false : null);
				child4[IS_BEFORE] = sibling => (sibling === child3 ? true : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child4, child3]);
			});

			it('when one sibling declares it is before new child and another sibling declares it is after', async () => {
				child1[IS_BEFORE] = sibling => (sibling === child4 ? true : null);
				child3[IS_BEFORE] = sibling => (sibling === child4 ? false : null);
				await root.init();
				expect(root).toHaveChildren([child1, child2, child4, child3]);
			});
		});
	});
});
