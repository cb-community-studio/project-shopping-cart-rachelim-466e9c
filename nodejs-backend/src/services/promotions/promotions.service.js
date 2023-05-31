const { Promotions } = require('./promotions.class');
const createModel = require('../../models/promotions.model');
const hooks = require('./promotions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/promotions', new Promotions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('promotions');

  service.hooks(hooks);
};