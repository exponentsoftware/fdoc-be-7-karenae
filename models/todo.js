module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        Todo_Id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_Id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            required: true,
        },
        todoCompleted: {
            type: Sequelize.DataTypes.ENUM(["true", "false"]),
            default: "false"
        },
        category: {
            type: Sequelize.DataTypes.ENUM(["task", "hobby", "work"]),
            default: "task"
        },

    });

    return Todo;
};