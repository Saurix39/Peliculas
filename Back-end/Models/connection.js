const dbConfig = require('../Config/db.config');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});
db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
module.exports = db;