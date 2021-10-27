declare interface IApp {
  use: (arg0: any) => {
    (): any;
    new (): any;
    use: { (arg0: any): void; new (): any };
  };
}

interface IContext {
  status: number;
  ip: any;
  header: any;
  request: any;
  method: string;
  url: string;
  state: any;
  body: any;
  params: any; //koa-router 追加了params属性
  otherArgs: any; // other params 额外追加的参数，用来向下传递变量
}
