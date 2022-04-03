import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export const Connection = (sequelize: any, Sequelize: any) => {
  const Connection = sequelize.define("Connection", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: false,
      refrences: {
        model: "User",
        key: "id",
      },
    },
    followed_id: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: false,
      refrences: {
        model: "User",
        key: "id",
      },
    },
  });
  return Connection;
};
