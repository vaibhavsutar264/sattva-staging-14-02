import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import AuthService from '../services/authServices';
import SimpleReactValidator from 'simple-react-validator';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    const max = 9;
    const rand1 = Math.floor(Math.random(1) * Math.floor(max));
    const rand2 = Math.floor(Math.random(1) * Math.floor(max));
    this.state = {
      email: '',
      alert: {},
      securityVal: '',
      security: true,
      rand1: rand1,
      rand2: rand2,
      currectSecurity: rand1 + rand2,
      alert: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.validator.hideMessages();
    document.getElementById('changePasswordForm').reset();
    this.setState({
      email: '',
      securityVal: '',
      security: true,
    });
  };

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

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ showError: false });
    this.setState({ showSuccess: false });
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    if (!this.state.security) {
      return false;
    }
    this.setState({
      alert: {
        isloading: true,
      },
    });

    try {
      const res = await AuthService.forgotPasswordMail(this.state.email);
      this.setState({
        alert: {
          message: res.data.message,
          type: 'success',
          isloading: false,
        },
      });
      this.resetForm();
    } catch (error) {
      let errorData = error.response.data;
      this.setState({
        alert: {
          message: errorData.message,
          type: 'error',
          isloading: false,
        },
      });
    }
  };

  render() {
    const { alert } = this.state;
    return (
      <Layout>
        <Head>
          <meta charSet='utf-8' />
          <title>Forgot Password.</title>
        </Head>
        {alert.isloading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={'/images/loader.png'} />
            </div>
          </div>
        )}
        <div className='t3-wrapper'>
          <main>
            <div className='sec'>
              <div className='container'>
                <div className='row justify-content-center'>
                  <div className='col-md-7 col-sm-12'>
                    {this.state.security === false && (
                      <div
                        className='alert alert-danger alert-dismissible fade show resetpass-error'
                        role='alert'
                      >
                        <p>Incorrect Recaptcha</p>
                      </div>
                    )}
                    {alert.message && alert.type === 'error' && (
                      <div
                        className='alert alert-danger alert-dismissible fade show'
                        role='alert'
                      >
                        {alert.message}
                      </div>
                    )}
                    {alert.message && alert.type === 'success' && (
                      <div
                        className='alert alert-success alert-dismissible fade show'
                        role='alert'
                      >
                        {alert.message}
                      </div>
                    )}

                    <div className='card subscription-card customer-support'>
                      <form
                        autocomplete='off'
                        id='changePasswordForm'
                        className='form form-horizontal'
                        onSubmit={this.onSubmit}
                      >
                        <h4>Forgot Password</h4>
                        <div className=''>
                          <div className='input-field'>
                            <label id='email-lbl' for='email'>
                              Email Address
                              <span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='email'
                              name='email'
                              id='email'
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
                        </div>
                        <div className='row'>
                          <div className='input-field col-md-12'>
                            <div className='security-check'>
                              <div className='input-group-prepend'>
                                <span>
                                  {this.state.rand1} + {this.state.rand2}
                                </span>
                              </div>
                              <div className='security-addon'>
                                <label id='security-lbl' for='security'>
                                  Security Check{' '}
                                  <span className='required'>&nbsp;*</span>
                                </label>
                                <input
                                  type='number'
                                  name='securityVal'
                                  id='security'
                                  value={this.state.securityVal}
                                  onChange={this.onRecaptchaChange}
                                />
                                {this.validator.message(
                                  'Recaptcha',
                                  this.state.securityVal,
                                  'required'
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=''>
                          <div className='input-field s12'>
                            <button type='submit' className='btn btn-lg'>
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                      <br />
                      <div className='login-links'>
                        <div className='input-field'>
                          <Link href='/login'>
                            <a>Back to Login.</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    );
  }
}

export default ForgotPassword;
