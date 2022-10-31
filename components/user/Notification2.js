import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiRoute } from '../../utils/helpers';

const Notification = (user) => {
const[preference,setPreference]=useState({
    cardExpiration:'',
    subscriptionRenewal:'',
    t_live:'',
    s_live:'',
    newVideo:'',
    t_approval:'',
    live_calendar:'',
    hariOm:'',
    s_cancel:'',
});

const {cardExpiration,subscriptionRenewal,t_live,s_live,newVideo,t_approval,live_calendar,hariOm,s_cancel}=preference;
const[isChecked,setIsChecked]=useState(true);
const[data,setData]=useState([]);
const pref =[] ;

const[show,setShow]= useState(false);
const[alertMsg,setAlertMsg] = useState();
  

useEffect(()=>{


 axios.get(apiRoute('get-pref/'+user.id))
  .then((response) =>{
    // handle success
    console.log(response.data);
  })
  .catch((error) =>{
    // handle error
    console.log(error);
  });



    
});
  const sendPreference = (e) => {
        e.preventDefault();
        // console.log(user.id);

       
        axios.post(apiRoute('cutomize-notification/'+user.id), {
            data: pref,
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
        console.log(pref);



    }
    const handleChange=(e)=>{
        console.log(e.target.checked);
        if(e.target.checked)
        {
        // setPreference({...preference,[e.target.name]:e.target.value});
        // setData(e.target.value);

        pref.push(e.target.value);

        }
        else{
            // setPreference({...preference,[e.target.name]:""});
            const index = pref.indexOf(e.target.value);
            if (index > -1) {
            pref.splice(index, 1);
            }


        }

    }

    return (
        <div>
            {show  && (
                    <div className='alert alert-success' role='alert'>
                      {alertMsg}
                    </div>
                  )}
            <form onSubmit={sendPreference}>
            <div className="row mb-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input  onChange={handleChange} value="1"  type="checkbox"  className="form-check-input" name="cardExpiration" id="cardExpiration"/>
                <label className="form-check-label" for="cardExpiration">Your Credit Card is Getting Expired .</label>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value= "2" type="checkbox" className="form-check-input" name="subscriptionRenewal" id="subscriptionRenewal"/>
                <label className="form-check-label" for="subscriptionRenewal">Your Subscription is renewed .</label>
            </div>
            </div> <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value= "3"  type="checkbox" className="form-check-input" name="t_live" id="t_live"/>
                <label className="form-check-label" for="t_live">Today's live streaming</label>
            </div>
            </div>
            </div>

            <div className="row mb-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="4"  type="checkbox" className="form-check-input" name="s_live" id="s_live"/>
                <label className="form-check-label" for="s_live">Saraswati is live</label>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="5" type="checkbox" className="form-check-input" name="newVideo" id="newVideo"/>
                <label className="form-check-label" for="newVideo">New Video Notification</label>
            </div>
            </div> <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="6"  type="checkbox" className="form-check-input" name="t_approval" id="t_approval"/>
                <label className="form-check-label" for="t_approval">Teacher Approval Notification</label>
            </div>
            </div>
            </div>

            <div className="row mb-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="7"  type="checkbox" className="form-check-input" name="live_calendar" id="live_calendar"/>
                <label className="form-check-label" for="live_calendar">Notification for Live update</label>
            </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="8"  type="checkbox" className="form-check-input" name="hariOm" id="hariOm"/>
                <label className="form-check-label" for="hariOm">Hariom Notification</label>
            </div>
            </div> 
            <div className="col-lg-4 col-md-6 col-sm-6">
            <div class="form-check">
                <input onChange={handleChange} value="9"  type="checkbox" className="form-check-input" name="s_cancel" id="s_cancel"/>
                <label className="form-check-label" for="s_cancel">Subscription Cancel Notification</label>
            </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 text-right mt-5">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
            </div>
            </form>
        </div>
    )
}

export default Notification
