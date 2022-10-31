import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react'
import { apiRoute, getLocalStorageAuth } from '../../utils/helpers';

const Notification = (user) => {


  const [isChecked, setIsChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  })

  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState();
  const [boxes, setBoxes] = useState([
    { id: 13, title: 'Payments', isSelected: false },
    { id: 1, title: 'Credit Card Expired', isSelected: false },
    { id: 2, title: 'Your Subscription is renewed .', isSelected: false },
    { id: 9, title: 'Subscription Cancel Notification', isSelected: false },

    { id: 14, title: 'Live Streaming', isSelected: false },
    { id: 3, title: 'Todays live streaming', isSelected: false },
    { id: 4, title: 'Teacher is Live', isSelected: false },
    { id: 7, title: 'Notification for Live update', isSelected: false },

    { id: 15, title: 'Videos', isSelected: false },
    { id: 5, title: 'New Video Notification', isSelected: false },
    { id: 8, title: 'Hari Om / comment (on video YOU have liked)', isSelected: false },
    { id: 23, title: '', isSelected: false },

    { id: 17, title: 'Series', isSelected: false },
    { id: 10, title: 'New Series Notification', isSelected: false },
    { id: 18, title: 'New Videos added in Series', isSelected: false },
    { id: 19, title: '', isSelected: false },

    { id: 20, title: 'Courses', isSelected: false },
    { id: 11, title: 'New Course Notification', isSelected: false },
    { id: 21, title: 'New Course Purchase', isSelected: false },
    { id: 22, title: '', isSelected: false },

    { id: 16, title: 'Others', isSelected: false },
    { id: 6, title: 'Teacher Approval Notification', isSelected: false },
    { id: 12, title: '', isSelected: false },
  ]);

  const selectall =
    { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true }


  useEffect(() => {
    const getId = getLocalStorageAuth();
    if (!getId.userDetails) {
      const ForUrl = router.pathname
      router.push(`/login/?goto=${ForUrl}`);
      return 0;
    }

    let id = getId.userDetails.id;
    axios.get(apiRoute('get-pref/' + id))
      .then((response) => {

        setIsChecked(response.data);

      })
      .catch((error) => {
        // handle error
        setIsChecked(selectall);
      });
    console.log(isChecked);

  }, []);
  const sendPreference = (e) => {
    e.preventDefault();

    axios.post(apiRoute('cutomize-notification/' + user.id), {
      data: isChecked,
    })
      .then(function (response) {
        setShow(true);
        setAlertMsg(response.data.message);

        setTimeout(() => {
          setShow(false);

        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });



  }


  const handleChange = ({ target: { name, checked } }) => {
    var newState = { ...isChecked };
    newState[name] = checked;
    setIsChecked(newState);
  }
  const enablePush = () => {
    const getId = getLocalStorageAuth();
    let id = getId.userDetails.id;
    let id1 = id.toString();
    console.log(id1);
    //stagging
    // appId: "40192d8c-9efa-4b26-ae5f-ebf0de7602b9",

    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {

      OneSignal.init({
        appId: "530f8c19-d32a-48e7-8487-7dbf523f3a0a",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.showNativePrompt();

      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
          console.log("Push notifications are enabled!");
          OneSignal.setExternalUserId(id1);
        }
        else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });
  }

  return (
    <div>
      <div className="mt-3">
        <h3 className='revamp-blog-title'>Notifications<i className="fas fa-bell ml-2"></i></h3>
      </div>
      {/* <div className='tooltipster plantype tooltipstered'>
        Notification
      </div> */}
      {show && (
        <div className='alert alert-success' role='alert'>
          {alertMsg}
        </div>
      )}
      <form onSubmit={sendPreference}>
        <div className="mb-5 row formCheck checbox-position">

          {/* {boxes.map((box,index)=>
                
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="container  mt-5">
                    <br/>
                {
                box.id==13 || box.id==14 || box.id==15 || box.id==16 || box.id==17 || box.id == 20  ? 
                <h5>{box.title}</h5>
              :<></>
              }
                </div>
                { box.id==13 || box.id==14 || box.id==15 || box.id ==16 || box.id == 17 || box.id == 19 || box.id == 20 || box.id == 22 || box.id==23 || box.id ==12 ? <></>
                :
                  <div class="form-check">
                  <input key={box.id}  onChange={handleChange} value="1"  type="checkbox" checked={isChecked[box.id]}  className="form-check-input" name={box.id} id={box.id}/>
                  <label htmlFor={box.id} className="form-check-label">{box.title}</label>
                </div>
                }
                </div>
                )}
                 */}
          {/* <table className='table table-striped profile-table detail-table border-0'>
            <tbody>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Membership</h5>
                        <input key="1" onChange={handleChange} value="1" type="checkbox" checked={isChecked[1]} className="form-check-input" name="1" id="1" />
                        <label htmlFor="1" className="form-check-label">Alerts about your card expiration and membership renewal or cancellation.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Live Studio</h5>
                        <input key="2" onChange={handleChange} value="2" type="checkbox" checked={isChecked[2]} className="form-check-input" name="2" id="2" />
                        <label htmlFor="2" className="form-check-label">Be alerted about upcoming and ongoing Live Classes.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Courses</h5>
                        <input key="3" onChange={handleChange} value="3" type="checkbox" checked={isChecked[3]} className="form-check-input" name="3" id="3" />
                        <label htmlFor="3" className="form-check-label">Purchase a course or be alerted about new course offerings.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Series</h5>
                        <input key="4" onChange={handleChange} value="4" type="checkbox" checked={isChecked[4]} className="form-check-input" name="4" id="4" />
                        <label htmlFor="4" className="form-check-label">Be alerted about new and updated series.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Videos</h5>
                        <input key="5" onChange={handleChange} value="5" type="checkbox" checked={isChecked[5]} className="form-check-input" name="5" id="5" />
                        <label htmlFor="5" className="form-check-label">Be updated about new videos.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-0'>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container ">
                      <br />
                      <div class="form-check">
                        <h5 className='revamp-para'>Hari om</h5>
                        <input key="6" onChange={handleChange} value="6" type="checkbox" checked={isChecked[6]} className="form-check-input" name="6" id="6" />
                        <label htmlFor="6" className="form-check-label">Be updated about your Hari Om posts.</label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> */}
          <div className=" col-lg-6 col-md-6 col-sm-6">
            <div className="container  ">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Membership</h5>
                <input key="1" onChange={handleChange} value="1" type="checkbox" checked={isChecked[1]} className="form-check-input" name="1" id="1" />
                <label htmlFor="1" className="form-check-label">Alerts about your card expiration and membership renewal or cancellation.</label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="container  ">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Live Studio</h5>
                <input key="2" onChange={handleChange} value="2" type="checkbox" checked={isChecked[2]} className="form-check-input" name="2" id="2" />
                <label htmlFor="2" className="form-check-label">Be alerted about upcoming and ongoing Live Classes.</label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="container  mt-4">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Courses</h5>
                <input key="3" onChange={handleChange} value="3" type="checkbox" checked={isChecked[3]} className="form-check-input" name="3" id="3" />
                <label htmlFor="3" className="form-check-label">Purchase a course or be alerted about new course offerings.</label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="container  mt-4">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Series</h5>
                <input key="4" onChange={handleChange} value="4" type="checkbox" checked={isChecked[4]} className="form-check-input" name="4" id="4" />
                <label htmlFor="4" className="form-check-label">Be alerted about new and updated series.</label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="container  mt-4">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Videos</h5>
                <input key="5" onChange={handleChange} value="5" type="checkbox" checked={isChecked[5]} className="form-check-input" name="5" id="5" />
                <label htmlFor="5" className="form-check-label">Be updated about new videos.</label>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="container  mt-4">
              <br />
              <div class="form-check">
                <h5 className='revamp-para'>Hari om</h5>
                <input key="6" onChange={handleChange} value="6" type="checkbox" checked={isChecked[6]} className="form-check-input" name="6" id="6" />
                <label htmlFor="6" className="form-check-label">Be updated about your Hari Om posts.</label>
              </div>
            </div>
          </div>


          <div className="col-lg-12 col-md-12 col-sm-12 mt-5 text-right">
            <button type="submit" className="btn">Save</button>
          </div>
        </div>
      </form>
      {/* <div className='profile-inputs mt-5'>
                <div className=''>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <button onClick={enablePush} className='btn mr-3'>
                        Allow Push Notification for Sattva Connect
                      </button>
                    </div>
                    <div className='col-sm-6'>
                    <button type="button" class="btn btn-danger mr-3" data-toggle="modal" data-target="#exampleModal">
                    Disable Push Notification for Sattva Connect
                    </button>
                    </div>
                  </div>
                </div>
              </div> */}
      {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Steps to Disable Push Notification</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <p>1. On your computer, open Chrome.</p>
      <p>2. At the top right, click More  and then Settings.</p>
      <p>3. Under "Privacy and security," click Site settings.</p>
      <p>4. Click Notifications.</p>
      <p>5. Choose to block or allow notifications</p>
      </div>
    </div>
  </div>
</div> */}
    </div>
  )
}

export default Notification
