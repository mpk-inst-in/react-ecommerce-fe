import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getProductById } from '../../api/product';
import { getCart, updateCart } from '../../api/cart';

import Navbar from '../../components/Navbar/Navbar';

import './product.css';

const Product = () => {


  const [selectdProduct, setSelectedProduct] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [productDetails, setProductDetails] = useState({});


  const { id } = useParams();



  const init = async () => {


    const user = localStorage.getItem('userId');

    user && setIsLoggedIn(true);


    setSelectedProduct(id);

    console.log(id);

    try {

      const response = await getProductById(id);
      setProductDetails(response.data);

    } catch (error) {

      console.log(error);

    }

  }




  useEffect(() => {

    init();

  },
    // eslint-disable-next-line
    [])


  const addToCart = async () => {

    // get hold of the cart object
    const { data } = await getCart();

    console.log(data);
    // Update the cart to contain the added item

    await updateCart(data.productsSelected, selectdProduct);

    const newProductDetails = { ...productDetails };

    newProductDetails.addedToCart = 1;

    setProductDetails(newProductDetails);

    console.log('Cart updated Successfully....')


  }

  const renderAddToCartButton = () => {


    if (isLoggedIn) {

      return (productDetails.addedToCart === 1) ? (
        <Link to="/cart" className="product-details-action btn btn-primary text-decoration-none">Go To Cart</Link>
      ) : (
        <div className="product-details-action btn btn-primary text-decoration-none" onClick={addToCart}>
          Add To Cart
        </div >
      )

    } else {

      return (

        <Link to="/login" className="product-details-action btn btn-success text-decoration-none">
          Login to <span style={{ textDecoration: 'underline' }}>Add To  Cart</span>
        </Link>

      )
    }




  }

  const renderComponent = () => {

    return <>
      <Navbar />

      <div className="product-details">

        <div className="container">

          <div className="row">


            <div className="product-details-wrapper">

              <div className="product-img">
                <div>

                  <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg"
                    alt="Detailed"
                  />
                </div>
              </div>

              <div className="product-details-box">
                <div className="product-name"> {productDetails.name}</div>
                <div className="product-price fw-bold"><i className="fa fa-inr" /> {(+productDetails.cost).toFixed(2)}</div>
                <div className="product-description">

                  <div className="product-description-title"> Description </div>
                  <div className="product-description-data"> {productDetails.description}  </div>

                </div>

                {renderAddToCartButton()}

              </div>
            </div>


          </div>



        </div>


      </div>
    </>

  }


  return (
    renderComponent()
  )


}

export default Product