module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Property title is required." },
                notEmpty: { args: true, msg: "Property title cannot be empty."}
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "Property content is required." },
                notEmpty: { args: true, msg: "Property content cannot be empty."}
            }
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator(value) {
                    if (value.split(',').includes('bad category')) {
                        throw new Error("invalid category.");
                    }
                },
                maxCategoriesValidator(value) {
                    if (value.split(',').length > 3) {
                        throw new Error("An item cannot have more than 3 categories.");
                    }
                }
            },
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
            defaultValue: false,
            validate: {
                isBoolean(value) {
                    if (value !== true && value !== false && toString.call(value) !== '[object Boolean]') {
                        throw new Error("Property published expected boolean.");
                    }
                }
            }
        }
    }, {
        timestamps: true
    })
}