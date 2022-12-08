// Initializes the `opconfigs` service on path `/api/opconfigs`
const { Opconfigs } = require('./opconfigs.class');
const createModel = require('../../models/opconfigs.model');
const hooks = require('./opconfigs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/opconfigs', new Opconfigs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/opconfigs');

  service.hooks(hooks);
};
