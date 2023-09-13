const dbConfig = require('../config/dbConfig');

const {Sequelize, DataType, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect : dbConfig.dialect,
        operatorsAliases: false,
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected ..')
})
.catch(err => {
    console.log('Error'+err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require('./student.js')(sequelize, DataTypes)
db.teachers = require('./teacher.js')(sequelize, DataTypes)


db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re-sync done!")
})

module.exports = db