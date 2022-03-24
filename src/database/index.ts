import dbConfig from "../config/db.config";
import { Sequelize } from "sequelize";
import { User } from "../models/user.model";

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

let db: any = {};

db.test = require("../models/test.model.ts")(sequelize, Sequelize);
db.User = User(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
