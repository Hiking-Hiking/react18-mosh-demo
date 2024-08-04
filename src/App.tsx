// import { useEffect, useState } from "react";
import "./App.css";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";
// import ProduceList from "./components/ProduceList";
// import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";
// // const test = ['a','b','c'];虽然不能test =[]这样重新赋值，但是可以通过test.push('d')这样修改，所以不是不变的或者只读的，如果要将test改成常量或者只读，在后面加上as const，这是typescript的魔法;categories移动到单独的ts文件赎出了，避免导入顺序导致初始化失败报错的问题；
// export const categories = ["Groceries", "Utilities", "Entertainment"] as const;

function App() {
  // ---------------------------------------------
  // const [category, setCategory] = useState("");
  // ---------------------------------------------------
  // const inputRef = useRef<HTMLInputElement>(null);
  // ---------------------------------------------------
  // const connect = () => console.log("Connecting");
  // const disconnect = () => console.log("Disconnecting");
  // -----------------------------------------------------

  // //afterRender 每次组件渲染后都会调用；这是编写任何会产生副作用代码的机会；
  // useEffect(() => {
  //   //side effect 下面这句获取光标的代码，与返回的jsx无关，改变了dom的状态；它改变了组件之外的东西，导致我们组件不再是一个纯组件，要使它成为一个纯组件，使用useEffect钩子；
  //   if (inputRef) inputRef.current?.focus();
  // });
  // useEffect(() => {
  //   document.title = "我滴app";
  // });

  // ----------------------------------------------------------
  // const [expenses, setExpenses] = useState([
  //   { id: 1, description: "aaa", amount: 10, category: "Utilities" },
  //   { id: 2, description: "bbb", amount: 10, category: "Utilities" },
  //   { id: 3, description: "ccc", amount: 10, category: "Utilities" },
  //   { id: 4, description: "ddd", amount: 10, category: "Entertainment" },
  // ]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const visibleExpenses = selectedCategory
  //   ? expenses.filter((expense) => expense.category === selectedCategory)
  //   : expenses;

  // return (
  //   <>
  //     {/* <input ref={inputRef} type="text" className="form-input" /> */}
  //     <div className="mb-5">
  //       <ExpenseForm
  //         onSubmit={(expense) =>
  //           setExpenses([
  //             ...expenses,
  //             {
  //               ...expense,
  //               id: expenses.length + 1,
  //             },
  //           ])
  //         }
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <ExpenseFilter
  //         onSelectCategory={(category) => setSelectedCategory(category)}
  //       />
  //     </div>
  //     <ExpenseList
  //       expenses={visibleExpenses}
  //       onDelete={(id) =>
  //         setExpenses(expenses.filter((expense) => expense.id !== id))
  //       }
  //     />
  //   </>
  // );
  // ---------------------------------------------------------------
  // return (
  //   <>
  //     <select
  //       className="form-select"
  //       onChange={(event) => setCategory(event.target.value)}
  //     >
  //       <option value=""></option>
  //       <option value="Clothing">Clothing</option>
  //       <option value="Household">Household</option>
  //     </select>
  //     {<ProduceList category={category} />}
  //   </>
  // );
  // ----------------------------------------------------------------
  //   useEffect(() => {
  //     connect();
  //     return () => disconnect();
  //   });
  //   return <div></div>;

  // -----------------------------------------
  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState("");
  // // interface User {
  // //   id: number;
  // //   name: string;
  // // }
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   // axios
  //   //   .get<User[]>("https://jsonplaceholder.typicode.com/users")
  //   //   .then((res) => setUsers(res.data))
  //   //   .catch((err) => setError(err.message));
  //   // ---------------------------------
  //   //// get -> await promise -> res / err
  //   // const fetchUsers = async () => {
  //   //   try {
  //   //     const res = await axios.get<User[]>(
  //   //       "https://jsonplaceholder.typicode.com/users"
  //   //     );
  //   //     setUsers(res.data);
  //   //   } catch (err) {
  //   //     // catch(err: AxiosError){} 注意：err不能直接这样设置，因为类型注解在 catch 子句中是不允许的。因此，要解决这个问题，在catch函数里面，我们必须用括号将err对象包裹起来，然后使用as作为关键字，告诉类型脚本编译器此对象的类型，
  //   //     setError((err as AxiosError).message);
  //   //   }
  //   // };
  //   // fetchUsers();
  //   // ---------------------------------------
  //   // AbortController 是现代浏览器中的一个内詈类，可让我们取消或中止异步操作、如获取请求和dom操作，或者任何需要很长时间才能完成的操作；
  //   // const controller = new AbortController();
  //   // console.log("controller==", controller);
  //   setLoading(true);
  //   const { request, cancel } = userService.getAll<User>();
  //   request
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       // CanceledError是axios定义的，如果err是CanceledError实例对象，就立即返回。
  //       if (err instanceof CanceledError) return;
  //       // 否则，将error设置为error.message
  //       setError(err.message);
  //       setLoading(false);
  //     });
  //   // finally 会在promise结束后，无论是resolve还是reject都会执行，所以loading只要直接在这里隐藏就可，但是这个不会在react的严格模式中生效，所以暂时先注释掉，用逐步在请求回调中执行隐藏loading的方法；
  //   // .finally(() => {setLoading(false)});

  //   return () => cancel();
  // }, []);

  const { users, error, isLoading, setUsers, setError } = useUsers();

  // 删除当前user
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      // 如果出错，就将原始数据展示
      setUsers(originalUsers);
    });
  };
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);
    userService
      .add(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    // put一般是替换某个object，而patch一般是修补或者更新其一个或多个属性，我们选择的方法实际上取决于后端是如何构建的。有些后端不支持patch方法，只支持put方法。
    // 现在，我只需要更新一个属性，所以选择patch方法；
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
