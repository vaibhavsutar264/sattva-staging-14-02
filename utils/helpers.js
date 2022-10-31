import Constants from '../constants';
import Router from 'next/router';
export function apiRoute($url) {
  return Constants.WEBSITE_URL + $url;
}

export function imagePath($image) {
  return Constants.IMAGE_PATH + $image;
}

export function teacherImagePath($image) {
  return Constants.TEACHER_IMAGE_PATH + $image;
}

export function courseImagePath($image) {
  return Constants.COURSE_IMAGE_PATH + $image;
}

export function teacherImageDetailsPath($image) {
  return Constants.TEACHER_IMAGE_DETAILS_PATH + $image;
}

export function teacherVideoDetailsPath($image) {
  return Constants.TEACHER_VIDEO_DETAILS_PATH + $image;
}

export function userProfilePath($image) {
  return Constants.USER_PROFILE_PATH + $image;
}
export function sitePath($url) {
  return Constants.SITE_URL + $url;
}

export function backendportal($url) {
  return Constants.BASE_URL + $url;
}

export function getApiHeader(checkAuth = false) {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  //if (checkAuth) {
  let accessToken = getAuthorizationToken();

  if (accessToken) {
    headers.Authorization = 'Bearer ' + accessToken;
  }
  //}

  return { ...headers };
}

export function getLocalStorageAuth() {
  let authData = localStorage.getItem('auth');

  if (authData) {
    return JSON.parse(authData);
  }

  return false;
}

export function getAuthorizationToken() {
  let authData = localStorage.getItem('auth');

  if (authData) {
    authData = JSON.parse(authData);
    return authData.access_token;
  }

  return false;
}

export function setLocalStorageAuth(authData) {
  if (authData) {
    localStorage.setItem('auth', JSON.stringify(authData));
    return true;
  } else {
    localStorage.removeItem('auth');
    return false;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export function getLocalStorage(key) {
  let data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return false;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function removeLocalStorageAuth() {
  localStorage.removeItem('auth');
}

export function getUserId(history) {
  let authData = localStorage.getItem('auth');
  if (authData) {
    authData = JSON.parse(authData);
    let userId = authData.userDetails.id;
    if (userId) {
      return userId;
    } else {
      localStorage.removeItem('auth');
      //  Router.push('/');
    }
  } else {
    localStorage.removeItem('auth');
    // Router.push('/');
  }
  return false;
}

export function getGpayMerchantId() {
  return Constants.GPAY_MERCHANT_ID;
}
