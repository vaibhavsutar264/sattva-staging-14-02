import React,{Component} from 'react';
import { teacherVideoDetailsPath } from '../../utils/helpers';

function TeacherVideos({video}){

    return(
        <>
            <div className="videos-intabs">
              <div className="row">
                <div className="col-md-4">
                <div className="videos_img"><img  src={teacherVideoDetailsPath(video.image)} className="img-fluid"/></div>
                </div>
                <div className="col-md-8">
                  <h5 className="mb-3">{video.title}</h5>
                  <p>{video.description}</p>
                  <a href="https://www.sattvaconnect.com/index.php?option=com_osmembership&view=plans&layout=columns&id=1&Itemid=223" className="btn btn-sm waves-effect waves-light">Join to Watch Video</a>
                </div>
              </div>
            </div>
            <hr/>
        </>
        );
}

export default TeacherVideos;