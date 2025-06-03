import { Method } from "axios";
import config from "../config.json";

const Endpoints: {
  [key: string]: { url: string; method: Method; params?: {} };
} = {
  // 🔐 Auth endpoints
  login: {
    url: `${config.API_ENDPOINT_PREFIX}/auth/user/login`,
    method: "POST",
    params: {},
  },
  logout: {
    url: `${config.API_ENDPOINT_PREFIX}/auth/user/logout`,
    method: "DELETE",
    params: {},
  },
  reset_password: {
    url: `${config.API_ENDPOINT_PREFIX}/auth/user/reset`,
    method: "PATCH",
    params: {},
  },
  account_details: {
    url: `${config.API_ENDPOINT_PREFIX}/auth/user/detail?access_token=!access_token`,
    method: "GET",
    params: {},
  },

  // ⚙️ Settings
  getUserSettings: {
    url: `${config.API_ENDPOINT_PREFIX}/settings/user`,
    method: "GET",
  },
  setUserSettings: {
    url: `${config.API_ENDPOINT_PREFIX}/settings/user`,
    method: "PUT",
  },

  // 📖 Quraan-related endpoints
  readings_items: {
    url: `${config.API_ENDPOINT_PREFIX}/readings/items`,
    method: "GET",
    params: {},
  },
  liked_hotspots: {
    url: `${config.API_ENDPOINT_PREFIX}/hotspots/liked`,
    method: "GET",
    params: {},
  },
  last_n_liked_hotspots: {
    url: `${config.API_ENDPOINT_PREFIX}/hotspots/liked/last-n`,
    method: "POST", // expects body: { N }
    params: {},
  },
  reading_by_key: {
    url: `${config.API_ENDPOINT_PREFIX}/readings/by-key`,
    method: "POST", // expects body: { key }
    params: {},
  },
  reading_pages_by_key: {
    url: `${config.API_ENDPOINT_PREFIX}/readings/pages-by-key`,
    method: "POST", // expects body: { key, pagesNumber }
    params: {},
  },
  like_hotspot: {
    url: `${config.API_ENDPOINT_PREFIX}/hotspots/like`,
    method: "POST", // expects body: id
    params: {},
  },
  dislike_hotspot: {
    url: `${config.API_ENDPOINT_PREFIX}/hotspots/dislike`,
    method: "POST", // expects body: { id }
    params: {},
  },
};

export default Endpoints;

