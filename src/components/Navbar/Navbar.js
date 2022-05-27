import './navbar.css';


const Navbar = () => {


  const renderComponent = () => {

    return (
      <div className='header'>
        <div className='container'>
          <div className='row'>
            <div className='header-wrapper'>
              <div className="logo">
                <a href='/' className='text-decoration-none'> ECommerce</a>
              </div>
              <div className="user-actions">
                <a href="/cart" >Cart</a>
                <div className="user-intro">Guest</div>

                <div className="login-btn">

                  <a href="/login">Login</a>
                </div>

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