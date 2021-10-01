module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userName: {
            type: Sequelize.STRING,
            required: true,
            trim: true,
            unique:true
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
        },
        password:{
            type: Sequelize.STRING,
            required: true
        },
        phone: {
            type: Sequelize.STRING,
            required: true
        },
        role: {
            type: Sequelize.DataTypes.ENUM(["admin", "app_user"]),
            default: "app_user"
        }

    });

    // User.hasMany('')
    return User;
};