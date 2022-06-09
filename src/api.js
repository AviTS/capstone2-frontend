import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const DEV_BASE_URL = 'https://capstone2-bookapp-backend.herokuapp.com';

class BookAppApi {
  static token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMTgxMjMiLCJpYXQiOjE2NTQ0NTgyNjZ9.mP4zmOiNy5KDmCwdFbawaPXhk9xblziqxcm6SQozWio';

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
    console.log(res);
    return res;
  }

  // static async login(data) {
  //   let res = await this.request(`auth/token`, data, 'post');
  //   return res.token;
  // }
}

export default BookAppApi;
