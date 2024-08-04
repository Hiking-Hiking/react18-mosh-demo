import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // 在这里，我们可以选择性地设置 HTTP 头信息，这些头信息将与每个HTTP 请求一起发送。有时这是必要的，例如有些后端要求我们每次 HTTP 请求都要传递一个 API 密钥。如果有这样的要求，我们可以通过一个API键，并将其设置为某个值。现在我们没有这个要求，所以删除
  // headers:{
  //     'api-key':'...'
  // }
});

export { CanceledError };
