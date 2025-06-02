import { AxiosRequestConfig, ResponseType } from "axios";
import { axiosInstance } from "./axios";
import Endpoints from "./Endpoints";
import { getItemFromStorage } from "./storage";


// General controller for sending api request

class ApiRequest {
  async makeRequest(endPointkey: string, params: {}, body: Object) {
    const endpoint = Endpoints[endPointkey];
    const request = await this.createRequest(endpoint, params, body, endPointkey);
    let response: any;
    try {
      response = await axiosInstance(request);

      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (err) {
      throw err;
    }
  }

  async createRequest(
    endpoint: any,
    params: any,
    body: Object,
    endPointkey: string
  ) {
    let url = endpoint.url;
    url = params ? this.addRouteParams(url, params) : url;
    const type: ResponseType = endPointkey === "reportById" ? "blob" : "json";

    const token = await getItemFromStorage("token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json; charset=utf-8",
    };

    if (token && endPointkey !== "login" && endPointkey !== "logout") {
      headers["Authorization"] = token;
    }

    const request: AxiosRequestConfig = {
      url,
      method: endpoint.method,
      responseType: type,
      data: body,
      headers,
    };

    return request;
  }

  addRouteParams(url: string, params: any) {
    const keys = url.match(/!\w+/gi);
    if (keys) {
      keys.forEach((key) => {
        const keyName = key.replace("!", "");
        url = url.replace(key, params[keyName]);
      });
    }
    return url;
  }
}

export const _apirequest = new ApiRequest();
