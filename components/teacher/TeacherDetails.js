import React,{Component} from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader,getLocalStorage } from '../../utils/helpers';
import SimpleReactValidator from 'simple-react-validator';

import Banner from '../Banner';
import TeacherImages from '../teacher/TeacherImages';
import TeacherVideos from '../teacher/TeacherVideos';
import TeacherCourses from '../teacher/TeacherCourses';
import TeacherEvents from '../teacher/TeacherEvents';
import { imagePath } from '../../utils/helpers';
import TeacherService from '../../services/teacherServices';

class TeacherDetails extends Component{

	constructor(props){
		super(props);
	    this.validator = new SimpleReactValidator();
	    this.state = {
	  		email : '',
	  		subject : '',
	  		message: '',
	  		toEmail: '',
	  		modalStatus: 'none',
	  		banner : {},
	  }	
	  this.onChange = this.onChange.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
	  this.onModalClose = this.onModalClose.bind(this);
	  this.resetForm = this.resetForm.bind(this);
	  this.setTeacherEmail = this.setTeacherEmail.bind(this);
	}

	componentDidMount() {
	    window.scrollTo(0, 0);

        const requestOptions = {
			headers : getApiHeader()
		};
   	 
		axios.get(apiRoute('cms-page-banner/'+btoa(12)),requestOptions)
		.then(res =>{
			this.setState({ banner : res.data });
	    })
	}

	componentWillMount() {
        
	}

	onChange(e){
		this.setState({ [e.target.name] : e.target.value });
	}

