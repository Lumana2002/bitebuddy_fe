import axios from "./interceptor";

export function PostRequest(url: string, data: any, config: any) {
  return axios.post(url, data, config);
}

export function PutRequest(url: string, data: any, config: any) {
  return axios.put(url, data, config);
}

export function PatchRequest(url: string, data: any, config: any) {
  return axios.patch(url, data, config);
}

export function DeleteRequest(url: string, data: any) {
  return axios.delete(url, data);
}

export function GetRequest(url: string, data: any, config: any) {
  config.params = data;
  return axios.get(url, config);
}

export function GetFileRequest(url: string, data: any, config: any) {
  config.params = data;
  config.responseType = "blob";
  return axios.get(url, config);
}
