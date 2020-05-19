/* --------------------
 * @overlook/plugin-order module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	{INIT_CHILDREN, DEBUG_ZONE} = require('@overlook/route'),
	{IS_BEFORE} = require('@overlook/plugin-ordered'),
	invariant = require('simple-invariant'),
	{isBoolean} = require('is-it-type');

// Imports
const pkg = require('../package.json');

// Exports

module.exports = new Plugin(
	pkg,
	{symbols: ['ORDER']},
	(Route, {ORDER}) => class OrderRoute extends Route {
		async [INIT_CHILDREN]() {
			await super[INIT_CHILDREN]();
			this[ORDER]();
		}

		[ORDER]() {
			// Ask each child if they should be before/after all their siblings and assemble graph
			const {children} = this;
			const relations = new Map();

			for (const child of children) {
				const childRelation = getRelation(child, relations);
				if (!child[IS_BEFORE]) continue;

				for (const other of children) {
					if (other === child) continue;

					// Ask child if before/after other
					child[DEBUG_ZONE](() => {
						const isBefore = child[IS_BEFORE](other);
						if (isBefore == null) return;

						invariant(
							isBoolean(isBefore),
							`[IS_BEFORE] must return true, false or null/undefined - received ${isBefore}`
						);

						const otherRelation = getRelation(other, relations);
						if (isBefore) {
							setBefore(childRelation, otherRelation);
						} else {
							setBefore(otherRelation, childRelation);
						}
					});
				}
			}

			// Reorder children
			children.sort((child1, child2) => {
				const relation1 = relations.get(child1),
					relation2 = relations.get(child2);

				if (relation1.after.has(relation2)) return -1;
				if (relation1.before.has(relation2)) return 1;
				return 0;
			});
		}
	}
);

function getRelation(route, relations) {
	let relation = relations.get(route);
	if (!relation) {
		relation = {before: new Set(), after: new Set()};
		relations.set(route, relation);
	}
	return relation;
}

function setBefore(relation1, relation2) {
	// If this relationship already recorded, skip
	if (relation1.after.has(relation2)) return;

	// Error if conflict with existing rule
	if (relation1.before.has(relation2)) throw new Error('Route ordering conflict');

	// Set before/after on both
	relation1.after.add(relation2);
	relation2.before.add(relation1);

	// Record all routes which are after route2 as being also after route1
	for (const relationAfter of relation2.after) {
		setBefore(relation1, relationAfter);
	}

	// Record all routes which are before route1 as being also before route2
	for (const relationBefore of relation1.before) {
		setBefore(relationBefore, relation2);
	}
}
