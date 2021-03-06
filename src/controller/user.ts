import {
  request,
  summary,
  tags,
  body,
  prefix,
  security,
} from "koa-swagger-decorator";
import UserService from "../service/user";
import { IUser, UserModel } from "../model/User";
import Rp from "../middle/response";
import { createToken } from "../middle/jwt";

const tag = tags(["用户信息"]);

const loginForm = {
  phone: {
    type: "string",
    description: "手机号",
    required: true,
    example: "13666145517",
  },
  password: {
    type: "string",
    required: true,
    description: "密码",
    example: "123456",
  },
};

@prefix("/user")
export default class User {
  @request("POST", "/login")
  @summary("登录")
  @tag
  @body(loginForm)
  static async login(ctx: IContext) {
    const user: IUser = ctx.request.body;
    if (user.phone && user.password) {
      const res:any = await UserModel.findOne({ phone: user.phone });
      if (!res._id) {
        ctx.body = Rp.fail("用户名不存在");
        return;
      }
      if (res.password !== user.password) {
        ctx.body = Rp.fail("用户名密码不匹配");
        return;
      }
      const { _id, username, role } = res;
      const token = createToken({ _id, username, role });
      ctx.body = Rp.success({ token })
    }
  }

  @request("POST", "")
  @summary("创建用户")
  @security([{ authorization: [] }])
  @tag
  static async create(ctx: IContext) {
    const user: IUser = ctx.request.body;
    const res = await UserService.create(user);
    ctx.body = res;
  }
}
