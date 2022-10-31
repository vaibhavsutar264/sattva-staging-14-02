import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import SimpleReactValidator from 'simple-react-validator';
import UserServices from '../../services/userServices';
import Layout from '../../components/user/Layout';
import { SearchContext } from '../../components/user/ContextSearch';
import { getLocalStorageAuth } from '../../utils/helpers';
import router from 'next/router';

class Support extends Component {
    static contextType = SearchContext;

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            email: '',
            subject: '',
            message: '',
            name: '',
            type: '',
            loading: false,
            alert: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        const auth = getLocalStorageAuth();
        if (!auth.userDetails) {
            const ForUrl = router.pathname
            router.push(`/login/?goto=${ForUrl}`);
            return 0;
        }

        let { si, st } = this.context;

        st('');
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            return false;
        }
        this.setState({ loading: true });
        const userDetails = {
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
            name: this.state.name,
            type: this.state.type,
        };
        UserServices.sendCustomerSupportMail(userDetails)
            .then((res) => {
                this.setState({
                    loading: false,
                    alert: { type: 'success', message: res.data.message },
                });
                Router.push('/user/support-success');
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    alert: {
                        type: 'error',
                        message: 'Something went wrong. Please try again.',
                    },
                });
            });
        this.validator.hideMessages();
        document.getElementById('customer-support-form').reset();
        this.setState({
            email: '',
            subject: '',
            message: '',
            name: '',
        });
        window.scrollTo(0, 0);
    }

    render() {
        const { alert } = this.state;
        return (
            <>
                <main className=''>
                    <div className=''>
                        <div className='container'>
                            {/* <div className='support-heading'>
                                <h4 className='revamp-blog-title mb-0'>Contact Customer Support</h4>
                                <Link href='/user/faq'>
                                    <a className='btn btn-sm'>FAQ</a>
                                </Link>
                            </div> */}
                            <div className="mt-3">
                                <h3 className='revamp-blog-title'>Customer Support</h3>
                            </div>
                            {/* <div className='tooltipster plantype tooltipstered'>
                                Contact Customer Support
                            </div> */}
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
                            <div className=''>
                                <form
                                    id='customer-support-form'
                                    className='form-validate form-horizontal'
                                    onSubmit={this.onSubmit}
                                >
                                    <div className=''>
                                        <div className='customer-support p-0'>
                                            <legend></legend>
                                            <table className='table table-striped profile-table detail-table border-0'>
                                                <tbody>
                                                    <tr>
                                                        <th scope='row'>Feature Request:</th>
                                                        <td className='py-0'>
                                                            <div class='input-field mt-1'>
                                                                <select
                                                                    name='type'
                                                                    id='help'
                                                                    class='rsform-select-box m-0 no-border-btm'
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
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope='row'>Name:</th>
                                                        <td className='py-0'>
                                                            <div className='input-field mt-1'>
                                                                <input
                                                                    type='text'
                                                                    name='name'
                                                                    id='jform_contact_name'
                                                                    size='30'
                                                                    aria-required='true'
                                                                    value={this.state.name}
                                                                    onChange={this.onChange}
                                                                    className='m-0 no-border-btm'
                                                                    placeholder='Your name'
                                                                />
                                                                {this.validator.message(
                                                                    'name',
                                                                    this.state.name,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope='row'>Email:</th>
                                                        <td className='py-0'>
                                                            <div className='input-field mt-1'>
                                                                <input
                                                                    type='email'
                                                                    name='email'
                                                                    className='validate-email form-control m-0 no-border-btm'
                                                                    id='jform_contact_email'
                                                                    size='30'
                                                                    aria-required='true'
                                                                    value={this.state.email}
                                                                    onChange={this.onChange}
                                                                    placeholder='Your email'
                                                                />
                                                                {this.validator.message(
                                                                    'email',
                                                                    this.state.email,
                                                                    'required|email'
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope='row'>Subject:</th>
                                                        <td className='py-0'>
                                                            <div className='input-field mt-1'>
                                                                <input
                                                                    type='text'
                                                                    name='subject'
                                                                    id='jform_contact_emailmsg'
                                                                    size='60'
                                                                    aria-required='true'
                                                                    value={this.state.subject}
                                                                    onChange={this.onChange}
                                                                    className="m-0 no-border-btm"
                                                                    placeholder='Subject'
                                                                />
                                                                {this.validator.message(
                                                                    'subject',
                                                                    this.state.subject,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope='row'>Message:</th>
                                                        <td className='py-0'>
                                                            <div className='input-field'>
                                                                <textarea
                                                                    name='message'
                                                                    id='jform_contact_message'
                                                                    cols='50'
                                                                    rows='4'
                                                                    className='materialize-textarea form-control no-border-btm'
                                                                    aria-required='true'
                                                                    onChange={this.onChange}
                                                                    placeholder='Your message'
                                                                ></textarea>
                                                                {this.validator.message(
                                                                    'message',
                                                                    this.state.message,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className='input-field text-right'>
                                                <button className='btn btn-sm' type='submit'>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p className='revamp-para-xs mt-3'>
                                    You may also find our
                                    <Link href='/user/faq' rel='alternate'>
                                        <a> FAQ</a>
                                    </Link>{' '}
                                    section helpful.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
export default Support;
