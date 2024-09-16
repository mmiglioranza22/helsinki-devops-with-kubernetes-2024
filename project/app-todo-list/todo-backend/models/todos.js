const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../db");

class Todo extends Model {}
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      validate: {
        min: 5,
        max: 140,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "todo",
  }
);

Todo.sync();

module.exports = Todo;
