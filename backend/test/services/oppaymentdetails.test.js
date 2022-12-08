const assert = require('assert');
const app = require('../../src/app');

describe('\'oppaymentdetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/oppaymentdetails');

    assert.ok(service, 'Registered the service');
  });
});
