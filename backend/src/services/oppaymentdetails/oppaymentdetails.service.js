// Initializes the `oppaymentdetails` service on path `/api/oppaymentdetails`
const { Oppaymentdetails } = require('./oppaymentdetails.class');
const createModel = require('../../models/oppaymentdetails.model');
const hooks = require('./oppaymentdetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/oppaymentdetails', new Oppaymentdetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/oppaymentdetails');

  service.hooks(hooks);
};
