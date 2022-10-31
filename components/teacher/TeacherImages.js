import React,{Component} from 'react';
import { teacherImageDetailsPath } from '../../utils/helpers';

function TeacherImages({image}){

	return(
		    <div className="col-md-6 col-lg-4 item">
                <a className="lightbox">
                     <img className="img-fluid image scale-on-hover" src={teacherImageDetailsPath(image.image)}/>
                </a>
            </div>
		);
}

export default TeacherImages;