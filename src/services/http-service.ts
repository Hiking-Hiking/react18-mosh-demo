import apiClient from "./api-client";

// 这里如果不export出去，user-service最后导出create("/users")的时候会报错。
export interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }
  add<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }
  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

// 导出一个创建HttpService类的实例的函数。
const create = (endpoint: string) => new HttpService(endpoint);

export default create;
