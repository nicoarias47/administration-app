import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import ConfigDIC from "./config/DIConfig";
import { initUserModule } from "./modules/user/user_module";

const app = express();

const port = process.env.PORT || 8080;

const container = ConfigDIC();

app.use(cors());
app.use(express.json());

initUserModule(app, container);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.code);
  res.json(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
