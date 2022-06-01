import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { signOut } from '../../api/auth';

import './navbar.css';


const Navbar = () => {


  const [user, setUser] = useState('Guest');

  useEffect(() => {

    const username = localStorage.getItem('username');
    username && setUser(username);

  }, [user])


  const logoutHandler = () => {

    console.log("Log out invoked ....");
    signOut();
    setUser('Guest');

  }

  const renderComponent = () => {

    return (
      <div className='header'>
        <div className='container'>
          <div className='row'>
            <div className='header-wrapper'>
              <div className="logo">
                <Link to='/' className='text-decoration-none'> ECommerce</Link>
              </div>
              <div className="user-actions">
                <Link to="/cart" >Cart</Link>
                <div className="user-intro">{user}</div>

                {
                  user !== 'Guest' ? <div className="logout-btn" onClick={logoutHandler}>Logout  </div> :

                    <div className="login-btn">

                      <Link to="/login">Login</Link>
                    </div>}

              </div>
            </div>
          </div>
        </div>
      </div>)



  }

  return (

    renderComponent()
  )
}

export default Navbar