
import './App.css';
import test from './facebook.svg'

function App() {
  return (
    <div className="App">
      <div class="box-form">
        <div class="left">
          <div class="overlay">
            <h1>Hello World.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur et est sed felis aliquet sollicitudin</p>
            <span>
              <p>login with social media</p>
              <img src={test} style={{width:'20px'}} />
              <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i> Login with Twitter</a>
            </span>
          </div>
        </div>
        <div class="right">
          <h5>Login</h5>
          <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
          <div class="inputs">
            <input type="text" placeholder="user name" />
            <br/>
            <input type="password" placeholder="password" />
          </div>
          <br/><br/>
      
          <div class="forget-password">
            <p>forget password?</p>
          </div>
          <br />
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
