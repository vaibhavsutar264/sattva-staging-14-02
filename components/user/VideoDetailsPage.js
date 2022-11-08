import React, { Component } from "react";
import Router from "next/router";
import axios from "axios";
import Layout from "../../components/user/Layout";
import {
  apiRoute,
  getApiHeader,
  getUserId,
  userProfilePath,
  getLocalStorageAuth,
} from "../../utils/helpers";
import ReactTooltip from "react-tooltip";
import Vimeo from "@u-wave/react-vimeo";
import SimpleReactValidator from "simple-react-validator";
import Moment from "react-moment";
import router from "next/router";
import debounce from "lodash.debounce";
import moment from "moment";

class VideoDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.hariomModal = React.createRef();
    this.hariomValidation = new SimpleReactValidator();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      video: {},
      videoId: this.props.videoId,
      userId: "",
      hariom: [],
      comments: [],
      showModal: false,
      hariomMessage: "",
      classStatus: false,
      favoriteStatus: false,
      markDone: false,
      alert: false,
      alertType: "",
      alertMsg: "",
      showHariomForm: false,
      showToolTip: false,
      showTextArea: false,
      showCommentArea: false,
      showHariomBtn: true,
      access: true,
      allowToHariom: false,
      hariomTime: 60,
      subscriptionStatus: true,
      loading: true,
      isToggleOn: false,
      noteComment: "",
      NoteCommentData: [],
      isButtonDisabled: false,
      hasComment: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onNoteFormSubmit = this.onNoteFormSubmit.bind(this);
    this.onNotedisplayComment = this.onNotedisplayComment.bind(this);
  }

  onNotedisplayComment() {
    const userId = getUserId(this.props.history);
    const requestOptions = {
      headers: getApiHeader(true),
    };
    axios
      .get(
        apiRoute(`show-notes/${userId}/${this.props.videoId}`),
        requestOptions
      )
      .then((res) => {
        this.setState({ NoteCommentData: res.data });
        var arrlength = res.data;
        if (arrlength.length > 0) {
          this.setState({ hasComment: true });
        } else {
          this.setState({ hasComment: false });
        }
        console.log(arrlength.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const userId = getUserId(this.props.history);
    this.setState({ userId: userId });
    const auth = getLocalStorageAuth();
    this.onNotedisplayComment();
    console.log("userId: " + userId);
    console.log(auth);

    if (auth) {
      const userDetails = auth.userDetails;
      const requestOptions = {
        headers: getApiHeader(true),
      };
      if (userDetails.user_type === 0) {
        axios
          .get(
            apiRoute(
              "user-dashboard/check-subscriber-status/" +
                userDetails.transaction_id
            ),
            requestOptions
          )
          .then((res) => {
            if (res.data) {
              console.log("res");
              console.log(res);
              if (res.data.status === false) {
                this.setState({ subscriptionStatus: false });
              } else {
                this.setState({ subscriptionStatus: true });
              }
            }
          })
          .catch((error) => {
            this.setState({ subscriptionStatus: false });
          });
      }

      //get video details
      axios
        .get(
          apiRoute(
            "user-dashboard/get-video-details/" +
              this.state.videoId +
              "/" +
              userId
          ),
          requestOptions
        )
        .then((res) => {
          console.log("nadeem");
          console.log(res.data);
          this.setState({
            video: res.data.videoDetails,
            favoriteStatus: res.data.favoriteStatus,
            markDone: res.data.markDone,
            classStatus: res.data.myClassStatus,
            access: res.data.access,
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      //get video all harioms
      axios
        .get(
          apiRoute("user-dashboard/get-video-hariom/" + this.state.videoId),
          requestOptions
        )
        .then((res) => {
          this.setState({ hariom: res.data });
          if (res.data.length > 0) {
            let comments = res.data.filter(function (e) {
              return e.comment !== null;
            });
            this.setState({ comments: comments });
            const hariomStatus = res.data.some((el) => el.user_id == userId);
            if (hariomStatus) {
              this.setState({ showHariomBtn: false });
            }
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      // add video to recent watched
      var details = {
        user_id: userId,
        video_id: this.state.videoId,
      };
      axios.post(
        apiRoute("user-dashboard/add-recent-watched"),
        details,
        requestOptions
      );
    }
  }

  getVideoTime = (time) => {
    var d = Number(time);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    // var time = h + ':' + m + ':' + s;
    var time = h === "00" ? m + " minutes" : "";
    return time;
  };
  changeFavoriteStatus = (e) => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
      type: 0,
    };
    if (!this.state.favoriteStatus) {
      axios
        .post(
          apiRoute("user-dashboard/add-user-favorite"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ favoriteStatus: true, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
            loading: false,
          });
        });
    } else {
      axios
        .post(
          apiRoute("user-dashboard/remove-user-favorite"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ favoriteStatus: false, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
          });
        });
    }
  };

  changeMarkDone = () => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
      type: 0,
    };
    if (!this.state.markDone) {
      axios
        .post(
          apiRoute("user-dashboard/add-user-video-mark-done"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ markDone: true, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
            loading: false,
          });
        });
    } else {
      axios
        .post(
          apiRoute("user-dashboard/remove-user-video-mark-done"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ markDone: false, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
          });
        });
    }
  };

  changeClasesStatus = (e) => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
    };
    if (!this.state.classStatus) {
      axios
        .post(
          apiRoute("user-dashboard/add-user-classes"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ classStatus: true, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
          });
        });
    } else {
      axios
        .post(
          apiRoute("user-dashboard/remove-user-classes"),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ classStatus: false, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: "error",
            alertMsg: "Something went wrong please try again.",
          });
        });
    }
  };
  changeMarkDone = () => {
    this.setState({ markDone: !this.state.markDone });
  };
  toggleToolTip = (status) => {
    this.setState({ showToolTip: status });
  };

  toggleTextArea = () => {
    this.setState({ showTextArea: !this.state.showTextArea });
  };

  toggleComment = () => {
    this.setState({ showCommentArea: !this.state.showCommentArea });
  };
  onChange = (e) => {
    this.setState({ hariomMessage: e.target.value });
  };
  handleSubmitHariom = (e) => {
    e.preventDefault();
    if (!this.hariomValidation.allValid()) {
      this.hariomValidation.showMessages();
      this.forceUpdate();
      return false;
    }
    this.hariomModal.current.click();
    this.setState({ showModal: false });
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
      comment: this.state.hariomMessage,
    };
    axios
      .post(
        apiRoute("user-dashboard/add-video-hariom"),
        details,
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        this.setState({
          loading: false,
          alert: true,
          alertType: "success",
          alertMsg: res.data.message,
          showHariomBtn: false,
        });
        axios
          .get(
            apiRoute("user-dashboard/get-video-hariom/" + this.state.videoId),
            requestOptions
          )
          .then((res) => {
            this.setState({ hariom: res.data, loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
          });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          loading: false,
          error: true,
          alertType: "error",
          alertMsg: "Something went wrong please try again.",
        });
      });
  };

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  handleChange(event) {
    this.setState({ noteComment: event.target.value });
  }

  onNoteFormSubmit(e) {
    e.preventDefault();
    this.setState({
      isButtonDisabled: true,
    });
    setTimeout(() => this.setState({ isButtonDisabled: false }), 3000);

    if (this.state.noteComment) {
      const requestOptions = {
        headers: getApiHeader(true),
      };
      var details = {
        user_id: this.state.userId,
        video_id: this.state.videoId,
        comments: this.state.noteComment,
      };
      console.log(details);
      axios
        .post(apiRoute("store-notes"), details, requestOptions)
        .then((res) => {
          this.setState({ noteComment: "" });
          this.onNotedisplayComment();
        })
        .catch((err) => console.log(err));
    }
  }

  onDeleteNote = (noteId) => {
    const userId = getUserId(this.props.history);
    const requestOptions = {
      headers: getApiHeader(true),
    };
    axios
      .get(apiRoute(`delete-notes/${noteId}`), requestOptions)
      .then((res) => {
        this.onNotedisplayComment();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  currentTime = (e) => {
    const seconds = Math.trunc(e.seconds);
    this.setState({ hariomTime: 60 - seconds });
    if (seconds > 60) {
      this.setState({ allowToHariom: true });
    }
  };

  render() {
    const { alert, alertType, alertMsg } = this.state;
    if (this.state.isToggleOn) {
      var activeclass = "active";
    } else {
      var activeclass = "";
    }

    return (
      <>
        <Layout loading={this.state.loading}>
          <main className="admin-content light-purplebg">
            <section className="sec">
              <div className="container">
                <div className="card card-view">
                  <div className="card-content p-3">
                    <div className="media-header">
                      <div>
                        {alert && alertType === "error" && (
                          <div
                            className="alert alert-danger col-sm-6"
                            role="alert"
                          >
                            {alertMsg}
                          </div>
                        )}
                        {alert && alertType === "success" && (
                          <div
                            className="alert alert-success col-sm-6"
                            role="alert"
                          >
                            {alertMsg}
                          </div>
                        )}
                        <h4 className="revamp-videotitle mb-0">
                          {this.state.video.title}{" "}
                        </h4>
                        <div className="meta_info mt-0 mb-1">
                          <span class="teacher">
                            Teacher:{" "}
                            <span className="revamp-signature">
                              {this.state.video.teacherName}
                            </span>
                          </span>
                          <span className="duration">
                            {" "}
                            Duration:
                            <span className="revamp-signature">
                              {this.getVideoTime(this.state.video.duration)}
                            </span>
                          </span>
                          <span
                            style={{ marginLeft: "20px", color: "#afafaf" }}
                          >
                            Views:{" "}
                            <span
                              style={{ color: "#121212", fontSize: "16px" }}
                            >
                              8.4k
                            </span>
                          </span>
                        </div>
                      </div>
                      <>
                        <div className="media-btns  media-flex text-right my-4">
                          <a
                            title={
                              this.state.classStatus === false
                                ? "Add to My Classes"
                                : "Remove from My Classes"
                            }
                            className={
                              this.state.classStatus === false
                                ? "btn btn-sm mr-3 "
                                : "btn btn-sm mr-3 alt-btn"
                            }
                            onClick={this.changeClasesStatus}
                          >
                            {this.state.classStatus === false ? (
                              <>
                                <i className="fas fa-plus" />
                                {/* <>Add to my classes</> */}
                              </>
                            ) : (
                              <>
                                <i class="fas fa-minus" />
                                {/* <> Remove from my classes</> */}
                              </>
                            )}
                          </a>
                          <a
                            title={
                              this.state.favoriteStatus === false
                                ? "Add to My Favorites"
                                : "Remove from My Favorites"
                            }
                            className={
                              this.state.favoriteStatus === false
                                ? "btn btn-sm mr-3 favorited"
                                : "btn btn-sm mr-3 alt-btn"
                            }
                            onClick={this.changeFavoriteStatus}
                          >
                            {this.state.favoriteStatus === false ? (
                              <>
                                <i className="far fa-heart" />
                                {/* <> Add to Favorite</> */}
                              </>
                            ) : (
                              <>
                                <i class="fas fa-heart" aria-hidden="true"></i>
                                {/* <> Remove from Favorite</> */}
                              </>
                            )}
                          </a>
                          <a
                            title={
                              this.state.markDone === false
                                ? "Mark as completed"
                                : "Removed Marked done"
                            }
                            className={
                              this.state.markDone === false
                                ? "btn btn-sm mr-3 favorited"
                                : "btn btn-sm mr-3 alt-btn"
                            }
                            onClick={this.changeMarkDone}
                          >
                            {this.state.markDone === false ? (
                              <>
                                <i className="fas fa-check" />
                                {/* <> Add to Favorite</> */}
                              </>
                            ) : (
                              <>
                                <i class="fas fa-check" aria-hidden="true"></i>
                                {/* <> Remove from Favorite</> */}
                              </>
                            )}
                          </a>
                          {/* <a title="Notes" onClick={this.handleClick}
                          class={
                            this.state.hasComment === true
                              ? 'btn btn-sm'
                              : 'btn btn-sm btn-notes waves-effect waves-light'
                          }><i class="fas fa-pen"></i> Notes</a> */}
                        </div>
                      </>
                    </div>
                    <div className="media-content">
                      <div>
                        {this.state.video.video_url && (
                          <Vimeo
                            video={this.state.video.video_url}
                            onTimeUpdate={this.currentTime}
                            height={480}
                          />
                        )}
                        {/* <iframe   allowfullscreen="true" src={this.state.video.video_url} frameBorder={0} width="100%" height={480} /> */}
                      </div>{" "}
                      {/* <div className='media-btns text-right my-4'>
                        <a
                          title={
                            this.state.classStatus === false
                              ? 'Add to my classes'
                              : 'Remove from my classes'
                          }
                          className={
                            this.state.classStatus === false
                              ? 'btn btn-sm mr-3 alt-btn'
                              : 'btn btn-sm mr-3 alt-btn'
                          }
                          onClick={this.changeClasesStatus}
                        >
                          {this.state.classStatus === false ? (
                            <>
                              <i className='fas fa-check' />
                              <> Add to my classes</>
                            </>
                          ) : (
                            <>
                              <i class='fas fa-times' />
                              <> Remove from my classes</>
                            </>
                          )}
                        </a>
                        <a
                          title={
                            this.state.favoriteStatus === false
                              ? 'Add to Favorite'
                              : 'Remove fromFavorite'
                          }
                          className={
                            this.state.favoriteStatus === false
                              ? 'btn btn-sm mr-3 favorited'
                              : 'btn btn-sm mr-3'
                          }
                          onClick={this.changeFavoriteStatus}
                        >
                          {this.state.favoriteStatus === false ? (
                            <>
                              <i className='fas fa-heart' />
                              <> Add to Favorite</>
                            </>
                          ) : (
                            <>
                              <i class='fa fa-heart-o' aria-hidden='true'></i>
                              <> Remove from Favorite</>
                            </>
                          )}
                        </a>
                        <a title="Notes" onClick={this.handleClick}
                          class={
                            this.state.hasComment === true
                              ? 'btn btn-sm'
                              : 'btn btn-sm btn-notes waves-effect waves-light'
                          }><i class="fas fa-pen"></i> Notes</a>
                      </div> */}
                      <div className={"notes-content " + activeclass}>
                        <div className="chat-output" id="chat-output">
                          {this.state.NoteCommentData &&
                            this.state.NoteCommentData.map((data, index) => {
                              return (
                                <div className="bot-message">
                                  <div className="message msg_box">
                                    {data.comments}
                                    <a
                                      className="btn"
                                      onClick={() => this.onDeleteNote(data.id)}
                                    >
                                      <i className="fas fa-times" />
                                    </a>
                                  </div>
                                  <div className="date">
                                    <Moment format="DD MMM YYYY HH:mm">
                                      {data.created_at}
                                    </Moment>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="chat-input">
                          <form
                            id="user-input-form"
                            onSubmit={this.onNoteFormSubmit}
                          >
                            <input
                              type="text"
                              name="user-input"
                              id="user-input"
                              value={this.state.noteComment}
                              onChange={this.handleChange}
                              className="user-input"
                              placeholder="Type your notes here"
                            />
                            <button
                              type="submit"
                              style={{
                                opacity: "0",
                                display: "none",
                              }}
                              disabled={this.state.isButtonDisabled}
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                        <a
                          href="javascript:void(0)"
                          className="btn close-notes"
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-times" />
                        </a>
                      </div>
                      <p
                        className="revamp-para-small mt-4"
                        dangerouslySetInnerHTML={{
                          __html: this.state.video.description,
                        }}
                      ></p>
                      <a
                        title="Notes"
                        style={{ textTransform: "capitalize" }}
                        onClick={this.handleClick}
                        class={
                          this.state.hasComment === true
                            ? "btn btn-sm"
                            : "btn btn-sm btn-notes waves-effect waves-light"
                        }
                      >
                        <i class="fas fa-pen"></i> Add your Personal Notes
                      </a>
                      <div className="recent-cont  commnt-section">
                        <div
                          class="tooltip_templates"
                          style={{
                            position: "absolute",
                            bottom: "90px",
                            left: "-60px",
                          }}
                        >
                          {this.state.showToolTip && (
                            <div id="tooltip_content">
                              <div class="modal-content">
                                <div
                                  class="card-contentt"
                                  style={{ padding: "10px" }}
                                >
                                  <span class="card-titlet">Hari Om</span>
                                  <p class="hariom_main">
                                    If you would like to show gratitude and give
                                    thanks, use Hari Om.
                                  </p>
                                  {this.state.allowToHariom == false ? (
                                    <p class="hariom_foot">
                                      Watch{" "}
                                      <span class="cthari">
                                        {this.state.hariomTime === 60
                                          ? "1:00"
                                          : "00:" + this.state.hariomTime}
                                      </span>{" "}
                                      more minutes before you can use Hari Om.
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <h6 class="recent-head">Recent Hari OMs</h6>
                        <div className="recent-list">
                          {this.state.hariom.map((item, index) => {
                            return (
                              <div class="pop-img">
                                {item.comment !== null ? (
                                  <a
                                    data-html={true}
                                    data-for="custom-color-no-arrow"
                                    data-tip={
                                      "<h6>" +
                                      item.user?.first_name +
                                      " " +
                                      item.user?.last_name +
                                      "</h6><br/><hp>" +
                                      item.comment +
                                      "</hp>"
                                    }
                                  >
                                    <img
                                      src={userProfilePath(
                                        item.user?.profile_pic
                                      )}
                                    />
                                  </a>
                                ) : (
                                  <a
                                    data-html={true}
                                    data-for="custom-color-no-arrow"
                                    data-tip={
                                      "<h6>" +
                                      item.user?.first_name +
                                      " " +
                                      item.user?.last_name +
                                      "</h6>"
                                    }
                                  >
                                    <img
                                      src={userProfilePath(
                                        item.user?.profile_pic
                                      )}
                                    />
                                  </a>
                                )}

                                <ReactTooltip
                                  id="custom-color-no-arrow"
                                  className="react-tooltip videoTooltip"
                                  delayHide={1000}
                                  textColor="#000"
                                  backgroundColor="#ffff"
                                  effect="solid"
                                />
                              </div>
                            );
                          })}
                          {this.state.hariom && (
                            <button
                              data-toggle="modal"
                              data-target="#hariom"
                              type="button"
                              className="btn btn-sm pop"
                              data-tooltip-content="#tooltip_content"
                              id="tooltipsterhariom"
                              onMouseEnter={() => this.toggleToolTip(true)}
                              onMouseLeave={() => this.toggleToolTip(false)}
                            >
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "16px",
                                    marginRight: "6px",
                                  }}
                                >
                                  {this.state.hariom.length}
                                </span>{" "}
                                <img
                                  className="om-icon"
                                  src="../../images/folded.png"
                                />
                              </p>
                            </button>
                          )}
                        </div>
                      </div>
                      {this.state.comments.length > 0 ? (
                        <div className="showCommentDiv">
                          <p
                            class="text-purple showCommentText"
                            onClick={this.toggleComment}
                          >
                            Comments
                          </p>
                          {this.state.showCommentArea ? (
                            <p
                              class="text-purple showCommentIcon"
                              onClick={this.toggleComment}
                            >
                              <i
                                class="fa fa-arrow-circle-up"
                                aria-hidden="true"
                              ></i>
                            </p>
                          ) : (
                            <p
                              class="text-purple showCommentIcon"
                              onClick={this.toggleComment}
                            >
                              <i
                                class="fa fa-arrow-circle-down"
                                aria-hidden="true"
                              ></i>
                            </p>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.showCommentArea ? (
                        <>
                          {this.state.comments.map((item, index) => {
                            return (
                              <>
                                <div class=" recent-list recent-cmnts">
                                  <div class="cmnt-img-box">
                                    <div class=" pop-img">
                                      <img
                                        src={userProfilePath(
                                          item.user.profile_pic
                                        )}
                                      />
                                    </div>
                                    <div class="receiver-box">
                                      <h6>
                                        {item.user.first_name}{" "}
                                        {item.user.last_name}
                                      </h6>
                                      <hp>{item.comment}</hp>
                                    </div>
                                  </div>
                                  {item.reply ? (
                                    <div class="rec-cmnt-box">
                                      <div class="sender-box">
                                        {" "}
                                        <span>- Admin</span>
                                        {item.reply}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {this.state.allowToHariom == true ? (
              <div
                className="modal fade "
                id="hariom"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="upgradeTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-md modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <button
                      type="button"
                      class="close inner-close"
                      data-dismiss="modal"
                      ref={this.hariomModal}
                    >
                      &times;
                    </button>

                    <div className="modal-body">
                      <form onSubmit={this.handleSubmitHariom}>
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="mb-2 hariom-heading">Hari Om</h5>
                            <div className="row">
                              <div className="col-md-12">
                                <div id="mswitch" className="switch">
                                  <p className>
                                    Would you also like to say something?
                                  </p>
                                  <p>
                                    <input
                                      type="checkbox"
                                      id="test5"
                                      onClick={this.toggleTextArea}
                                    />
                                    <label for="test5">
                                      If Yes please check and continue
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {this.state.showTextArea && (
                            <div className="col-md-12 ">
                              <div className="">
                                <div className="input-field">
                                  <textarea
                                    onChange={this.onChange}
                                    cols={50}
                                    rows={5}
                                    name="form[Tell me more about]"
                                    id="Tell me more about"
                                    className="rsform-text-box"
                                    value={this.state.hariomMessage}
                                  />
                                  {this.hariomValidation.message(
                                    "message",
                                    this.state.hariomMessage,
                                    "max:150"
                                  )}
                                  <label
                                    style={{ left: "15px" }}
                                    htmlFor="address"
                                  >
                                    Say Something
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="col-md-12">
                            <button
                              type="submit"
                              id="sendHariOmd"
                              title="Send Hari om"
                              className="btnhariom btn btn-small"
                            >
                              Send <i className="material-icons right"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </Layout>
      </>
    );
  }
}

export default VideoDetailsPage;
