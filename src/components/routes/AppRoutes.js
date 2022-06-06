
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import LandingPage from '../../pages/LandingPage/LandingPage';
import Product from "../../pages/Product/Product";
import ProductList from "../../pages/ProductList/ProductList";



const AppRoutes = () => {


  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/products" element={<ProductList />} />

        <Route path="/products/:id/detail" element={<Product />} />
      </Routes>

    </BrowserRouter>


  )
}

export default AppRoutes;