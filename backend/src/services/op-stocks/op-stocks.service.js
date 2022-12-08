// Initializes the `opStocks` service on path `/api/opStocks`
const { OpStocks } = require('./op-stocks.class');
const createModel = require('../../models/op-stocks.model');
const hooks = require('./op-stocks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/opStocks', new OpStocks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/opStocks');

  service.hooks(hooks);
};
