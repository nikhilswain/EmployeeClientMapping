const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.client = require("./client.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.timesheet = require("./timesheet.model")(sequelize, Sequelize);

// many-to-many relationship b/w clients and employees
db.employee.belongsToMany(db.client, {
  through: "MapClientEmployee",
});

db.client.belongsToMany(db.employee, {
  through: "MapClientEmployee",
});

// one-to-many relationship b/w emloyee and timesheet
db.employee.hasMany(db.timesheet, {
  foreignKey: "employeeId",
});
db.timesheet.belongsTo(db.employee, {
  targetKey: "employeeId",
});

module.exports = db;
