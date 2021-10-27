export default class Rp {
  static success(data: any) {
    return {
      code: 200,
      data,
      msg: "success",
    };
  }

  static fail(msg: string,code=500) {
    return {
      code,
      msg,
    };
  }
}
