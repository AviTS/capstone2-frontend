import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class BookAppApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BookAppApi.token}` };
    // const params = (method === "get") ? data : {};
    let params;
    if (method === 'get') {
      params = data;
    } else {
      params = {};
    }

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getBook(volId) {
    let res = await this.request('book', { volId });
    return res;
  }
  // static async login(data) {
  //   let res = await this.request(`auth/token`, data, 'post');
  //   return res.token;
  // }
}

export default BookAppApi;
