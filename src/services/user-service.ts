import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}
class UserService {
  getAllUsers() {
    // 浏览器的内置类，可以取消或者中止异步操作，例如获取请求和DOM操作，或者任何需要很长时间才能完成的操作。
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  deleteUser(id: number) {
    return apiClient.delete("/users/" + id);
  }
  createUser(newUser: User) {
    return apiClient.post("/users", newUser);
  }
  udpateUser(user: User) {
    return apiClient.patch("/users/" + user.id, user);
  }
}

export default new UserService();
