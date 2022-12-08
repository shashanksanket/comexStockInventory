'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "oppaymentdetails", deps: [users]
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2022-12-08T02:55:48.777Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "oppaymentdetails",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "paymentAmount": {
                "type": Sequelize.STRING,
                "field": "paymentAmount",
                "allowNull": true
            },
            "paymentDate": {
                "type": Sequelize.STRING,
                "field": "paymentDate",
                "allowNull": true
            },
            "updatedBalance": {
                "type": Sequelize.STRING,
                "field": "updatedBalance",
                "allowNull": true
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            },
            "userId": {
                "type": Sequelize.INTEGER,
                "field": "userId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
