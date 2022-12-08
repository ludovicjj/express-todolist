const allowedCategories = [
    "php",
    "javascript",
    "es6",
    "nodejs",
    "twig",
    "sequelize",
    "sql",
    "mariadb",
    "symfony",
    "fixtures",
    "router",
    "design pattern"
]

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
                isAllowedCategories(value) {
                    value.toLowerCase().split(',').forEach(category => {
                        if (!allowedCategories.includes(category)) {
                            throw new Error(`Allowed categories are : ${allowedCategories.join(', ')}`);
                        }
                    });
                },
                isLengthCategoriesValid(value) {
                    if (!value) {
                        throw new Error("An item must have at least one category.");
                    }
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