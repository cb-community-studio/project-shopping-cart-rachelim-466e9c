const assert = require('assert');
const app = require('../../src/app');

describe('\'promotions\' service', () => {
  it('registered the service', () => {
    const service = app.service('promotions');

    assert.ok(service, 'Registered the service (promotions)');
  });
});
