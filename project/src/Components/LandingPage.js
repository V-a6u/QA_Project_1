import {Link, Outlet} from "react-router-dom";
import React from "react";
import logo from './logo192.png';
import './LandingPage.css';

export default function LandingPage(){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link className={"nav-link"} to={"/"}> <img src={logo} className={"d-inline-block align-top logo-img"}/> </Link>
                <Link className={"nav-link my-custom-link"} to={"/"}> Home </Link>
                <Link className={"nav-link my-custom-link"} to={"/property"}>Property </Link>
                <Link className={"nav-link my-custom-link"} to={"/seller"}> Seller </Link>
                <Link className={"nav-link my-custom-link"} to={"/buyer"}> Buyers </Link>
                <Link className={"nav-link my-custom-link"} to={"/booking"}> Booking </Link>
            </nav>
            <Outlet/>
        </>
    )
}