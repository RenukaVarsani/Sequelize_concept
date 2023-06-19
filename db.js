const { Sequelize, DataTypes} = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize('demo', process.env.user, process.env.password, {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
  define:{
    timestamps:false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  storage: 'path/to/database.sqlite',
});

sequelize.authenticate()
.then(()=>{
  console.log("connected");
}).catch(err=>{
  console.log("error" + err);
})


module.exports = { sq: sequelize };