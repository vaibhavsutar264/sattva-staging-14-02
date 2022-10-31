import React, { Component,useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../../utils/helpers';
import { setLocalStorageAuth } from '../../utils/helpers';
import { useRouter } from 'next/router'
import Constants from '../../constants/index';

const FbLog = () => {
    const [email,setEmail]= useState(0);
    const [isloggedin,setIsloggedin]= useState(false);
    const [isloading,setIsloading]= useState(false);
    const[error,setError] = useState(false);
    const[errorMessage,setErrorMessage]=useState() ;

    const router = useRouter();

  const responseFacebook = async (response) => {
        console.log(response);   
        if(response.accessToken!=null)
        {
            setIsloading(true);

            try{
             const res = await  axios.post(apiRoute('subscriber-fb-login') , {
                email: response.email
                })
                console.log(res.status);
                    setIsloggedin(true);
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    router.push('/user/me');
              } catch(error){
                setIsloading(false);
                setErrorMessage(error.response)
                setError(true);
                setTimeout(() => {
                  router.push('/plans');
                }, 3000);
              }
        }
            else
            {
              setIsloggedin(false)
              localStorage.removeItem('auth');
              
            }
      
    }

    return (
        <div className="mt-2">
          {error && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
        <FacebookLogin
           appId={Constants.FB_DEVELOPMENT_APP_ID}
           callback={responseFacebook}
           fields="name,email,picture"
            />
               { isloading &&
               <div className="preloader-background">
                   <div className="big sattva_loader active">
                   <img src={Constants.SITE_URL + '/images/loader.png'} />
                   </div>
               </div>
}
   </div>
    );
};

export default FbLog;