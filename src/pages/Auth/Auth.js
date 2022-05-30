import './auth.css';

import { useState } from "react";
import Navbar from '../../components/Navbar/Navbar';

const Auth = () => {


  const [showSignup, setShowSignup] = useState(true);

  const toggleHandler = () => {


    setShowSignup(!showSignup);

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
                  <input type="text" className="form-control" placeholder="User Name" autoFocus autoComplete="off " />
                </div>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Password" autoComplete="off " />
                </div>
                {showSignup && <div className="input-group">
                  <input type="text" className="form-control" placeholder="Email" autoComplete="off " />
                </div>}
                <div className="input-group">
                  <input type="submit" className="form-control btn btn-primary" value={showSignup ? 'Sign Up' : 'Login'} />
                </div>

                <div className="auth-msg" onClick={toggleHandler}>
                  {showSignup ? 'Already have an Account? Login' : "Don't have an Account? Sign up"}
                </div>
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