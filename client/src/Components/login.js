import React from 'react'
import './login.css'
import fb from './photos/fb.png'
import google from './photos/google.png'

function Login()
{
    return(
        <div>
            <div className="box-form">
                <div className="left">
                    <div className="overlay">
                        <h1>find your perfect match</h1>
                        <p>We are here to build emotion, connect people and create happy stories.</p>
                        <span>
                            <p>login with social media</p>
                            <button className="media">
                             <img src={fb}/>
                                sign up with Facebook   
                            </button>
                            <button className="media">
                             <img src={google}/>   
                            </button>
                            

                            {/* <img src={test} style={{width:'20px'}} />
                            <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a> */}
                        </span>
                    </div>
                </div>
                <div className="right">
                    <h5>Login</h5>
                    <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
                    <div className="inputs">
                        <input type="text" placeholder="user name" />
                        <br/>
                        <input type="password" placeholder="password" />
                    </div>
                    <br/><br/>
                
                    <div className="forget-password">
                        <p>forget password?</p>
                    </div>
                    <br />
                    <button className='login'>Login</button>
                </div>
            </div>
        </div>
    )
}
 export default Login;