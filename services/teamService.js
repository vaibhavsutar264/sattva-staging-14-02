import * as types from './types';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';
import TeacherService from './teacherServices';

 export const fetchTeam = (history) => dispatch =>{
	dispatch({ type: types.ALERT_CLEAR, isloading: true });
	axios.get(apiRoute('get-team-data'))
    .then(res =>{
    	dispatch({type: types.FETCH_TEAM,payload: res.data});
    	dispatch({ type: types.ALERT_CLEAR, isloading: false });

    })
     .catch(error => {
        if (error.response && error.response.status) {
            let errorData = error.response.data;
            dispatch({ type: types.ALERT_ERROR, ...errorData });
            history.push('/');
        } else {
            dispatch({ type: types.ALERT_ERROR, message: 'Something Went Wrong, Try Again' });
            history.push('/');
        }
    });

}

export const sendTeamEmail = (data) => dispatch =>{
    dispatch({ type: types.ALERT_CLEAR, isloading: true });
    TeacherService.sendTeacherEmail(data)
    .then(res =>{
       dispatch({ type: types.ALERT_SUCCESS, message: 'Mail Sent Successfully' });
    })
    .catch(error => {
        if (error.response && error.response.status) {
            let errorData = error.response.data;
            dispatch({ type: types.ALERT_ERROR, ...errorData });
        } else {
            dispatch({ type: types.ALERT_ERROR, message: 'Something Went Wrong, Try Again' });
        }
    });
}

export const resetAlertValues = () => dispatch =>{
    dispatch({ type: types.ALERT_CLEAR, isloading: false });  
}