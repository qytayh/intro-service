const jsonwebtoken = require("jsonwebtoken");
const { config } = require("../config");
const jwt = require("koa-jwt");

import Rp from "./response";

const { JWT_EXPIRED, SECRET } = config;

interface IPaylod {
  _id: string;
  username: string;
  role: number;
}

export const createToken = (payload: IPaylod) => {
  return jsonwebtoken.sign(payload, SECRET, { expiresIn: JWT_EXPIRED });
};

export const verifyToken = (token: string) => {
  return jsonwebtoken.verify(token, SECRET, {
    complete: true,
  });
};

export const initJwt = (app: IApp) => {
  app.use((ctx: IContext, next: any) => {
    if (ctx.header && ctx.header.authorization) {
      const parts = ctx.header.authorization.split(" ");
      if (parts.length === 2) {
        // 取出token
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          try {
            // jwt.verify方法验证token是否有效
            const user = verifyToken(token);
            ctx.state.user = user;
          } catch (err) {
            // token过期 生成新的token
            // const newToken = getToken(user);
            // 将新token放入Authorization中返回给前端
            // ctx.res.setHeader('Authorization', newToken);
            // ctx.throw(401, err.message);
            ctx.status = 401;
            ctx.body = Rp.fail("登录过期",401)
          }
        }
      }
    }

    return next().catch((err: any) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          code: 0,
          msg: "登陆失效",
        };
      } else {
        throw err;
      }
    });
  });
  app.use(
    jwt({ secret: SECRET }).unless({
      path: [/^\/user\/login/, /^\/swagger/],
    })
  );
};
