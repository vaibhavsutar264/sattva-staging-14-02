import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../../components/Layout';
import AuthService from '../../services/authServices';
import SimpleReactValidator from 'simple-react-validator';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    const max = 9;
    const rand1 = Math.floor(Math.random(1) * Math.floor(max));
    const rand2 = Math.floor(Math.random(1) * Math.floor(max));
    this.state = {
      userId: this.props.userId,
      password: '',
      confirmPassword: '',
      showError: false,
      errorMessage: '',
      showSuccess: false,
      successMessage: '',
      securityVal: '',
      security: true,
      rand1: rand1,
      rand2: rand2,
      passwordStatus: true,
      currectSecurity: rand1 + rand2,
      isLoading: false,
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.onRecaptchaChange = this.onRecaptchaChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRecaptchaChange(e) {
    this.setState({ securityVal: e.target.value });
    let currentVal = Number(e.target.value);
    const currectVal = this.state.currectSecurity;
    if (currentVal !== currectVal) {
      this.setState({ security: false });
    } else {
      this.setState({ security: true });
    }
  }

  onSubmit(e) {
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
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordStatus: false });
      return false;
    } else {
      this.setState({ passwordStatus: true });
    }
    this.setState({ isLoading: true });
    const userDetails = {
      id: atob(this.state.userId),
      password: this.state.password,
    };
    AuthService.changePassword(userDetails)
      .then((res) => {
        this.resetForm();
        this.setState({ isLoading: false });
        this.setState({ showError: false });
        this.setState({ errorMessage: '' });
        this.setState({ showSuccess: true });
        this.setState({ successMessage: res.data.message });
        setTimeout(() => {
          Router.push('/login');
        }, 2000);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        this.setState({ showSuccess: false });
        this.setState({ successMessage: '' });
        this.setState({ showError: true });
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  resetForm() {
    this.validator.hideMessages();
    document.getElementById('changePasswordForm').reset();
    this.setState({
      password: '',
      confirmPassword: '',
      securityVal: '',
      security: true,
    });
  }
  render() {
    return (
      <>
        <Layout loading={this.state.isLoading}>
          <main>
            <section className='sec'>
              <div className='container'>
                <div className='row justify-content-center'>
                  <div className='col-md-7 col-sm-12'>
                    {this.state.showError === true && (
                      <div
                        className='alert alert-danger alert-dismissible fade show'
                        role='alert'
                      >
                        <p>{this.state.errorMessage}</p>
                      </div>
                    )}
                    {this.state.showSuccess === true && (
                      <div
                        className='alert alert-success alert-dismissible fade show'
                        role='alert'
                      >
                        <p>{this.state.successMessage}</p>
                      </div>
                    )}
                    <div className='card subscription-card customer-support'>
                      <form
                        autocomplete='off'
                        id='changePasswordForm'
                        className='form form-horizontal'
                        onSubmit={this.onSubmit}
                      >
                        <h4>Change Password</h4>
                        <div className=''>
                          <div className='input-field'>
                            <label id='password-lbl' for='password'>
                              Password<span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='password'
                              name='password'
                              id='password'
                              aria-required='true'
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                            {this.validator.message(
                              'password',
                              this.state.password,
                              'required'
                            )}
                          </div>
                        </div>
                        <div className=''>
                          <div className='input-field'>
                            <label id='password-lbl' for='password'>
                              Re-enter Password
                              <span className='required'>&#160;*</span>
                            </label>
                            <input
                              type='password'
                              name='confirmPassword'
                              id='password'
                              aria-required='true'
                              value={this.state.confirmPassword}
                              onChange={this.onChange}
                            />
                            {this.validator.message(
                              'confirmPassword',
                              this.state.confirmPassword,
                              'required'
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
                          <div className='input-field col-md-12'>
                            {this.state.security === false && (
                              <div
                                className='alert alert-danger alert-dismissible fade show resetpass-error'
                                role='alert'
                              >
                                <p>Incorrect Recaptcha</p>
                              </div>
                            )}
                            {this.state.passwordStatus === false && (
                              <div
                                className='alert alert-danger alert-dismissible fade show resetpass-error'
                                role='alert'
                              >
                                <p>Password does not match</p>
                              </div>
                            )}
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
            </section>
          </main>
        </Layout>
      </>
    );
  }
}
export const getServerSideProps = async ({ params }) => {
  const { userId } = params;
  return {
    props: { userId },
  };
};
export default ChangePassword;
