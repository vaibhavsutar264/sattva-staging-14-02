import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../components/Layout';
import UserServices from '../services/userServices';
import SimpleReactValidator from 'simple-react-validator';

class CustomerSupport extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      email: '',
      subject: '',
      message: '',
      name: '',
      type: '',
      alert: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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
      type: this.state.type,
    };
    try {
      const res = await UserServices.sendCustomerSupportMail(userDetails);
      this.setState({
        alert: {
          isloading: false,
        },
      });
      Router.push('/support-success');
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
      <Layout>
        <Head>
          <meta charSet='utf-8' />
          <title>Customer support.</title>
        </Head>
        {alert.isloading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={'/images/loader.png'} />
            </div>
          </div>
        )}
        <div className='t3-wrapper'>
          <main className='admin-content'>
            <div className='sec sec-inabout'>
              <div className='container'>
                <div className='support-heading'>
                  <h4 className='revamp-subheading'>Contact Customer Support</h4>
                  <Link href='/faq'>
                    <a className='btn btn-sm'>FAQ</a>
                  </Link>
                </div>
                {alert.message && alert.type == 'error' && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    {alert.message}
                  </div>
                )}

                <div className=''>
                  <form
                    id='customer-support-form'
                    className='form-validate form-horizontal'
                    onSubmit={this.onSubmit}
                  >
                    <div className='card'>
                      <div className='customer-support'>
                        <legend></legend>
                        <div class='input-field'>
                          <select
                            name='type'
                            id='help'
                            class='rsform-select-box'
                            onChange={this.onChange}
                          >
                            <option value='Feature request'>
                              Feature request
                            </option>
                            <option value='My account'>My account</option>
                            <option value='Payment'>Payment</option>
                            <option value='Video playback and streaming'>
                              Video playback and streaming
                            </option>
                            <option value='Other'>Other</option>
                          </select>
                        </div>
                        <div className='input-field'>
                          <label
                            id='jform_contact_name-lbl'
                            for='jform_contact_name'
                            className='hasTooltip'
                            title='<strong>Name</strong><br />Your name'
                          >
                            Name
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
                            className='hasTooltip'
                            title='<strong>Email</strong><br />Email for contact'
                          >
                            Email
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
                            className='hasTooltip'
                            title='<strong>Subject</strong><br />Enter the subject of your message here .'
                          >
                            Subject
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
                            className='hasTooltip'
                            title='<strong>Message</strong><br />Enter your message here.'
                          >
                            Tell me more about
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
                          <button className='btn btn-sm' type='submit'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    );
  }
}

export default CustomerSupport;
