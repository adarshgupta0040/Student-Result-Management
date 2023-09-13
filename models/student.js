module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define('student', {
        rollNumber: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true, // Assuming "roll" is the primary key
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }     
    },
    {
        timestamps: false,
    })

    return Student
}