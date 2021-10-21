export default class Rp {
  static success(data: any) {
    return {
      code: 200,
      data,
      message: "success",
    };
  }

  static fail(message: string) {
    return {
      code: 500,
      message,
    };
  }
}
