import { Method } from "axios";
import config from "../config.json";

const Endpoints: {
  [key in string]: { url: string; method: Method; params?: {} };
} = {
  login: {
    url: `${config.API_ENDPOINT_PREFIX}/session/api/v1/auth/user/login`,
    method: "POST",
    params: {},
  },
  logout: {
    url: `${config.API_ENDPOINT_PREFIX}/session/api/v1/auth/user/logout`,
    method: "DELETE",
    params: {},
  },
  reset_password: {
    url: `${config.API_ENDPOINT_PREFIX}/session/api/v1/auth/user/reset`,
    method: "PATCH",
    params: {},
  },
  account_details: {
    url: `${config.API_ENDPOINT_PREFIX}/session/api/v1/auth/user/detail?access_token=!access_token`,
    method: "GET",
    params: {},
  },
  getUserSettings: {
    url: `${config.API_ENDPOINT_PREFIX}/settings-api/api/v1/settings/user`,
    method: "GET",
  },
  setUserSettings: {
    url: `${config.API_ENDPOINT_PREFIX}/settings-api/api/v1/settings/user`,
    method: "PUT",
  },

  // 📖 Quraan-related endpoints
  readings_buttons: {
    url: `${config.API_ENDPOINT_PREFIX}/quraan-api/api/v1/readings/buttons`,
    method: "GET",
    params: {},
  },
  liked_hotspots: {
    url: `${config.API_ENDPOINT_PREFIX}/quraan-api/api/v1/hotspots/liked`,
    method: "GET",
    params: {},
  },
  reading_by_key: {
    url: `${config.API_ENDPOINT_PREFIX}/quraan-api/api/v1/readings/by-key`,
    method: "POST", // assuming body: { key }
    params: {},
  },
  like_hotspot: {
    url: `${config.API_ENDPOINT_PREFIX}/quraan-api/api/v1/hotspots/like`,
    method: "POST",
    params: {},
  },
  dislike_hotspot: {
    url: `${config.API_ENDPOINT_PREFIX}/quraan-api/api/v1/hotspots/dislike`,
    method: "POST", // or DELETE if your backend expects it that way
    params: {},
  },
};

export default Endpoints;
