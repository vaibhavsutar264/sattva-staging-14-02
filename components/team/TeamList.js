import React,{Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import TeamListDetails from './TeamListDetails';
import {fetchTeam} from '../../services/teamService'
import { apiRoute, getApiHeader } from '../../utils/helpers';
import axios from 'axios';
import TeacherService from '../../services/teacherServices';


class TeamList extends Component{

	constructor(props){
		super(props);
	    this.validator = new SimpleReactValidator();
	    this.state = {
	  		email : '',
	  		subject : '',
	  		message: '',
	  		toEmail: '',
	  		modalStatus: 'none',
			  teams:[],
			  emailAlert:false,

	  }	
	  this.onChange = this.onChange.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
	  this.onModalClose = this.onModalClose.bind(this);
	  this.resetForm = this.resetForm.bind(this);
	  this.setTeamEmail = this.setTeamEmail.bind(this);
	}

	componentDidMount(){

		axios.get(apiRoute('get-team-data'))
		.then(res =>{
			this.setState({teams:res.data})
		})
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
		this.resetForm();
		setTimeout(() => {
			this.setState({emailAlert:true});
			 }, 500);

			 setTimeout(() => {
				this.onModalClose();
				this.setState({emailAlert:false});
				 }, 2000);


		
	}

	setTeamEmail(email){
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
			{alertMessage && alertType == 'success' &&
                  ToastsStore.success(alertMessage) }
            {alertMessage && alertType == 'error' &&
                  ToastsStore.error(alertMessage) }
			<section className="gallery-block cards-gallery">
		      	<div className="container">
		        	<div className="row">
		        		{this.state.teams.map((item,index)=>{
							return(
		        				<TeamListDetails key={index} team={item}  setTeamEmail={this.setTeamEmail}/>
							);
						})}	
					</div>
				</div>
			</section>
			<div className="modal fade custom-modal show" id="send-mail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
			  aria-hidden="true" style={modalStatus}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <button type="button" className="close" aria-label="Close" onClick={this.onModalClose}>
			        <span aria-hidden="true">&times;</span>
			      </button>
			      <div className="modal-body">
				  {this.state.emailAlert && (
				  <div className='alert alert-success' role='alert'>
                      Mail sent Successfully
                    </div>
				  )}
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



export default TeamList;