	onSubmit(e){
		e.preventDefault();
		if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            return false;
        }	
    	const userDetails = {
			email: this.state.email,
			subject: this.state.subject,
			message: this.state.message,
			toEmail: this.state.toEmail,
		}	
        TeacherService.sendTeacherEmail(userDetails)
        this.onModalClose();
	}

	setTeacherEmail(email){
		this.resetForm();
		this.setState({
			toEmail: email,
			modalStatus: 'block'
		});
	}

	onModalClose(){
		this.resetForm();
		this.setState({
			modalStatus: 'none'
		});
	}

	resetForm(){
		this.validator.hideMessages();
		document.getElementById("enquiryForm").reset();
		this.setState({
			email: '',
			subject: '',
			message: '',
			toEmail: '',
		});
	}

	render(){

		const teacherDetails = this.props.teachersDetails;
		var modalStatus = {
			display: this.state.modalStatus,
		}

		const { alert } = this.props;

		if(alert && alert.message){
		 var alertMessage = alert.message;
		 var alertType = alert.type;
		 this.props.resetAlertValues();
		}

		return(
			<>
			{alertMessage && alertType === 'success' &&
                  ToastsStore.success(alertMessage) }
            {alertMessage && alertType === 'error' &&
                  ToastsStore.error(alertMessage) } 
			<Banner banner={this.state.banner}/>
			<main>
			 <section className="sec-profile sec-techer-detail">
		      <div className="container">
				<div className="col-md-12">
					<div className="row">
						<div className="card p-4 w100p teacher-card">
							<div className="col-md-3  teacher-pro-div">
								<div className="row">
									<div className="profile-left text-center profile-teacher">
										<div className="profile-img">
										<img src={imagePath('teachers/'+ teacherDetails.image)} />
										</div>
										<ul>
										{ teacherDetails.facebook
										? <li><a href={teacherDetails.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
										: ''
									}
									{ teacherDetails.twitter
										? <li><a href={teacherDetails.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
										: ''
									}
									{ teacherDetails.instagram
										? <li><a href={teacherDetails.instagram} target="_blank"><i className="fab fa-instagram"></i></a></li>
										: ''
									}
										</ul>
										<a className="btn btn-sm"  onClick={this.setTeacherEmail.bind(null,teacherDetails.email)}>Send Email</a>
									</div>
								</div>
							</div>										
							<div className="col-md-9 teacher-content-div">
								<div className="row">
									<div className="profile-content">
									<h5>{teacherDetails.name}</h5>
									<p>{teacherDetails.description}</p>
									<div className="profile-points pd-0">
									<ul className="profile-ul">
										<li className="specialities">Specialities : </li>
										<li>
											<ul className="teacher-specialities-list">
												{teacherDetails.specialities && teacherDetails.specialities.map((items,index) => {
											return(
												<li key={index}><p>{items.name}</p></li>
												);
											})}
											</ul>
										</li>
									</ul>		              
									</div>
								</div>
								</div>
							</div>	
						</div>
						<div className="card d-block w100p">
						<div className="card-panel my-0 teacher-tab-pannel">
							<ul className="nav nav-tabs custom-tabs nowrap " id="myTab" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" id="more-about-tab" data-toggle="tab" href="#more-about" role="tab" aria-controls="more-about"
								aria-selected="true">More About Anandji</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="images-tab" data-toggle="tab" href="#images" role="tab" aria-controls="images"
								aria-selected="false">Images</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="videos-tab" data-toggle="tab" href="#videos" role="tab" aria-controls="videos"
								aria-selected="false">Videos</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="courses-tab" data-toggle="tab" href="#courses" role="tab" aria-controls="courses"
								aria-selected="false">Courses</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="events-tab" data-toggle="tab" href="#events" role="tab" aria-controls="events"
								aria-selected="false">Events</a>
							</li>
							</ul>
							<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="more-about" role="tabpanel" aria-labelledby="more-about-tab">
								<table className="table table-striped profile-table teacher-table">
								<tbody>
									{teacherDetails.info && teacherDetails.info.map((items,index) => {
									return(
										<tr>
										<th key={index}>{items.title}</th>
										<td key={index}>{items.description}</td>
										</tr>
										);
									})}
									{teacherDetails.info && teacherDetails.info.length == 0 ?<tr><td className="p-0"><div className="no_found mt-3">No Data Found</div></td></tr> : ''}
								</tbody>
								</table>
							</div>
							<div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
								<section className="gallery-block grid-gallery pt-0">
									<div className="row"> 
									{teacherDetails.images && teacherDetails.images.map((items,index) => {
									return(
											<TeacherImages image={items}/>
										);
									})}
									{teacherDetails.images && teacherDetails.images.length == 0 ?<div className="col-md-12"><div className="no_found mt-3">No Data Found</div></div> : ''}
									</div>
								</section>
							</div>
							<div className="tab-pane fade" id="videos" role="tabpanel" aria-labelledby="videos-tab">
								{teacherDetails.videos && teacherDetails.videos.map((items,index) => {
								return(
										<TeacherVideos video={items}/>
									);
								})}
								{teacherDetails.videos && teacherDetails.videos.length == 0 ?<div className="no_found mt-3">No Data Found</div> : ''}
							</div>
							<div className="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="courses-tab">
								{teacherDetails.course && teacherDetails.course.map((items,index) => {
								return(
										<TeacherCourses course={items}/>
									);
								})}
								{teacherDetails.course && teacherDetails.course.length == 0 ?<div className="no_found mt-3">No Data Found</div> : ''}
							</div>
							<div className="tab-pane fade" id="events" role="tabpanel" aria-labelledby="events-tab">
								
								<div className="tab-content">
								<div className="tab-pane active" id="january" role="tabpanel" aria-labelledby="january-tab">
									<div className="events-intabs">
									{teacherDetails.events && teacherDetails.events.map((items,index) => {
									return(
											<TeacherEvents event={items}/>
										);
									})}
									{teacherDetails.events && teacherDetails.events.length == 0 ?<div className="no_found mt-3">No Data Found</div> : ''}
									</div>
								</div>
								</div>
							</div>
							</div>
						</div>
						</div>
					
					</div>
				</div>
			  </div>
		    </section>
			</main>
			<div className="modal fade custom-modal show" id="send-mail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
			  aria-hidden="true" style={modalStatus}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <button type="button" className="close" aria-label="Close" onClick={this.onModalClose}>
			        <span aria-hidden="true">&times;</span>
			      </button>
			      <div className="modal-body">
			        <form onSubmit={this.onSubmit} id='enquiryForm'>
			             <div className="input-field position-relative">
			                <label id="email-lbl" for="email" className=" required">Email Address<span className="star">&#160;*</span></label>
			                <input type="email" name="email" id="email" value={this.state.email} onChange={this.onChange}/>
			                {this.validator.message('email', this.state.email, 'required|email')}
			             </div>
			             <div className="input-field position-relative">
			                <label id="subject-lbl" for="subject" className=" required">Subject<span className="star">&#160;*</span></label>
			                <input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.onChange}/>
			                {this.validator.message('subject', this.state.subject, 'required')}
			             </div>
			             <div className="input-field position-relative">
			                <label id="message-lbl" for="message" className=" required">Message<span className="star">&#160;*</span></label>
			                <textarea id="message" className="md-textarea form-control" rows="2" name="message" onChange={this.onChange}>{this.state.message}</textarea>
			                {this.validator.message('message', this.state.message, 'required')}
			             </div>
			            <div className="input-field s12 text-right">
			            	<input type="hidden"id="toEmail" value={this.state.toEmail} name="toEmail"/>
			              <button className="btn btn-lg" type="submit" >Send Now</button>
			            </div>
			        </form>
			      </div>
			    </div>
			  </div>
			</div>	
			</>
			);
	}
}


export default TeacherDetails;