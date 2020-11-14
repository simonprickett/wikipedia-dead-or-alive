# Wikipedia Dead or Alive

This is a small library that attempts to determine if someone is dead or alive, by looking at Wikipedia data.  It's had minimal testing, so if you find a person that's on Wikipedia that this doesn't work for, feel free to raise an issue, or submit a PR and add tests.

## Installation

Install this as a package from [npm](https://www.npmjs.com/package/wikipediadeadoralive).

```bash
$ npm install wikipediadeadoralive
```

## Example Usage

```javascript
const wikipediaDeadOrAlive = require('wikipediadeadoralive');

const deadOrAlive = async () => {
  try {
    const result = await wikipediaDeadOrAlive.getStatus('Robin_Williams');
    console.log(result);
  } catch (e) {
    // Oh no!
  }
};

deadOrAlive();
```

### getStatus

This library has one function, `getStatus`... pass it the page name of a person's page on Wikipedia (usually `Firstname_Lastname`), and it will return an object that looks like this for someone who is dead:

```javascript
{ 
  name: 'Robin Williams',
  dead: true,
  died: '2014',
  description: 'Robin McLaurin Williams was an American actor and comedian.'
}
```

Or like this for someone who is alive:

```javascript
{ 
  name: 'Pharrell Williams',
  dead: false,
  died: null,
  description: 'Pharrell Lanscilo Williams is an American singer, rapper, songwriter, record producer, fashion designer, and entrepreneur.'
}
```

## Tests

The tests for this project use [Jest](https://jestjs.io/).  To run the tests:

```bash
$ npm install
$ npm run test
```

Example test run output:

```bash
$ npm test

> wikipediadeadoralive@1.0.0 test /Users/simon/source/github/wikipedia-dead-or-alive
> jest

(node:11081) ExperimentalWarning: The fs.promises API is experimental
 PASS  test/deadoralive.test.js
  ✓ Justin Bieber, alive... (319 ms)
  ✓ Barack Obama, alive... (221 ms)
  ✓ Meek Mill, alive... (226 ms)
  ✓ Sean Connery, dead... (237 ms)
  ✓ Abraham Lincoln, dead... (229 ms)
  ✓ Robin Williams, dead... (229 ms)
  ✓ Simon Prickett, not on wikipedia... (218 ms)
  ✓ pageName is undefined... (2 ms)
  ✓ pageName is an empty string... (1 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.997 s, estimated 3 s
Ran all test suites.
```

Tests can be found in `test/deadoralive.test.js`.
