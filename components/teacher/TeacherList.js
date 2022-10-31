import React,{Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { apiRoute } from '../../utils/helpers';
import TeacherListDetails from './TeacherListDetails';
import axios from 'axios';
import teacherServices from '../../services/teacherServices';

class TeacherList extends Component{

	constructor(props){
		super(props);
	    this.validator = new SimpleReactValidator();
	    this.state = {
	  		email : '',
	  		subject : '',
	  		message: '',
	  		toEmail: '',
	  		modalStatus: 'none',
			teacher:[],
			emailAlert:false,
	  }	
	  this.onChange = this.onChange.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
	  this.onModalClose = this.onModalClose.bind(this);
	  this.resetForm = this.resetForm.bind(this);
	  this.setTeacherEmail = this.setTeacherEmail.bind(this);
	}

async componentDidMount(){ 
  const res =	await axios.get(apiRoute('get-teachers-data'))
        this.setState({ teacher :res.data });
	  console.log(this.state.teacher);
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
      const data=  teacherServices.sendTeacherEmail(userDetails)
	  this.resetForm();
		setTimeout(() => {
			this.setState({emailAlert:true});
			 }, 500);

			 setTimeout(() => {
				this.onModalClose();
				this.setState({emailAlert:false});
				 }, 2000);
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
			<section className="sec sec-profile">
		      	<div className="myContainer">
		        	<div className="row">
		        	 <div className="col-lg-12 col-md-12 col-sm-12">
		        		{this.state.teacher.map((item,index)=>{
							return(
		        				<TeacherListDetails key={index} teacher={item} setTeacherEmail={this.setTeacherEmail}/>
							);
						})}	
						</div>
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



export default TeacherList;