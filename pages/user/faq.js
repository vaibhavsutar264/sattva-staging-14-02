import React, { Fragment } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Head from 'next/head';
import Layout from '../../components/user/Layout';

export default function faq() {
  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>FAQ.</title>
      </Head>
      <div className='light-purplebg' style={{ minHeight: '100vh' }}>
        <main>
          <section className='sec sec-inabout sec-faq'>
            <div className='container'>
              <p className='revamp-para-small'>
                Welcome to FAQ on Sattva Connect. This section is updated
                regularly.
              </p>
              <p className='revamp-para-small'>
                However, if you do not find the answer to your question, please
                send an inquiry to{' '}
                <Link href='/customer-support' rel='alternate'>
                  <a>Customer Support</a>
                </Link>
                . Here you may find the{' '}
                <Link href='/user/privacy-policy' rel='alternate'>
                  <a>Privacy Policy</a>
                </Link>{' '}
                and{' '}
                <Link href='/user/terms-of-services' rel='alternate'>
                  <a>Terms of Services</a>
                </Link>
                .
              </p>
              <h4 className='revamp-subtitle'>Frequently asked questions</h4>
              <Accordion
                className='custom-accordion faq-accordion p-2'
                allowZeroExpanded={true}
              >
                <AccordionItem>
                  <AccordionItemHeading className='accordion-header'>
                    <AccordionItemButton>Subscription</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className='card-body'>
                      <h5 className='revamp-para'>Settings: My account</h5>
                      <ul>
                        <li>
                          <strong>Update my account</strong>You may change your
                          name and contact details under settings and{' '}
                          <a href='#' rel='alternate'>
                            member profile
                          </a>
                          .
                        </li>
                        <li>
                          <strong>Change login details</strong>You may change
                          your login details (user name and password) under
                          settings and{' '}
                          <a href='#' rel='alternate'>
                            member profile
                          </a>
                          .
                        </li>
                        <li>
                          <strong>Change password</strong>You may change your
                          password under settings and{' '}
                          <a href='#' rel='alternate'>
                            member profile
                          </a>
                          .
                        </li>
                      </ul>
                      <h5 className='revamp-para'>Settings: Payment method</h5>
                      <ul>
                        <li>
                          <strong>Update credit card information</strong>You may
                          update your credit card information under settings,
                          payment and{' '}
                          <a href='#' rel='alternate'>
                            manage payment method
                          </a>
                          .
                        </li>
                        <li>
                          <strong>Change payment method</strong>You may change
                          your method of payment under settings, payment and{' '}
                          <a href='#' rel='alternate'>
                            manage payment method
                          </a>
                          .
                        </li>
                        <li>
                          <strong>View transaction history</strong>You may view
                          your transaction history under settings and{' '}
                          <a href='#' rel='alternate'>
                            payment
                          </a>
                          .
                        </li>
                        <li>
                          <strong>Print receipts</strong>You may view your
                          transaction history and print receipts under settings
                          and{' '}
                          <a href='#' rel='alternate'>
                            payment
                          </a>
                          .
                        </li>
                      </ul>
                      <h5 className='revamp-para'>Cancellation</h5>
                      <p>
                        You may cancel your subscription anytime through your{' '}
                        <a href='#' rel='alternate'>
                          member profile
                        </a>
                        . The subscription plan will continue to the end of your
                        last payment period. Your subscription may be
                        reactivated at any moment in time. If you wish to delete
                        your account permanently, you may do that through the{' '}
                        <a href='#' rel='alternate'>
                          member profile
                        </a>
                        .
                      </p>
                      <p> </p>
                      <h5 className='revamp-para'>Reactivation</h5>
                      <p>
                        Your subscription may be reactivated at any moment in
                        time. Logon to the Sattva Connect website with your old
                        login details and pay for the subscription of choice.
                        Voila! Your account has been reactivated and all your
                        old information is restored. We recommend that you go to
                        settings and update your member profile and payment
                        information to ensure that it is correct and up-to-date.
                      </p>
                      <p> </p>
                      <h5 className='revamp-para'>Upgrade subscription</h5>
                      <p>
                        You may upgrade your subscription under ‘Settings’ and
                        ‘Payment’. Your upgrade of subscription will be
                        activated immediately and Sattva Connect prorates the
                        subscription prices. You will receive a confirmation
                        with the prorated amount shortly after you have upgraded
                        to your yearly subscription plan.
                      </p>
                      <p> </p>
                      <h5 className='revamp-para'>Downgrade subscription</h5>
                      <p>
                        Sattva Connect has restricted downgrading your
                        subscription. If you want to down grade your
                        subscription, you must first cancel your yearly
                        subscription and then sign up again. The subscription
                        plan will continue to the end of your last payment
                        period.
                      </p>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading className='accordion-header'>
                    <AccordionItemButton>Live Stream</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className='card-body'>
                      <ul>
                        <li>
                          <strong>How to access an ongoing live stream?</strong>
                          You can access an ongoing Live Stream by clicking
                          ‘Live Stream’ in the left-hand navigation bar on your
                          ‘Member homepage.’ Then, click ‘Join ongoing Live
                          Stream.’{' '}
                        </li>
                        <li>
                          <strong>
                            Where do I find the recorded live streams?
                          </strong>
                          The easiest way to find the recorded live streams is
                          by clicking ‘Live Stream’ on the left-hand navigation
                          bar on your ‘Member homepage.’ The recorded live
                          streams can also be found under ‘Search,’ ‘Style,’
                          ‘Wisdom’ and ‘Recorded Live Streams.’
                        </li>
                      </ul>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading className='accordion-header'>
                    <AccordionItemButton>
                      Teacher Exclusive Content
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className='card-body'>
                      <ul>
                        <li>
                          <strong>
                            Who can apply for access to the teacher exclusive
                            content?
                          </strong>
                          Students who have graduated from Sattva Yoga Academy
                          can request access to teacher exclusive content
                        </li>
                        <li>
                          <strong>
                            Where can I request access to the teacher exclusive
                            content?
                          </strong>
                          You may request access to the teacher exclusive
                          content under settings and{' '}
                          <a href='#' rel='alternate'>
                            teacher exclusive
                          </a>
                          .
                        </li>
                      </ul>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
