
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import { getAllProducts, getProductsForCategory, searchProduct } from '../../api/product';
import { Link } from 'react-router-dom';

import './productList.css';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(-1);

  const [searchTerm, setSearchTerm] = useState('');



  const init = async () => {

    const query = new URLSearchParams(window.location.search)

    const id = query.get('categoryId');
    setCurrentCategory(id);
    setCurrentCategoryName(query.get('name'));

    try {

      //remote call to fetch all products

      // const { data } = await getAllProducts();

      const { data } = id ? await getProductsForCategory(id) : await getAllProducts();
      console.log(data);
      setProducts(data);


    } catch (error) {

      console.log(error);

    }
  }


  useEffect(() => {

    init();

  }, [])


  const searchProductHandler = async (e) => {

    console.log(e.target.value)

    const input = { name: e.target.value };
    setSearchTerm(e.target.value);


    try {
      const response = await searchProduct(input);
      console.log(response);
      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }


  }


  const updateMinPrice = (e) => {

    console.log("Update min price called .", e.target.value);
    setMinPrice(e.target.value);
    filterProduct(e.target.value, maxPrice);

  }


  const updateMaxPrice = (e) => {

    console.log("Update max price called .", e.target.value)

    setMaxPrice(e.target.value);
    filterProduct(minPrice, e.target.value);

  }

  const filterProduct = async (minPrice, maxPrice) => {

    const input = {
      name: searchTerm,
      minCost: minPrice,
      maxCost: maxPrice
    }

    try {

      const result = await searchProduct(input);
      setProducts(result.data);

    } catch (error) {

      console.log(error);

    }


  }


  const clearFilterHandler = async () => {

    setSearchTerm(null);
    setMinPrice(0);
    setMaxPrice(-1);

    const { data } = await getAllProducts();


    setProducts(data);

  }

  const renderSearchBar = () => {

    return (
      <div style={{ position: 'sticky', top: 300 }}>
        <div className="sidebar-search">
          <input type="text" className="form-control" placeholder="Search by name ..." onChange={searchProductHandler} />

          {!currentCategory && (
            <>
              <div className="sidebar-title">
                Filter By Price
              </div>
              <div className="price-filter">
                <div className="price-filter-select  justify-content-between">
                  <div className="form-group">
                    <select className="form-select" onChange={updateMinPrice}>
                      <option value="0">0</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="5000">5000</option>
                      <option value="10000">10000</option>
                      <option value="20000">20000</option>
                      <option value="50000">50000</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select className="form-select" onChange={updateMaxPrice}>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="5000">5000</option>
                      <option value="10000">10000</option>
                      <option value="20000">20000</option>
                      <option value="50000">50000</option>
                      <option value="100000">100000+</option>
                    </select>
                  </div>
                </div>
                <div className="price-filter-title d-flex justify-content-between">

                  <div>Min Price</div>
                  <div>Max Price</div>
                </div>
                <div className="btn btn-primary clear-filter" onClick={clearFilterHandler}>
                  Clear All Filters
                </div>
              </div>
            </>
          )

          }
        </div>
      </div>
    )


  }

  const renderComponent = () => {

    return (
      <>
        <Navbar />
        <div className="product-list">
          <div className="container">
            <div className="row d-flex justify-content-between">

              <div className="col-3">
                {/* search bar placeholder */}
                {renderSearchBar()}

              </div>
              <div className="col-8">

                <h2 className="product-list-title">{currentCategory ? `Products in '${currentCategoryName}' category` : 'All Products'}</h2>

                <div className="product-list-wrapper">

                  <div className="product-list-box">

                    {

                      products.map(product => (

                        <Link to="/" className="product-item" key={product.id}>

                          <div className="product-img">

                            <img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" alt="Item Pic" />

                          </div>
                          <div className="product-name text-center">
                            {product.name}
                          </div>
                          <div className="product-price">
                            <i className="fa fa-inr"> &nbsp;
                              {(+product.cost).toFixed(2)}
                            </i>
                          </div>
                          <div className="product-description">
                            {product.description}
                          </div>
                        </Link>
                      ))


                    }
                  </div>

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

export default ProductList