module.exports = (sequelize, DataTypes) =>{

    const Teacher = sequelize.define('teacher', {
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password : {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps: false,
    })

    return Teacher
}