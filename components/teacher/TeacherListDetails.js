import React,{Component} from 'react';
import  Link from 'next/link';
import { imagePath } from '../../utils/helpers';

function TeacherListDetails({teacher,setTeacherEmail}){

	return(
		    <div className="card p-4 position-unset teacher-list-card teacherListCards">
              <div className="profile-left teacher-pro-div">
                <div className="profile-img">
                  <img src={imagePath('teachers/'+teacher.image)}/>
                </div>
                <ul>
                { teacher.facebook
                    ? <li><a href={teacher.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    : ''
                  }
                  { teacher.twitter
                    ? <li><a href={teacher.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
                    : ''
                  }
                  { teacher.instagram
                    ? <li><a href={teacher.instagram} target="_blank"><i className="fab fa-instagram"></i></a></li>
                    : ''
                  }
                 
                    <li><a onClick={setTeacherEmail.bind(null,teacher.email)}><i className="far fa-envelope"></i></a></li>
                    
                  
                </ul>
              </div>
              <div className="profile-content pb-0 teacher-content-div">
                <h5>{teacher.name}</h5>
                <p>{teacher.body}</p>
                <p>{teacher.description}</p>
                <ul className="profile-ul mb-4">
                  <strong className="mr-4">Specialities :</strong>
                  {teacher.specialities.map((items,index) => {
                          return(
                              <li key={index}><p>{items.name}</p></li>
                              );
                      })}
                </ul>
                {teacher.courses.length > 0 ?
                <ul className="profile-ul mb-4">
                  <strong className="mr-4">Courses Offered :</strong>
                  {teacher.courses.slice(0, 2).map((course,index) => {
                          return(
                               <li key={index}><a>{course.title}</a></li>
                              );
                      })}
                   { teacher.more_courses_count > 0 ?
                    <li className="viewall-text">+ {teacher.more_courses_count} More <a>View All</a></li>
                  : ''
                  }

                </ul>
                : ''}
                {teacher.videos.length > 0 ?
                <ul className="profile-ul mb-4">
                  <strong className="mr-4">Videos Online :</strong>

                  {teacher.videos.slice(0, 2).map((video,index) => {
                          return(
                               <li key={index}><a>{video.title}</a></li>
                              );
                      }
                    )
                  }

                  { teacher.more_videos_count > 0 ?
                    <li className="viewall-text">+ {teacher.more_videos_count} More  <Link href={'teacher-details/'+btoa(teacher.id)}><a>View All</a></Link></li>
                  : ''
                  }
                  
                </ul>

                : ''
              }
                {/* <div className="mt-5 teacher-view-btn-div">
                  <Link href={`/teacher-details/${btoa(teacher.id)}`} className="btn btn-sm"><a className="teacher-view-link">View Complete Profile</a></Link>
                  
                  <a className="btn btn-sm ml-2" onClick={setTeacherEmail.bind(null,teacher.email)}>Send Email</a>
                </div> */}
              </div>
            </div>
		);
}

export default TeacherListDetails;