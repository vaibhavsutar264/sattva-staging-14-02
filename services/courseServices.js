import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

class CourseServices {
  static buyCourseWithRegistration(postData) {
    let paramsData = JSON.stringify(postData);

    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('buy-course-with-registration'),
      paramsData,
      requestOptions
    );
  }

  static buyCourseWithoutRegistration(postData) {
    let paramsData = JSON.stringify(postData);

    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('buy-course-without-registration'),
      paramsData,
      requestOptions
    );
  }

  static buyCourseWithRegistrationWithoutPayment(postData) {
    let paramsData = JSON.stringify(postData);

    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('buy-course-with-registration-without-payment'),
      paramsData,
      requestOptions
    );
  }

  static giftCourseWithRegistration(postData) {
    let paramsData = JSON.stringify(postData);

    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('gift-course-with-registration'),
      paramsData,
      requestOptions
    );
  }

  static fetchCourse(from = 0) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(apiRoute('get-courses-data/' + from), requestOptions);
  }

  static fetchCourseDetail(id) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(apiRoute('get-course-detail/' + id), requestOptions);
  }

  static getClintId() {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(apiRoute('get-client-id'), requestOptions);
  }

  static checkUsernameAvailability(username) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('check-username-availability/' + username),
      requestOptions
    );
  }

  static checkEmailAvailability(email) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('check-email-availability/' + email),
      requestOptions
    );
  }

  static checkUserUsername(username) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('check-user-username/' + username),
      requestOptions
    );
  }

  static checkUserEmail(email) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(apiRoute('check-user-email/' + email), requestOptions);
  }

  static checkFbId(fbId) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(apiRoute('check-user-fb-id/' + fbId), requestOptions);
  }

  static fetchUserCourses(userId, from) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(
      apiRoute('my-courses/' + userId + '/' + from),
      requestOptions
    );
  }

  static fetchUserAvailableCourses(userId, from) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(
      apiRoute('user-available-courses/' + userId + '/' + from),
      requestOptions
    );
  }

  static fetchCourseAllDetails(userId) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(apiRoute('course-detail/' + userId), requestOptions);
  }

  static fetchRelatedCourses(userId, courseId) {
    const requestOptions = {
      headers: getApiHeader(null, true),
    };

    return axios.get(
      apiRoute('related-courses/' + userId + '/' + courseId),
      requestOptions
    );
  }

  static sendPurchaseCourseMail(user, course) {
    const mailData = {
      userDetails: user,
      course: course,
    };
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('send-purchase-course-mail'),
      mailData,
      requestOptions
    );
  }

  static userRegistration(data) {
    let paramsData = JSON.stringify(data);
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('user-registration-subscription'),
      paramsData,
      requestOptions
    );
  }

  static userGiftsubscriptionRegistration(data) {
    let paramsData = JSON.stringify(data);
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('user-gift-user-registration-subscription'),
      paramsData,
      requestOptions
    );
  }

  static userRegistrationFromUserdashboard(data) {
    let paramsData = JSON.stringify(data);
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('user-dashboard/buy_subscription'),
      paramsData,
      requestOptions
    );
  }
}

export default CourseServices;
