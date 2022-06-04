import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

import { getAllCategories } from '../../api/category';

import './lp.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {


  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {


    try {

      const result = await getAllCategories();
      console.log(result);
      setCategories(result.data);

    } catch (error) {

      console.log(error);
    }


  }


  useEffect(() => {

    fetchCategories();

  }, [])

  const renderComponent = () => {


    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="home-title">Welcome to Online Shopping...</h2>
            </div>
            <div className="col-12">
              <div className="category-list">
                <div className="category-item">
                  <Link to="/products" >All Products</Link>
                </div>

                {
                  categories.map(category => (

                    <div className="category-item" key={category.id}>
                      <Link to={`/products?categoryId=${category.id}&name=${category.name}`} className="text-white">
                        {category.name}

                      </Link>
                    </div>
                  )

                  )
                }
              </div>
            </div>
            <div className="col-12">
              <div className="category-title">
                Select a category to start shopping
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

export default LandingPage