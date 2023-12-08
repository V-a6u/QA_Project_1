import { Carousel } from 'react-bootstrap';
import {Link} from "react-router-dom";

//Property images
import prop1 from "../public/pexels-binyamin-mellish-186077.jpg";
import prop2 from "../public/pexels-alex-qian-2343465.jpg";
import prop3 from "../public/pexels-binyamin-mellish-1396132.jpg";
import prop4 from "../public/pexels-curtis-adams-3935350.jpg";
import prop5 from "../public/pexels-jens-mahnke-1105754.jpg";

import prop6 from "../public/pexels-ben-mack-6775268.jpg";
import prop7 from "../public/pexels-pixabay-280222.jpg";
import prop8 from "../public/pexels-austin-187815.jpg";

import logoCompany from "./house-logo.png"

export default function Home(){
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return(
        <>
            <div className="container mt-4">
                <h1 className="display-4 text-center text-bg-danger">BookNest</h1>
            </div>

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={prop1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>House</h3>
                        <p>A beautiful house with spacious rooms and garden.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={prop2}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Condo</h3>
                        <p>Luxurious condo with resort-style amenities.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={prop3}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>House in a stunning location</h3>
                        <p>A modern house with stunning city views.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={prop4}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Apartment</h3>
                        <p>A modern apartment with stunning city views.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={prop5}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Farmhouse</h3>
                        <p>Huge farmhouse in a peaceful location</p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>

            <div className="container mt-4 bg-dark">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            className="img-fluid"
                            src={prop6} // Use secondary image
                            alt="Secondary Image"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="mt-3">
                            <h3>Resort-style Condo Living</h3>
                            <p>Indulge in luxury living with this upscale condo that offers resort-style amenities such as pools, fitness centers, and breathtaking views. Experience a lavish lifestyle in the heart of the city.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="container mt-4 bg-dark">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mt-3">
                                <h3>Urban Luxury Apartment</h3>
                                <p>Enjoy the bustling city life from this modern apartment with breathtaking skyline views. With sleek design and convenient access to amenities, it's perfect for those seeking a contemporary urban lifestyle.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img
                                className="img-fluid"
                                src={prop7} // Use secondary image
                                alt="Secondary Image"
                            />
                        </div>

                    </div>
                </div>

                <div className="container mt-4 bg-dark">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                className="img-fluid"
                                src={prop8} // Use secondary image
                                alt="Secondary Image"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="mt-3">
                                <h3>Charming Family Home</h3>
                                <p>This spacious house offers a perfect blend of modern amenities and classic charm. Featuring multiple bedrooms, a large backyard, and a cozy atmosphere, it's an ideal home for families.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer mt-4 py-3 bg-dark text-center text-white">
                <div className="container">
                    <div className={"row"}>
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3" onClick={scrollToTop} style={{cursor: 'pointer'}}>
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                <img src={logoCompany} className={"w-25 h-25"}/> &nbsp;
                                BookNest
                            </h6>
                            <p>
                                At BookNest, we are dedicated to simplifying your property rental and booking experience. Our platform is designed to provide a seamless and efficient way for property owners and guests to connect.
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                            <p>
                                <Link className={"nav-link"} to={"/property"}>Property</Link>
                            </p>
                            <p>
                                <Link className={"nav-link"} to={"/seller"}>Sellers</Link>
                            </p>
                            <p>
                                <Link className={"nav-link"} to={"/buyer"}>Buyers</Link>
                            </p>
                            <p>
                                <Link className={"nav-link"} to={"/booking"}>Booking</Link>
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i>Dundee, Angus, <br/>Scotland</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@booknest.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +44 73625 78640</p>
                        </div>

                    </div>

                    <div className="text-center p-3 footer-class">
                        © 2023 Copyright: BookNest
                    </div>
                </div>
            </footer>
        </>
    )
}