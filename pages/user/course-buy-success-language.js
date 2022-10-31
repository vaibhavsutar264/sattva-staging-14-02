import React, { Component } from 'react';
import Router from 'next/router';
import Layout from '../../components/user/Layout';

class BuyCourseSuccessLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      count: 3,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    setTimeout(() => Router.push('/user/me'), 3000);
    this.interval = setInterval(
      () => this.setState({ count: this.state.count - 1 }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Layout>
        <main>
          <section class='sec vh-100'>
            <div class='container h-100'>
              <div class='row h-100'>
                <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                  <div class='thankyou-div'>
                    <img src='/images/correct-green.png' class='img-fluid' />
                    <h3>Ačiū!</h3>
                    <h6>Mokėjimas sėkmingai atliktas</h6>
                    <p>Dėkojame, kad įsigijote mūsų kursą.</p>
                    <div class='backdiv'>
                      <h3>Peradresuoti {this.state.count}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}
export default BuyCourseSuccessLanguage;
