import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // CanceledError是axios定义的，如果err是CanceledError实例对象，就立即返回。
        if (err instanceof CanceledError) return;
        // 否则，将error设置为error.message
        setError(err.message);
        setLoading(false);
      });
    // finally 会在promise结束后，无论是resolve还是reject都会执行，所以loading只要直接在这里隐藏就可，但是这个不会在react的严格模式中生效，所以暂时先注释掉，用逐步在请求回调中执行隐藏loading的方法；
    // .finally(() => {setLoading(false)});

    return () => cancel();
  }, []);
  return { users, error, isLoading, setUsers, setError, setLoading };
};

export default useUsers;
