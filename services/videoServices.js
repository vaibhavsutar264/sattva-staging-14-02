import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

class VideoServices {
  static fetchStyleVideos(id, limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/get-style-videos/' + id + '/' + from + '/' + limit
      ),
      requestOptions
    );
  }

  static fetchNewVideos(limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('user-dashboard/get-all-videos/' + from + '/' + limit),
      requestOptions
    );
  }

  static fetchMyClassesVideos(id, limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/get-classes-videos/' + id + '/' + from + '/' + limit
      ),
      requestOptions
    );
  }

  static fetchMyFavoriteVideos(id, limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/get-favorite-videos/' + id + '/' + from + '/' + limit
      ),
      requestOptions
    );
  }

  static fetchRecentWatchedVideos(id, limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute(
        'user-dashboard/get-recent-watched-videos/' +
          id +
          '/' +
          from +
          '/' +
          limit
      ),
      requestOptions
    );
  }

  static fetchRecommendedVideos(limit, from) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.get(
      apiRoute('user-dashboard/get-all-featured-videos/' + from + '/' + limit),
      requestOptions
    );
  }

  static fetchSearchVideos(details) {
    const requestOptions = {
      headers: getApiHeader(),
    };

    return axios.post(
      apiRoute('user-dashboard/filter-all-videos'),
      details,
      requestOptions
    );
  }

  static getTeacherExclusiveVideos() {
    const requestOptions = {
      headers: getApiHeader(),
    };
    return axios.get(
      apiRoute('user-dashboard/get-teacher-exclusive-videos'),
      requestOptions
    );
  }
}

export default VideoServices;
