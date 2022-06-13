import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const DEV_BASE_URL = 'https://capstone2-bookapp-backend.herokuapp.com';

class BookAppApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BookAppApi.token}` };
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
    let res = await this.request(volId);
    console.log(res);
    return res;
  }

  static async getBookList(searchTerm) {
    let res = await this.request(`search/q=${searchTerm}`);
    return res;
  }

  //login and signup routes
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }
}

export default BookAppApi;
