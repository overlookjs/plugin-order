/* --------------------
 * @overlook/plugin-order module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import orderPlugin from '../lib/index.js';

export default orderPlugin;
export const {
	ORDER
} = orderPlugin;
