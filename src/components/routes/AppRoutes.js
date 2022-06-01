
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import LandingPage from '../../pages/LandingPage/LandingPage';



const AppRoutes = () => {


  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
      </Routes>

    </BrowserRouter>


  )
}

export default AppRoutes;