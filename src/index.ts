import express, { Request, Response, Application } from "express";
import { Umzug, SequelizeStorage } from "umzug";
import bodyParser from "body-parser";
import cors from "cors";
import db, { sequelize } from "./models";

const app: Application = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
// db.sequelize.sync();

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

const umzug = new Umzug({
  migrations: { glob: "migrations/*.ts" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

umzug.up().then(() => {
  app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
  });
});
