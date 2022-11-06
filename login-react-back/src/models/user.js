import { db } from "../config/db";
import { DataTypes } from "sequelize";

export const UserModel = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
UserModel.sync();
