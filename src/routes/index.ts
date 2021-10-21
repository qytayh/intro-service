import { SwaggerRouter } from "koa-swagger-decorator";
const path = require("path");

module.exports = (app: IApp) => {
  const router: any = new SwaggerRouter();
  router.swagger({
    title: "内推系统",
    description: "API DOC",
    version: "1.0.0",
    swaggerHtmlEndpoint: "/swagger/swagger-html",
    swaggerJsonEndpoint: "/swagger/swagger-json",
  });

  router.mapDir(path.resolve(__dirname, "../controller/"));
  app.use(router.routes()).use(router.allowedMethods());
};
