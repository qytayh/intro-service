import { IUser, UserModel } from "../model/User";

export default class UserService {
  static async create(obj: IUser) {
    const res = await UserModel.create(obj);
    return res;
  }
}
