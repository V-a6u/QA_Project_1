import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./App.css";

import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Property from "./Components/Property/Property";
import Seller from "./Components/Seller/Seller";
import Buyer from "./Components/Buyer/Buyer";
import BuyerProfile from "./Components/Buyer/BuyerProfile";
import SellerProperty from "./Components/Seller/SellerProperty";
import Booking from './Components/Booking/Booking';
import Error from "./Components/Error";
import Login from "./Components/LoginTest";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}> {/*This is the root path*/}
                <Route index element={<Home/>}/> {/*This is the default component shown in the <Outlet> tag */}
                <Route path="property" element={<Property/>}/>
                <Route path="seller" element={<Seller/>}/>
                <Route path="seller/:sellerId/property" element={<SellerProperty/>}/>
                <Route path="buyer" element={<Buyer/>}/>
                <Route path="buyer/:buyerId/profile" element={<BuyerProfile/>}/>
                <Route path="property/:propertyId/booking" element={<Booking/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path="*" element={<Error/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
