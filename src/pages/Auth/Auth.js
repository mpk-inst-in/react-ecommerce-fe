import './auth.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';

import { signIn, signUp } from '../../api/auth';


const Auth = () => {


  const [showSignup, setShowSignup] = useState(false);

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signupSuccess, setSignupSuccess] = useState(false);

  const [authResponse, setAuthResponse] = useState('');

  const navigate = useNavigate()




  const toggleHandler = () => {


    clearState();
    setShowSignup(!showSignup);

  }

  const signInHandler = async () => {

    // capture username and password 
    // submit to the API server


    const user = { username, password };


    if (!username || !password) {

      setAuthResponse('User Name,  and Password  are required !!');
      setSignupSuccess(false);
      return;
    }


    try {

      const response = await signIn(user);
      console.log(response);

      navigate("/");

      // redirect the user to the landing page!!

    } catch (error) {

      console.log(error);
    }


  }


  const clearState = () => {

    setusername('');
    setPassword('');
    setEmail('');
    setShowSignup(false);
    setSignupSuccess(false);
    setAuthResponse('');

  }

  const signupHandler = async () => {


    const user = { username, password, email };


    if (!username || !password || !email) {

      setAuthResponse('User Name, Password and Email are required !!');
      setSignupSuccess(false);
      return;
    }

    try {

      const { data } = await signUp(user);
      console.log(data);

      clearState();

      setSignupSuccess(true);
      setAuthResponse(data.message);

    } catch (error) {

      console.log(error);
      setSignupSuccess(false);
      setAuthResponse(error.response.data.message);

    }


  }


  const renderComponent = () => {

    return (

      <>
        <Navbar />
        <div className="login">
          <div className="container">
            <div className="row">
              <h2 className="home-title">Weclome to InstaShop</h2>
              <div className="login-wrapper">
                <h4 className="text-center">{showSignup ? 'Sign Up' : 'Sign In'}</h4>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="User Name" autoFocus autoComplete="off " value={username} onChange={(e) => setusername(e.target.value)} />
                </div>
                <div className="input-group">
                  <input type="password" className="form-control" placeholder="Password" autoComplete="off " value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {showSignup && <div className="input-group">
                  <input type="text" className="form-control" placeholder="Email" autoComplete="off " value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>}
                <div className="input-group">
                  <input type="submit" className="form-control btn btn-primary" value={showSignup ? 'Sign Up' : 'Log In'}
                    onClick={showSignup ? signupHandler : signInHandler}

                  />
                </div>

                <div className="auth-msg" onClick={toggleHandler}>
                  {showSignup ? 'Already have an Account? Login' : "Don't have an Account? Sign up"}
                </div>

                {authResponse && <div className={signupSuccess ? "auth-response text-info text-center" : "auth-response text-danger text-center"}>
                  {authResponse}
                </div>

                }

              </div>
            </div>
          </div>

        </div>
      </>

    )
  }



  return (

    renderComponent()
  )



}

export default Auth