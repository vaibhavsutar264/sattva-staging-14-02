import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

class UserServices {
  static sendContactMail(data) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    const body = JSON.stringify(data);

    return axios.post(apiRoute('user/send-user-mail'), body, requestOptions);
  }

  static buyNewCourse(data) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    const body = JSON.stringify(data);

    return axios.post(apiRoute('user/buy-new-course'), body, requestOptions);
  }

  static sendCustomerSupportMail(data) {
    const requestOptions = {
      headers: getApiHeader(null, false),
    };

    const body = JSON.stringify(data);

    return axios.post(
      apiRoute('send-customer-support-mail'),
      body,
      requestOptions
    );
  }
}

export default UserServices;
