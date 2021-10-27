const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const loadRouter = require("./routes/index");
import { initJwt } from "./middle/jwt";
const cors = require("koa2-cors");
import { dbInit } from "./middle/db";

app.use(cors({origin: '*',}));

initJwt(app);

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

loadRouter(app);

dbInit();

// logger
app.use(async (ctx: any, next: () => void) => {
  const start: number = Number(new Date());
  await next();
  const end: number = Number(new Date());
  const ms: number = end - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on("error", (err: any, ctx: any) => {
  console.error("server error", err, ctx);
});

module.exports = app;
