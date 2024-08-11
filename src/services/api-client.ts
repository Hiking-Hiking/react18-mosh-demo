// 注：在services文件夹里，添加基本模块，为应用程序提供服务或功能;
// 在api-clients.ts文件里，创建一个新的访问客户端，并进行自定义配置；

import axios, { CanceledError } from "axios";

export default axios.create({
  // 为了让我们的应用程序接口客户端可以重复使用，可能在其他组件中我们需要使用其他的端点，比如 /albums;
  baseURL: "https://jsonplaceholder.typicode.com",
  // 这里我们可以选择性地设置HTTP头设置，这些头信息将与每个http请求一起传送，有时这是必要的，例如有些后端要求我们每次http请求的时候都要传递一个API密钥，如果有这样的请求，我们可以传递一个api-key ，并将其设置为某个值；
  //   headers: {
  //     "api-key": "...",
  //   },
});

export { CanceledError };
