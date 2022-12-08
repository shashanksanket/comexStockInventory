const users = require('./users/users.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const opStocks = require('./op-stocks/op-stocks.service.js');
const opconfigs = require('./opconfigs/opconfigs.service.js');
const oppaymentdetails = require('./oppaymentdetails/oppaymentdetails.service.js');
module.exports = function (app) {
  app.configure(users);
  app.configure(authmanagement);
  app.configure(opStocks);
  app.configure(opconfigs);
  app.configure(oppaymentdetails);
}