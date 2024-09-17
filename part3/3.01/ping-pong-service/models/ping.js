const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../db");

class Ping extends Model {}
Ping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    count: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "ping",
  }
);

Ping.sync();

module.exports = Ping;
