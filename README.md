[![NPM version](https://img.shields.io/npm/v/@overlook/plugin-order.svg)](https://www.npmjs.com/package/@overlook/plugin-order)
[![Build Status](https://img.shields.io/travis/overlookjs/plugin-order/master.svg)](http://travis-ci.org/overlookjs/plugin-order)
[![Dependency Status](https://img.shields.io/david/overlookjs/plugin-order.svg)](https://david-dm.org/overlookjs/plugin-order)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/plugin-order.svg)](https://david-dm.org/overlookjs/plugin-order)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/plugin-order.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/plugin-order/master.svg)](https://coveralls.io/r/overlookjs/plugin-order)

# Overlook framework order plugin

Part of the [Overlook framework](https://overlookjs.github.io/).

## Abstract

Plugin to order child.

e.g. For path-matching routes, `/photos/new` needs to be before `/photos/:id` so `new` gets a chance to be matched first.

## Usage

### Where to use it

This plugin should be on the *parent* of the routes which need to be ordered, not the child routes. i.e. on `/photos`, not `/photos/new` or `/photos/:id`.

Then use [@overlook/plugin-ordered](https://www.npmjs.com/package/@overlook/plugin-ordered) on the child routes to define how they should be ordered relative to each other.

### Defining order

Each route can say that it needs to be before or after any other of its siblings.

It can do this by extending [@overlook/plugin-ordered](https://www.npmjs.com/package/@overlook/plugin-ordered)'s `[IS_BEFORE]()` method.

`[IS_BEFORE]()` will be called with each of the route's siblings. It can return:

* `true` if route needs to be before that sibling
* `false` if route needs to be after that sibling
* `undefined` if no preference

### Ordering

Ordering of child routes will occur at end of the init phase, after all children have been initialized.

### Example

```js
const Route = require('@overlook/route');
const orderPlugin = require('@overlook/plugin-order');
const orderedPlugin = require('@overlook/plugin-ordered');
const {IS_BEFORE} = orderedPlugin;

const OrderRoute = Route.extend( orderPlugin );
const OrderedRoute = Route.extend( orderedPlugin );

class ChildRoute extends OrderedRoute {
  [IS_BEFORE]( sibling ) {
    // If super method returns a result, use it
    const isBefore = super[IS_BEFORE]( sibling );
    if ( isBefore != null ) return before;

    // Sort in alphabetical order
    if ( this.name === sibling.name ) return undefined;
    return this.name < sibling.name ? true : false;
  }
}

const root = new OrderRoute();
root.attachChild( new ChildRoute( { name: 'def' } ) );
root.attachChild( new ChildRoute( { name: 'abc' } ) );

await root.init();
// Children are now re-ordered, with 'abc' first
```

### Conflicts

Every sibling will be asked where it wants to be relative to every other sibling, by calling `[IS_BEFORE]()` on each.

Conflicts can occur if A says it's before B and B says it's before A, or there's a circular relationship (A before B, B before C, C before A).

In these cases an error will be thrown.

### Extending

The plugin also exposes an `[ORDER]()` method. If you want to take some action before/after ordering, extend this method.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/plugin-order/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/plugin-order/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
