const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  let sequelizeClient = app;
  if (typeof app.get !== "undefined" && typeof app.get === "function") {
    sequelizeClient = app.get("sequelizeClient");
  }
  const opStocks = sequelizeClient.define('op_stocks', {
    Title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amountSpent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DateOfPayment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  opStocks.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    opStocks.belongsTo(models.users);
  };

  return opStocks;
};