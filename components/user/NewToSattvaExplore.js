import React, { Component } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";
import { Button } from 'react-bootstrap';

export default class NewToSattvaExplore extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    var settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      arrows:false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      infinite: true,
      // centerMode: true,
      // fade: true,
      // cssEase: 'linear'
    };
    return (
      <div>
        <h3 className="text-center border-bottom pb-3">New to Sattva Connect</h3>
        {/* <Slider {...settings}> */}
        <Slider ref={c => (this.slider = c)} {...settings}>
          <div>
            <Card.Body className="p-0">
              <Card.Title className="mt-3">How to search on Sattva Connect</Card.Title>
              <Card.Img variant="top" className="border mb-4" src="/images/explore_new/1.png" />
              {/* <Button variant="primary">Go somewhere</Button> */}
              <p className="font-weight-bold">Follow Steps to do search on Sattva Connect</p>
              <Card.Text>
                <ul>
                <li>Step 1: From top left of the screen click on three line</li>
                <li>Step 2: Click on Search from left sidebar of the screen</li>
                <li>Step 3: Enter the text you want to search on input field and click on "SEARCH HERE" button</li>
              </ul>
            </Card.Text>
            </Card.Body>
          </div>
          <div>
          <Card.Body className="p-0">
            <Card.Title className="mt-3">How to watch series</Card.Title>
            <Card.Img variant="top" className="border mb-4" src="/images/explore_new/2.png" />
            <p className="font-weight-bold">Follow Steps to watch Series on Sattva Connect</p>
              <Card.Text>
                <ul>
                <li>Step 1: From top left of the screen click on three line</li>
                <li>Step 2: Click on Series from left sidebar of the screen</li>
                <li>Step 3: Now you will see section and number of Series click on any series you want to see</li>
              </ul>
            </Card.Text>
          </Card.Body>
          </div>
          <div>
          <Card.Body className="p-0">
            <Card.Title className="mt-3">How to Edit and open Account</Card.Title>
            <Card.Img variant="top" className="border mb-4" src="/images/explore_new/3.png" />
            <p className="font-weight-bold">Follow Steps to go on Account Setting</p>
              <Card.Text>
                <ul>
                <li>Step 1: From top left of the screen click on three line</li>
                <li>Step 2: Click on Setting from left sidebar of the screen</li>
                <li>Step 3: Now you will see the screen of "Account Setting" page edit the field as per your requirement</li>
              </ul>
            </Card.Text>
          </Card.Body>
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
          {/* <button className="button" onClick={this.previous}>
            Previous
          </button> */}
          <button className="button" onClick={this.next}>
            Next
          </button>
        </div>
      </div>
    );
  }
}