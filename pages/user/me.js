import React, { Component } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const MeMobile = dynamic(() => import("../../components/user/MeMobile"), {
  ssr: false,
});
import Link from "next/link";
import {
  apiRoute,
  getApiHeader,
  getUserId,
  getLocalStorageAuth,
  setLocalStorageAuth,
} from "../../utils/helpers";

import VideoDetails from "../../components/user/VideoDetails";
import CourseOverView from "../../components/user/course/CourseOverView";
import VideoDetailsMobile from "../../components/user/VideoDetailsMobile";
import CourseOverViewMobile from "../../components/user/course/CourseOverViewMobile";
import Layout from "../../components/user/Layout";
import Series from "../../components/user/Series";
import FavSeries from "../../components/user/FavSeries";
import { SearchContext } from "../../components/user/ContextSearch";
import router from "next/router";
import SurpiseMe from "../../components/SurpiseMe";
import "../../public/js/counter";
import Head from "next/head";

export default class Me extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      myClasses: [],
      myFavorite: [],
      recentlyWatched: [],
      recommended: [],
      newlyAdded: [],
      myCourses: [],
      availableCourse: [],
      alert: false,
      alertType: "",
      alertMsg: "",
      loading: true,
      seriesdata: [],
      myFavoriteSeries: [],
      surprisemeVideo: "",
    };
  }
  componentDidMount() {
    const getId = getLocalStorageAuth();
    if (!getId.userDetails) {
      const ForUrl = router.asPath;
      const ForUrl2 = router.pathname;
      console.log("forurl1" + ForUrl);
      console.log("forurl2" + ForUrl2);
      router.push(`/login/?goto=${ForUrl}`);
      return 0;
    }
    let id = getId.userDetails.id;
    let id1 = id.toString();
    console.log(id1);
    //stagging
    // appId: "40192d8c-9efa-4b26-ae5f-ebf0de7602b9",

    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "530f8c19-d32a-48e7-8487-7dbf523f3a0a",
        // notifyButton: {
        //   enable: true,
        // },
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.showNativePrompt();

      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
          console.log("Push notifications are enabled!");
          OneSignal.showSlidedownPrompt();
          OneSignal.setExternalUserId(id1);
        } else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });

    axios
      .get(apiRoute("get-series-data"))
      .then((response) => {
        // handle success
        this.setState({ seriesdata: response.data.reverse() });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    const userId = getUserId(this.props.history);
    this.setState({ userId: userId });
    const auth = getLocalStorageAuth();
    if (auth) {
      var hasSubscription = auth.userDetails.has_subscription;
    } else {
      var hasSubscription = "0";
    }
    const requestOptions = {
      headers: getApiHeader(true),
    };
    axios
      .get(
        apiRoute(
          "user-dashboard/get-favorite-videos/" + userId + "/" + 0 + "/" + 4
        ),
        requestOptions
      )
      .then((res) => {
        this.setState({ myFavorite: res.data.videos });
        this.setState({ myFavoriteSeries: res.data.series });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    axios
      .get(
        apiRoute("user-dashboard/get-user-details/" + userId),
        requestOptions
      )
      .then((res) => {
        let userData = res.data;
        userData.access_token = auth.access_token;
        setLocalStorageAuth(userData);
      });

    axios
      .get(
        apiRoute(
          "user-dashboard/get-classes-videos/" + userId + "/" + 0 + "/" + 4
        ),
        requestOptions
      )
      .then((res) => {
        this.setState({ myClasses: res.data.videos });
      });

    axios
      .get(
        apiRoute(
          "user-dashboard/get-recent-watched-videos/" +
            userId +
            "/" +
            +0 +
            "/" +
            4
        ),
        requestOptions
      )
      .then((res) => {
        this.setState({ recentlyWatched: res.data.videos });
      });

    axios
      .get(
        apiRoute("user-dashboard/get-all-videos/" + 0 + "/" + 4),
        requestOptions
      )
      .then((res) => {
        this.setState({ newlyAdded: res.data.videos });
      });

    axios
      .get(
        apiRoute("user-dashboard/get-all-featured-videos/" + 0 + "/" + 4),
        requestOptions
      )
      .then((res) => {
        this.setState({ recommended: res.data.videos });
      });

    axios
      .get(apiRoute("my-courses/" + userId + "/" + 0), requestOptions)
      .then((res) => {
        if (hasSubscription == "1") {
          let allCourses = [...res.data.courses, ...res.data.freeCourses];
          var myAllCourses = allCourses.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
          console.log("from me page");
          console.log(res.data);
        } else {
          let allCourses = res.data.courses;
          var myAllCourses = allCourses.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
        }
        this.setState({ myCourses: myAllCourses });
      });

    axios
      .get(
        apiRoute("user-available-courses/" + userId + "/" + 0),
        requestOptions
      )
      .then((res) => {
        if (hasSubscription == "1") {
          var myArray = res.data.courses;
          var toRemove = res.data.freeCourses;
          for (var i = myArray.length - 1; i >= 0; i--) {
            for (var j = 0; j < toRemove.length; j++) {
              if (myArray[i] && myArray[i].id === toRemove[j].id) {
                myArray.splice(i, 1);
              }
            }
          }
          var allAvailableCourse = myArray;
        } else {
          var allAvailableCourse = res.data.courses;
        }
        this.setState({ availableCourse: allAvailableCourse });
      });

    let { si, st } = this.context;

    st("");

    window.scrollTo(0, 0);
  }

  surpriseMe = () => {
    const requestOptions = { headers: getApiHeader(true) };
    axios.get(apiRoute("get-surprise-me", requestOptions)).then((res) => {
      console.log(res.data);
      // this.setState({ surprisemeVideo: "https:\/\/player.vimeo.com\/video\/278730789?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=129872" });
      this.setState({ surprisemeVideo: res.data });
    });
  };
  render() {
    console.log(this.state.seriesdata);
    return (
      <Layout loading={this.state.loading}>
        <main className="admin-content light-purplebg">
          <section
            className="inner-banner mb-0"
            style={{
              background: "url(/../images/15.png)",
              backgroundSize: "cover",
              minHeight: "500px",
            }}
          >
            <Head>
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
                integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              ></script>
            </Head>
            <div className="container text-center text-white">
              <h1 className="revamp-signature-heading mb-0">
                Your Yoga Studio
              </h1>
              <p className="revamp-banner-para">Designed by You for You</p>
            </div>
          </section>

          {/* Counter added */}
          <section className="new-secHomeCount">
            <div className="container">
              <div
                className="row justify-content-center align-content-center text-center flex-nowrap"
                style={{ marginLeft: "25px" }}
              >
                <div className="col-lg-2 col-sm-12 counter-width ">
                  <div className="item">
                    <div className="countBox">
                      <span className=" ">You have</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="900">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">saved classes</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2  col-sm-12 counter-width">
                  <div className="item">
                    <div className="countBox">
                      <span className="">You have</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="600">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">favourite classes</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2  col-sm-12 counter-width">
                  <div className="item">
                    <div className="countBox">
                      <span className="">You have</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="200">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">completed classes</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-12 counter-width">
                  <div className="item">
                    <div className="countBox">
                      <span className="">You have</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="120">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">series</h4>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-sm-12 counter-width">
                  <div className="item">
                    <div className="countBox">
                      <span className="">You have</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="60">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">courses</h4>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-sm-12 counter-width">
                  <div className="item">
                    <div className="countBox">
                      <span className="">You participated in</span>
                      <h3 className="new-count">
                        <span className="counting" data-count="30">
                          0
                        </span>{" "}
                      </h3>
                      <h4 className="new-count-type">live classes</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sec sec-inabout bg-white">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p className="revamp-para">
                    Find your saved and favourite classes, series you've
                    followed, courses you've purchased, view your
                    recommendations and revisit those classes you've recently
                    watched, all in one place.
                  </p>
                  <div className="text-center">
                    <Link href="/user/search">
                      <a className="btn btn-sm">Find a class</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="sec sec-desktop pb-0">
            <div className="container">
              <div className="class-block mt-0">
                <h4 className="revamp-subtitle">My Classes</h4>
                <div className="row">
                  {this.state.myClasses.map((item, index) => {
                    return (
                      <VideoDetails item={item.video} key={item.video.id} />
                    );
                  })}
                </div>
                {this.state.myClasses.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/my-classes">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.myClasses.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        View your saved classes here. Click on Discover Now to
                        find and save a class.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="class-block mt-0">
                <h4 className="revamp-subtitle">My Series</h4>
                <div className="row">
                  {this.state.myFavoriteSeries.map((item, index) => {
                    if (index < 4)
                      return (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                          <FavSeries data={item.series} />
                        </div>
                      );
                  })}
                </div>
                {this.state.myFavoriteSeries.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/series">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.myFavoriteSeries.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        View your saved series here. Click on Discover Now to
                        find and save a series.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/series">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="container">
              <div className="class-block">
                <h4 className="revamp-subtitle">My Favorites</h4>
                <div className="row">
                  {this.state.myFavorite.map((item, index) => {
                    console.log(item);
                    if (item.video) {
                      return (
                        <VideoDetails item={item.video} key={item.video.id} />
                      );
                    }
                  })}
                </div>

                {this.state.myFavorite.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/my-favorites">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.myFavorite.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        View your saved favorites here. Click on Discover Now to
                        find and save your favorites.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* <section className="email-sec">
              <div className="py-5 h-auto bg-white">
                <div className="container">
                  <div className="mail">
                    <div>
                      <h3 className="wow fadeInUp flex-1 mb-1"><span className='quote-writer-text black-text mr-2 tilt'>Surpise </span><span style={{ color: '#5c1c72' }}>me</span></h3>
                      <p className='revamp-para'>See what the moment holds for you.</p>
                    </div>
                    <div className="app-box">
                      <div className='text-right'>
                        <a onClick={this.surpriseMe} data-toggle="modal" data-target="#surpriseme" className='btn btn-sm'>Surpise me</a>
                      </div>
                    </div>
                  </div>
                  <div class="modal fade" id="surpriseme" tabindex="-1" role="dialog" aria-labelledby="testimonial2Title" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <iframe className="ifmplayer" src={this.state.surprisemeVideo.video_url} frameborder="0" width="100%" height="400"></iframe>
                          <h5 class="my-3" >{this.state.surprisemeVideo.title}</h5>
                          <div className='surprise-indendation' dangerouslySetInnerHTML={{ __html: this.state.surprisemeVideo.description }} />
                          <a className='btn btn-sm mt-2' href={'/user/video-details/' + this.state.surprisemeVideo.id}><span>Go to video page</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
            <SurpiseMe />
            <div
              class="modal fade"
              id="surpriseme"
              tabindex="-1"
              role="dialog"
              aria-labelledby="testimonial2Title"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <iframe
                      className="ifmplayer"
                      src={this.state.surprisemeVideo.video_url}
                      frameborder="0"
                      width="100%"
                      height="400"
                    ></iframe>
                    <h5 class="my-3">{this.state.surprisemeVideo.title}</h5>
                    <div
                      className="surprise-indendation"
                      dangerouslySetInnerHTML={{
                        __html: this.state.surprisemeVideo.description,
                      }}
                    />
                    <a
                      className="btn btn-sm mt-2"
                      href={
                        "/user/video-details/" + this.state.surprisemeVideo.id
                      }
                    >
                      <span>Go to video page</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="class-block mb-0">
                <h4 className="revamp-subtitle">My Courses</h4>
                <div className="row">
                  {this.state.myCourses.map((item, index) => {
                    return (
                      <CourseOverView
                        item={item}
                        key={item.id}
                        isPurchased="1"
                      />
                    );
                  })}
                </div>
                {this.state.myCourses.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/my-courses">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.myCourses.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/my-courses">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="container">
              <div className="class-block">
                <h4 className="revamp-subtitle">My Recently Watched</h4>
                <div className="row">
                  {this.state.recentlyWatched.map((item, index) => {
                    return (
                      <VideoDetails item={item.video} key={item.video.id} />
                    );
                  })}
                </div>

                {this.state.recentlyWatched.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/recent">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.recentlyWatched.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="class-block">
                <h4 className="revamp-subtitle">My Recommendations</h4>
                <div className="row">
                  {this.state.recommended.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.recommended.length > 3 ? (
                  <div className="text-right">
                    <Link href="/user/recommended">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.recommended.length == 0 ? (
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* <div className='class-block mb-0'>
                <h4>Newly Added Videos</h4>
                <div className='row'>
                  {this.state.newlyAdded.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.newlyAdded.length > 3 ? (
                  <div className='text-right'>
                    <Link href='/user/new-videos'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.newlyAdded.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                        <Link href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div> */}

              {/* <div className='class-block mb-0'>
                <h4>Other Featured Course Available</h4>
                <div className='row'>
                  {this.state.availableCourse.map((item, index) => {
                    return (
                      <CourseOverView
                        item={item}
                        key={item.id}
                        isPurchased='0'
                      />
                    );
                  })}
                </div>
                <div className='text-right'>
                  <Link href='/user/my-courses'>
                    <a className='btn btn-sm'> View All</a>
                  </Link>
                </div>
              </div> */}
            </div>
          </section>
          <section className="sec sec-mobile pb-0">
            <div className="class-block">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Classes</h4>
                {this.state.myClasses.length > 1 ? (
                  <Link href="/user/my-classes">
                    <a className="btn btn-sm">View All</a>
                  </Link>
                ) : null}
              </div>
              {this.state.myClasses.length == 0 ? (
                <div className="container">
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        Tap the My Classes button and you’ll see your Classes
                        videos here.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center mt-3">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id="carousel-example-2"
                  className="carousel videoCarousel slide carousel-fade container"
                  data-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    {this.state.myClasses.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item.video}
                          index={index}
                          key={item.video.id}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="class-block mt-0">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Series</h4>
                {this.state.seriesdata.length > 3 ? (
                  <Link href="/user/recent">
                    <a className="btn btn-sm">View All</a>
                  </Link>
                ) : null}
              </div>
              <div className="row">
                {this.state.myFavoriteSeries.map((item, index) => {
                  if (index < 1)
                    return (
                      <div className="container">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 ">
                          <FavSeries data={item.series} />
                        </div>
                      </div>
                    );
                })}
              </div>
              {this.state.seriesdata.length == 0 ? (
                <div className="card-panel valign-wrapper grey lighten-4">
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                      Tap the My Series button and you’ll see your series here.
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                      <Link href="/user/search">
                        <a className="btn btn-sm">Discover Now</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="class-block">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Favorites</h4>
                {this.state.myFavorite.length > 1 ? (
                  <Link href="/user/my-favorites">
                    <a className="btn btn-sm"> View All</a>
                  </Link>
                ) : null}
              </div>
              {this.state.myFavorite.length == 0 ? (
                <div className="container">
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        Tap the Favorites button and you’ll see your Favorites
                        videos here.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-3 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id="carousel-example-2"
                  className="carousel videoCarousel slide carousel-fade container"
                  data-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    {this.state.myFavorite.map((item, index) => {
                      if (item.video) {
                        return (
                          <VideoDetailsMobile
                            index={index}
                            item={item.video}
                            key={item.video.id}
                          />
                        );
                      }
                    })}
                    {/* </OwlCarousel> */}
                  </div>
                </div>
              )}
            </div>
            <section className="email-sec mb-40">
              <div className="py-5 h-auto bg-white">
                <div className="container">
                  <div className="mail">
                    <div>
                      <h3 className="wow fadeInUp flex-1 mb-1">
                        <span className="quote-writer-text black-text mr-2 tilt">
                          Surpise{" "}
                        </span>
                        <span style={{ color: "#5c1c72" }}>me</span>
                      </h3>
                      <p className="revamp-para">
                        See what the moment holds for you.
                      </p>
                    </div>
                    <div className="app-box">
                      <div className="text-right">
                        <a
                          onClick={this.surpriseMe}
                          data-toggle="modal"
                          data-target="#surprisememob"
                          className="btn btn-sm"
                        >
                          Surpise me
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="surprisememob"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="testimonial2Title"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-lg modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-body">
                          <iframe
                            className="ifmplayer"
                            src={this.state.surprisemeVideo.video_url}
                            frameborder="0"
                          ></iframe>
                          <h5 class="my-3">
                            {this.state.surprisemeVideo.title}
                          </h5>
                          <div
                            className="surprise-indendation"
                            dangerouslySetInnerHTML={{
                              __html: this.state.surprisemeVideo.description,
                            }}
                          />
                          <a
                            className="btn btn-sm mt-2"
                            href={
                              "/user/video-details/" +
                              this.state.surprisemeVideo.id
                            }
                          >
                            <span>Go to video page</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <SurpiseMe /> */}
            <div className="class-block">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Courses</h4>
                {this.state.myCourses.length > 1 ? (
                  <div className="text-right">
                    <Link href="/user/my-courses">
                      <a className="btn btn-sm">View All</a>
                    </Link>
                  </div>
                ) : null}
              </div>
              {this.state.myCourses.length == 0 ? (
                <div className="container">
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center">
                        <Link href="/user/my-courses">
                          <a className="btn btn-sm"> Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id="carousel-example-2"
                  className="carousel videoCarousel slide carousel-fade container"
                  data-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    {this.state.myCourses.map((item, index) => {
                      return (
                        <CourseOverViewMobile
                          index={index}
                          item={item}
                          key={item.id}
                          isPurchased="1"
                        />
                      );
                    })}
                    {/* </OwlCarousel> */}
                  </div>
                </div>
              )}
            </div>
            <div className="class-block">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Recently Watched</h4>
                {this.state.recentlyWatched.length > 1 ? (
                  <Link href="/user/recent">
                    <a className="btn btn-sm">View All</a>
                  </Link>
                ) : null}
              </div>
              {this.state.recentlyWatched.length == 0 ? (
                <div className="container">
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-3 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id="carousel-example-2"
                  className="carousel videoCarousel slide carousel-fade container"
                  data-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    {this.state.recentlyWatched.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          index={index}
                          item={item.video}
                          key={item.video.id}
                        />
                      );
                    })}
                    {/* </OwlCarousel> */}
                  </div>
                </div>
              )}
            </div>

            <div className="class-block">
              <div className="container class-block-header">
                <h4 className="revamp-subtitle">My Recommendations</h4>
                {this.state.recommended.length > 1 ? (
                  <Link href="/user/recommended">
                    <a className="btn btn-sm"> View All</a>
                  </Link>
                ) : null}
              </div>
              {this.state.recommended.length == 0 ? (
                <div className="container">
                  <div className="card-panel valign-wrapper grey lighten-4">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center">
                        No data found in this category.
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-3 text-center">
                        <Link href="/user/search">
                          <a className="btn btn-sm">Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id="carousel-example-2"
                  className="carousel videoCarousel slide carousel-fade container"
                  data-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    {this.state.recommended.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className=" sec-members text-center">
            <div className="quote-container">
              <div className="quote-box">
                <div className="quote-text-box">
                  <p className="quote-text">
                    <img className="pr-10" src="/images/quote-left.svg" />
                    Any practice is ultimately <br />
                    only as good as the practitioner
                    <img className="pl-10" src="/images/quote-right.svg" />
                  </p>
                </div>
                <div className="quote-writer">
                  <h5 className="quote-writer-text">-Anand Mehrotra</h5>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}
