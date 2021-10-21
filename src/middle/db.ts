const { config } = require("../config");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");

export const dbInit = () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_BASE } = config;
  const dbConStr = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}?authSource=${DB_BASE}`;
  (<any>mongoose).Promise = global.Promise;
  console.log(dbConStr);
  mongoose.connect(dbConStr);
  const db = mongoose.connection;
  db.on("error", () => {
    console.log(`Unable to connect to database: ${DB_HOST}`);
  });
  db.once("open", () => {
    console.log(`Connected to database: ${DB_HOST}`);
  });
  const models: Record<string, any> = {};
  fs.readdirSync(path.resolve(__dirname, "../model/")).forEach(
    (file: string) => {
      const arr: string[] = file.split(".");
      const model = require(`../model/${arr[0]}`);
      if (!models[`${arr[0]}Model`]) {
        models[`${arr[0]}Model`] = model[`${arr[0]}Model`];
      }
    }
  );

  return models;
};
