const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  let sequelizeClient = app;
  if (typeof app.get !== "undefined" && typeof app.get === "function") {
    sequelizeClient = app.get("sequelizeClient");
  }
  const opconfigs = sequelizeClient.define('opconfigs', {
    Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalAmountGiven: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalAmountLeft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastUpdateAt: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  opconfigs.associate = function (models) {
    opconfigs.belongsTo(models.users);
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return opconfigs;
};