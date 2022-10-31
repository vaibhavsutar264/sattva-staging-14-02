import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

class AuthService {
  static login(username, password) {
    const requestOptions = {
      headers: getApiHeader(null, false),
    };

    const body = JSON.stringify({ email: username, password: password });

    return axios.post(apiRoute('user-login'), body, requestOptions);
  }

  static subscriberLogin(username, password, vimeoId = null) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    const body = JSON.stringify({
      email: username,
      password: password,
      vimeoId: vimeoId,
    });

    return axios.post(apiRoute('subscriber-login'), body, requestOptions);
  }

  static logout() {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(apiRoute('logout'), null, requestOptions);
  }

  static forgotPasswordMail(email) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('forget-password-mail-web/' + email),
      null,
      requestOptions
    );
  }

  static changePassword(userDetails) {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.post(
      apiRoute('change-subscriber-password'),
      userDetails,
      requestOptions
    );
  }

  static teacherAccessRequest(details) {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.post(
      apiRoute('teacher-access-request'),
      details,
      requestOptions
    );
  }
  static checkUsernameAvailability(username, OldUsername) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/check-username-availability/' +
          username +
          '/' +
          OldUsername
      ),
      requestOptions
    );
  }

  static checkEmailAvailability(email, oldEmail) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/check-email-availability/' + email + '/' + oldEmail
      ),
      requestOptions
    );
  }

  static updateUserUsername(details) {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.post(
      apiRoute('user-dashboard/update-user-username'),
      details,
      requestOptions
    );
  }

  static updateUserEmail(details) {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.post(
      apiRoute('user-dashboard/update-user-email'),
      details,
      requestOptions
    );
  }

  static updateUserDetails(details) {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.post(
      apiRoute('user-dashboard/update-user-details'),
      details,
      requestOptions
    );
  }
}

export default AuthService;
