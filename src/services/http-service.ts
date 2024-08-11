import apiClient from "./api-client";

export interface Entity {
  id: number;
}
class HttpService<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll<T>() {
    // 浏览器的内置类，可以取消或者中止异步操作，例如获取请求和DOM操作，或者任何需要很长时间才能完成的操作。
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }
  create(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }
  udpate<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}
const create = (endpoint: string) => new HttpService(endpoint);
export default create;
