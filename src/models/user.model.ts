import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export const User = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
      },
      profilePhoto: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      hooks: {
        beforeCreate: async (user: any) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user: any) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
