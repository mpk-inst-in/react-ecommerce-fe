import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCart, getCart } from '../../api/cart';
import Navbar from '../../components/Navbar/Navbar';
import './checkout.css';


const Checkout = () => {

  const [orderDetails, setOrderDetails] = useState({});

  const [productDetails, setProductDetails] = useState([]);

  const [confirmPaymentSuccess, setConfirmPaymentSuccess] = useState(false);



  const init = async () => {

    try {

      const result = await getCart();
      setOrderDetails(result.data);
      setProductDetails(result.data.productsSelected);

    } catch (error) {

      console.log(error)
    }

  }


  useEffect(() => {

    init();

  }, [])


  const confirmPayment = async () => {

    localStorage.removeItem("cartId");
    try {

      await createCart();
      setConfirmPaymentSuccess(true);
      console.log('Payment Successful ...');

    } catch (error) {

      console.log(error)
    }



  }


  const renderComponent = () => {

    return (
      <>
        <Navbar />
        <div className="checkout">
          <div className="container">
            <div className="row">
              <div className="checkout-title">Checkout</div>
              <div className="checkout-wrapper">

                <div className="checkout-details">
                  <div className="checkout-details-title"> Order Summary</div>
                  {
                    productDetails?.map(product => (
                      <div className="checkout-details-product " key={product.id}>
                        <div className="checkout-details-product-img ">
                          <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg"

                            alt="Product"
                          />
                        </div>
                        <div className="checkout-details-product-data ">
                          <div>{product.name}</div>
                          <div> <i className="fa fa-inr" /> {(+product.cost).toFixed(2)}</div>
                        </div>
                      </div>
                    ))
                  }

                </div>
                <div className="checkout-price-details">
                  <div className="checkout-price-details-box">
                    <div className="checkout-price-details-title">Price Details</div>
                    <div className="checkout-price-details-data">
                      <div className="checkout-price-details-item">
                        <div>Price</div>
                        <div><i className="fa fa-inr" />{(+orderDetails.cost).toFixed(2)}</div>
                      </div>
                      <div className="checkout-price-details-item">
                        <div>Discount</div>
                        <div><i className="fa fa-inr" /> 0.00</div>
                      </div>
                      <div className="checkout-price-details-item">
                        <div>Delivery Charges</div>
                        <div>FREE</div>
                      </div>
                      <div className="checkout-price-details-item">
                        <div>Total</div>
                        <div><i className="fa fa-inr" /> {(+orderDetails.cost).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  {
                    confirmPaymentSuccess ? (
                      <div>

                        <div className="confirm-payment-success-msg"> Order Confirmed</div>
                        <Link to="/" className="btn btn-info continue-shopping-btn" >Continue Shopping</Link>

                      </div>

                    ) : (

                      <div className="confirm-payment-btn btn btn-primary" onClick={confirmPayment}>Confirm Payment</div>
                    )
                  }
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

export default Checkout