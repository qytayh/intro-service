import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
  username: string;
  phone?: string;
  password: string;
}

export const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      comments: "用户名",
    },
    password: {
      type: String,
      required: true,
      comments: "密码",
    },
    phone: {
      type: String,
      required: true,
      comments: "手机号",
    },
    role: {
      type: Number,
      required: true,
      comments: "角色 0为一般用户 1为管理员",
      default: 0,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  }
);

export const UserModel = Mongoose.model<IUser>("User", UserSchema);
