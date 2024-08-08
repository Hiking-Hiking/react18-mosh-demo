import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      // .then((res) => console.log(res.data[0].name))
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message));
    // axios
    //   .get<User[]>("https://jsonplaceholder.typicode.com/users")
    //   // .then((res) => console.log(res.data[0].name))
    //   .then((res) => setUsers(res.data))
    //   .catch((err) => setError(err.message));

    // ----------------------------------------------
    // get -> await promise -> res / err

    // effect钩子里不能传递异步函数，不能直接在efftct传递的函数的括号前面加async，所以要把获取数据的异步操作asayc挪到内部，
    //  useEffect(async () => {});这种不允许，所以这函数内部单独用个命名为fetchUsers的函数接受整个异步操作。
    const fetchUsers = async () => {
      // 考虑到promise返回的有reslove也有可能是reject，使用try catch语法，分别操作不同的结果。try获取res，如果失败，在catch里获取err；
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (err) {
        // catch语句中不能进行类型注解，所以err:AxiosError不能直接写在catch后面的括号里，写在下面的err里注解，注意要引入axios的AxiosError;
        setError((err as AxiosError).message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
export default App;
