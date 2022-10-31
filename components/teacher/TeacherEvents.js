import React,{Component} from 'react';

function TeacherEvents({event}){

	return(
		    <div className="card">
            <div className="card-content p-4">
              <div className="card-course-content ml-0">
                <div className="course-heading "><h6 className="teacher-event-title">{event.title}</h6></div>
                <p>{event.description}</p>
                <ul className="events-ul">
                  <li><i className="far fa-calendar-alt"></i> {event.start_date} - {event.time} {event.time_status}</li>
                  <li><i className="far fa-clock"></i> {event.duration} {event.duration_type}</li>
                  <li><i className="fas fa-video"></i>  {event.type}</li>
                  <li><a href="https://www.sattvaconnect.com/index.php?option=com_osmembership&view=plans&layout=columns&id=1&Itemid=223" className="btn btn-sm">Join Now</a></li>
                </ul>
              </div>
            </div>
          </div>
		);
}

export default TeacherEvents;