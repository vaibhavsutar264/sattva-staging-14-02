import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../../utils/helpers';
import SimpleReactValidator from 'simple-react-validator';
import 'react-datepicker/dist/react-datepicker.css';
import AuthService from '../../services/authServices';
import { getLocalStorageAuth } from '../../utils/helpers';

class UserTeacherAccess extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      graduationDate: '',
      description: '',
      userId: '',
      userFirstName: '',
      userLastName: '',
      status: false,
      accessDetails: {},
      alert: false,
      alertType: '',
      alertMsg: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const auth = getLocalStorageAuth();
    if (auth) {
      const userDetails = auth.userDetails;
      const userId = userDetails.id;
      this.setState({
        userId: userId,
        userLastName: userDetails.last_name,
        userFirstName: userDetails.first_name,
      });
      const requestOptions = {
        headers: getApiHeader(true),
      };

      axios
        .get(apiRoute('get-teacher-access/' + btoa(userId)), requestOptions)
        .then((res) => {
          this.setState({ accessDetails: res.data });
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange = (date) => {
    this.setState({
      graduationDate: date,
    });
  };

  onSubmit(e) {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    this.props.setLoading(true);
    const details = {
      graduation_date: this.state.graduationDate,
      description: this.state.description,
      user_id: this.state.userId,
    };
    AuthService.teacherAccessRequest(details)
      .then((res) => {
        window.scrollTo(0, 0);
        this.props.setLoading(false);
        this.setState({
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          status: true,
        });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          error: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
        this.props.setLoading(false);
      });
  }

  render() {
    const { alert, alertType, alertMsg } = this.state;
    if (this.state.status === true) {
      return (
        <>
          {alert && alertType === 'error' && (
            <div className='alert alert-danger' role='alert'>
              {alertMsg}
            </div>
          )}
          {alert && alertType === 'success' && (
            <div className='alert alert-success' role='alert'>
              {alertMsg}
            </div>
          )}
          <h5 className='edtheadpic mt-5 revamp-para-small'>Access teacher exclusive content.</h5>
          <div class='left-align descres mb-20 revamp-para-small'>
            <h5 className='revamp-para'>
              <br />
              Hi, {this.state.userFirstName} {this.state.userLastName}
            </h5>
          </div>
          <div>
            <h5 className='already-submitted revamp-para-small'>
              SYA teacher exclusive content request sent successfully
            </h5>
            <div className='tooltipster plantype tooltipstered'>Unapprove</div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {alert && alertType === 'error' && (
            <div className='alert alert-danger mt-3' role='alert'>
              {alertMsg}
            </div>
          )}
          {alert && alertType === 'success' && (
            <div className='alert alert-success mt-3' role='alert'>
              {alertMsg}
            </div>
          )}
          {/* <h5 className='edtheadpic mt-5 revamp-para-small'>Access teacher exclusive content.</h5> */}
          {/* <div class='left-align descres mb-20'>
            <h5 className='revamp-para-small'>
              <br />
              Hi, {this.state.userFirstName} {this.state.userLastName}
            </h5>
          </div> */}

          {Object.keys(this.state.accessDetails).length == 0 ? (
            <>
              <h5 className='edtheadpic mt-5 revamp-para-small'>Request access to SYA exclusive content (only accessible to SYA YTT graduates).</h5>
              <form
                className='customer-form teacherEx-form'
                id='userForm'
                onSubmit={this.onSubmit}
              >
                <div className='profile-inputs pl-0'>
                  <div id='rsform_4_page_0'>
                    <div className='input-field custom-datepicker'>
                      <i className='fa fa-calendar' />
                      <DatePicker
                        selected={this.state.graduationDate}
                        onChange={this.handleDateChange}
                        dateFormat='yyyy-MM-dd'
                        maxDate={new Date()}
                        className=''
                      />
                      <label htmlFor='graduationDate' className='active'>
                        Graduation Date
                      </label>
                      {this.validator.message(
                        'graduationDate',
                        this.state.graduationDate,
                        'required'
                      )}
                    </div>
                    <div className='input-field'>
                      <i className='fa fa-pencil-square' />
                      <textarea
                        cols={50}
                        rows={5}
                        name='description'
                        id='description'
                        className='rsform-text-box'
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                      <label htmlFor='address'>Description</label>
                      {this.validator.message(
                        'description',
                        this.state.description,
                        'required'
                      )}
                    </div>
                  </div>
                </div>
                <input type='hidden' name='form[formId]' defaultValue={4} />
                <div className='text-right'>
                  <button
                    className='btn waves-effect waves-light tooltipster tooltipstered'
                    type='submit'
                    name='action'
                  >
                    Send request{' '}
                    <i class='fa fa-paper-plane' aria-hidden='true'></i>
                  </button>
                </div>
              </form>
            </>
          ) : (
            ''
          )}
          {Object.keys(this.state.accessDetails).length > 0 &&
            this.state.accessDetails.status == 1 ? (

            <div>
              <h5 className='already-submitted mt-5 revamp-para-small'>
                Your access to SYA exclusive content has been approved.
              </h5>
              <div className='tooltipster plantype tooltipstered'>Approved</div>
            </div>
          ) : (
            ''
          )}
          {Object.keys(this.state.accessDetails).length > 0 &&
            this.state.accessDetails.status == 0 ? (
            <div>
              <h5 className='edtheadpic mt-5 revamp-para-small'>Access teacher exclusive content.</h5>
              <div class='left-align descres mb-20'>
                <h5 className='revamp-para-small'>
                  <br />
                  Hi, {this.state.userFirstName} {this.state.userLastName}
                </h5>
              </div>
              <h5 className='already-submitted revamp-para-small'>
                SYA teacher exclusive content request sent successfully
              </h5>
              <div className='tooltipster plantype tooltipstered'>
                Unapprove
              </div>
            </div>
          ) : (
            ''
          )}

          {Object.keys(this.state.accessDetails).length > 0 &&
            this.state.accessDetails.status == 2 ? (
            <form
              className='customer-form teacherEx-form'
              id='userForm'
              onSubmit={this.onSubmit}
            >
              <div className='profile-inputs pl-0'>
                <div id='rsform_4_page_0'>
                  <div className='input-field custom-datepicker'>
                    <i className='fa fa-calendar' />
                    <DatePicker
                      selected={this.state.graduationDate}
                      onChange={this.handleDateChange}
                      dateFormat='yyyy-MM-dd'
                      maxDate={new Date()}
                    />
                    <label htmlFor='graduationDate' className='active'>
                      Graduation Date
                    </label>
                    {this.validator.message(
                      'graduationDate',
                      this.state.graduationDate,
                      'required'
                    )}
                  </div>
                  <div className='input-field'>
                    <i className='fa fa-pencil-square' />
                    <textarea
                      cols={50}
                      rows={5}
                      name='description'
                      id='description'
                      className='rsform-text-box'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    <label htmlFor='address'>Description</label>
                    {this.validator.message(
                      'description',
                      this.state.description,
                      'required'
                    )}
                  </div>
                </div>
              </div>
              <input type='hidden' name='form[formId]' defaultValue={4} />
              <div className='text-right'>
                <button
                  className='btn waves-effect waves-light tooltipster tooltipstered'
                  type='submit'
                  name='action'
                >
                  Send request{' '}
                  <i class='fa fa-paper-plane' aria-hidden='true'></i>
                </button>
              </div>
            </form>
          ) : (
            ''
          )}

          {Object.keys(this.state.accessDetails).length > 0 &&
            this.state.accessDetails.status == 3 ? (
            <form
              className='customer-form teacherEx-form'
              id='userForm'
              onSubmit={this.onSubmit}
            >
              <div className='profile-inputs pl-0'>
                <div id='rsform_4_page_0'>
                  <div className='input-field custom-datepicker'>
                    <i className='fa fa-calendar' />
                    <DatePicker
                      selected={this.state.graduationDate}
                      onChange={this.handleDateChange}
                      dateFormat='yyyy-MM-dd'
                      maxDate={new Date()}
                    />
                    <label htmlFor='graduationDate' className='active'>
                      Graduation Date
                    </label>
                    {this.validator.message(
                      'graduationDate',
                      this.state.graduationDate,
                      'required'
                    )}
                  </div>
                  <div className='input-field'>
                    <i className='fa fa-pencil-square' />
                    <textarea
                      cols={50}
                      rows={5}
                      name='description'
                      id='description'
                      className='rsform-text-box'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    <label htmlFor='address'>Description</label>
                    {this.validator.message(
                      'description',
                      this.state.description,
                      'required'
                    )}
                  </div>
                </div>
              </div>
              <input type='hidden' name='form[formId]' defaultValue={4} />
              <div className='text-right'>
                <button
                  className='btn waves-effect waves-light tooltipster tooltipstered'
                  type='submit'
                  name='action'
                >
                  Send request{' '}
                  <i class='fa fa-paper-plane' aria-hidden='true'></i>
                </button>
              </div>
            </form>
          ) : (
            ''
          )}
        </>
      );
    }
  }
}

export default UserTeacherAccess;
