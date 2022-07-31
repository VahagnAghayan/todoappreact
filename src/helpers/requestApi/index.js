import { configs } from "../../configs/mainConfig";
import { POST_METHOD, PATCH_METHOD, DELETE_METHOD } from "../../constants";

const { connection: { BASE_URL: url }, contentType } = configs;

const requestApi = {
  url,

  post(body) {
    return fetch(this.url, {
      method: POST_METHOD,
      body: JSON.stringify(body),
      headers: contentType
    })
  },

  patch(id,body) {
    return fetch(`${this.url}/${id}`, {
      method: PATCH_METHOD,
      body: JSON.stringify(body),
      headers: contentType
    })
  },

  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: DELETE_METHOD
    })
  }

}

export default requestApi;
