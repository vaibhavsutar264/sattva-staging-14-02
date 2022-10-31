import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';

class TeacherService {

	static sendTeacherEmail(postData){
		let paramsData = JSON.stringify(postData);

		const requestOptions = {
			headers : getApiHeader()
		};

		return axios.post(apiRoute('send-query-mail'), paramsData, requestOptions)
	}
}

export default TeacherService;