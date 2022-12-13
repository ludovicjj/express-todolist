module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        id:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: "This username is already taken." },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}