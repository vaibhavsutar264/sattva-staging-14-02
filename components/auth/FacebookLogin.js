import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../../utils/helpers';
import { setLocalStorageAuth } from '../../utils/helpers';
import { useRouter } from 'next/router'

// import Providers from `next-auth/providers`

class FbLogin extends Component {
   constructor(props){
       super(props);
    this.state= {
        email :'',
        isloggedin : false,
        isloading:false,
   } 
    };
    responseFacebook = async (response) => {
        console.log(response);   
        if(response.accessToken!=null){
            this.setState({isloading:true});
             const res = await  axios.post(apiRoute('subscriber-fb-login') , {
                email: response.email
                })

                    this.setState({isloggedin:true});
                    this.setState({isloading:true});
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    
                    window.location.reload(false); 
                    // router.push('/user/me');
              
      }
      else{
        this.setState({isloggedin:false});

        localStorage.removeItem('auth');

      }
      
    }
   
    

    render() {
        console.log(this.state.isloggedin)

        return (
        
         <div className="mt-2">
                 <FacebookLogin
                    appId="802325610387242"
                    callback={this.responseFacebook}
                    fields="name,email,picture"
                     />
                        { this.state.isloading &&
                        <div className="preloader-background">
							<div className="big sattva_loader active">
                            <img src={Constants.SITE_URL + '/images/loader.png'} />
							</div>
						</div>
    }
            </div>
            
            
            
            
        );
    }
}

export default  FbLogin;