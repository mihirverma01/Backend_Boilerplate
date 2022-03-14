import { Dialect } from "sequelize/types";

export type Pool = {
  max: number;
  min: number;
  acquire: number;
  idle: number;
};

export type DbConfig = {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: Dialect;
  pool: Pool;
};
