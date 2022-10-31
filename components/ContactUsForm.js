import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import UserServices from '../services/userServices';

class ContactUsForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    const max = 9;
    const rand1 = Math.floor(Math.random(1) * Math.floor(max));
    const rand2 = Math.floor(Math.random(1) * Math.floor(max));
    this.state = {
      email: '',
      subject: '',
      message: '',
      name: '',
      security: true,
      rand1: rand1,
      rand2: rand2,
      currectSecurity: rand1 + rand2,
      alert: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onRecaptchaChange = (e) => {
    this.setState({ securityVal: e.target.value });
    let currentVal = Number(e.target.value);
    const currectVal = this.state.currectSecurity;
    if (currentVal !== currectVal) {
      this.setState({ security: false });
    } else {
      this.setState({ security: true });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    if (!this.state.security) {
      window.scrollTo(0, 0);
      return false;
    }
    this.setState({
      alert: {
        isloading: true,
      },
    });
    const userDetails = {
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
      name: this.state.name,
    };
    try {
      const res = await UserServices.sendContactMail(userDetails);
      this.setState({
        alert: {
          message: res.data.message,
          type: 'success',
          isloading: false,
        },
        email: '',
        subject: '',
        message: '',
        name: '',
        securityVal: '',
      });
      this.validator.hideMessages();
      document.getElementById('contact-form').reset();
    } catch (err) {
      this.setState({
        alert: {
          message: 'Something Went Wrong, Try Again',
          type: 'error',
          isloading: false,
        },
      });
    }
  }

  render() {
    const { alert } = this.state;
    return (
      <Fragment>
        {alert.isloading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={'/images/loader.png'} />
            </div>
          </div>
        )}
        <div className='t3-wrapper'>
          <main className='contact-us'>
            <section className='sec'>
              <div className='container'>
                {alert.message && alert.type == 'error' && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    {alert.message}
                  </div>
                )}
                {alert.message && alert.type == 'success' && (
                  <div
                    className='alert alert-success alert-dismissible fade show'
                    role='alert'
                  >
                    {alert.message}
                  </div>
                )}
                {this.state.security === false && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>Incorrect Recaptcha.</p>
                  </div>
                )}
                <div className='row'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                    <h4>Contact Us</h4>
                    <div className='contact-form card'>
                      <form
                        id='contact-form'
                        className='form-validate form-horizontal'
                        onSubmit={this.onSubmit}
                      >
                        <div className='customer-support'>
                          <legend></legend>
                          <div className='input-field'>
                            <label
                              id='jform_contact_name-lbl'
                              for='jform_contact_name'
                              className='hasTooltip control-label'
                              title='<strong>Name</strong><br />Your name'
                            >
                              Name<span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='text'
                              name='name'
                              id='jform_contact_name'
                              size='30'
                              aria-required='true'
                              value={this.state.name}
                              onChange={this.onChange}
                            />
                            {this.validator.message(
                              'name',
                              this.state.name,
                              'required'
                            )}
                          </div>
                          <div className='input-field'>
                            <label
                              id='jform_contact_email-lbl'
                              for='jform_contact_email'
                              className='hasTooltip control-label'
                              title='<strong>Email</strong><br />Email for contact'
                            >
                              Email<span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='email'
                              name='email'
                              className='validate-email form-control'
                              id='jform_contact_email'
                              size='30'
                              aria-required='true'
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            {this.validator.message(
                              'email',
                              this.state.email,
                              'required|email'
                            )}
                          </div>
                          <div className='input-field'>
                            <label
                              id='jform_contact_emailmsg-lbl'
                              for='jform_contact_emailmsg'
                              className='hasTooltip control-label'
                              title='<strong>Subject</strong><br />Enter the subject of your message here .'
                            >
                              Subject<span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='text'
                              name='subject'
                              id='jform_contact_emailmsg'
                              size='60'
                              aria-required='true'
                              value={this.state.subject}
                              onChange={this.onChange}
                            />
                            {this.validator.message(
                              'subject',
                              this.state.subject,
                              'required'
                            )}
                          </div>
                          <div className='input-field'>
                            <label
                              id='jform_contact_message-lbl'
                              for='jform_contact_message'
                              className='hasTooltip control-label'
                              title='<strong>Message</strong><br />Enter your message here.'
                            >
                              Message<span className='required'>&#160;*</span>
                            </label>
                            <textarea
                              name='message'
                              id='jform_contact_message'
                              cols='50'
                              rows='3'
                              className='materialize-textarea form-control'
                              aria-required='true'
                              onChange={this.onChange}
                            ></textarea>
                            {this.validator.message(
                              'message',
                              this.state.message,
                              'required'
                            )}
                          </div>
                          <div className='input-field'>
                            <div className='security-check'>
                              <div className='input-group-prepend'>
                                <span>
                                  {this.state.rand1} + {this.state.rand2}
                                </span>
                              </div>
                              <div className='security-addon'>
                                <label
                                  id='security-lbl'
                                  for='security'
                                  className='hasTooltip control-label'
                                >
                                  Security Check{' '}
                                  <span className='required'>&nbsp;*</span>
                                </label>
                                <input
                                  type='number'
                                  name='securityVal'
                                  id='security'
                                  value={this.state.securityVal}
                                  onChange={this.onChange}
                                  onBlur={this.onRecaptchaChange}
                                />
                                {this.validator.message(
                                  'Recaptcha',
                                  this.state.securityVal,
                                  'required'
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='input-field'>
                            <button className='btn btn-lg' type='submit'>
                              Send Email
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Fragment>
    );
  }
}
export default ContactUsForm;
