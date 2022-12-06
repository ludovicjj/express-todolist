module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('categories').split(',');
            },
            set(categories) {
                this.setDataValue('categories', categories.join());
            }
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: true
    })
}