import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

import "./Property.css";
import houseImage from "../Property/pexels-binyamin-mellish-186077.jpg"
import FilterProperty from "./FilterProperty";

export default function Property(){
    const propertyListReducer = (state, action) => {
        switch (action.type) {
            case "SET":
                return action.payload;
            case "REMOVE":
                return state.filter(property => property.id !== action.payload);
            default:
                return state;
        }
    };
    const [properties, dispatch] = useReducer(propertyListReducer, []);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchHandler = (searchCriteria) => {
        setSearchResult(properties.filter(property =>
            (searchCriteria.type === "Any" || property.type === searchCriteria.type) &&
            (Number(property.bedroom) >= Number(searchCriteria.bedroom)) &&
            (Number(property.bathroom) >= Number(searchCriteria.bathroom)) &&
            (Number(property.garden) >= Number(searchCriteria.garden)) &&
            (Number(searchCriteria.price) === 0 || Number(property.price) <= Number(searchCriteria.price))
        ));
    };

    const iconClassForStatus = (propertyStatus) => {
        switch (propertyStatus) {
            case "FOR SALE" :
                return "forsale";
            case "SOLD" :
                return "sold";
            case "WITHDRAWN" :
                return "withdrawn";
        }
    };

    function toCamelCase(uppercaseString){
        return uppercaseString.charAt(0).toUpperCase() + uppercaseString.slice(1).toLowerCase();
    }


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3001/property")
            .then( (response) => response.json())
            .then( (properties) => {
                dispatch({type: "SET", payload: properties});
                setSearchResult(properties);
                setLoading(false);
        })

    }, []);

    return (
        <>
            <div className="pageHeader bg-dark"><i className="bi bi-house-fill"/>&nbsp;Property Search and Bookings</div>
            
            <Accordion  >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filter Properties</Accordion.Header>
                <Accordion.Body>
                <FilterProperty searchHandler={searchHandler}/>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>

            <hr/>
            {
                loading ?
                    <div className="message alert alert-info" role="alert">
                        <span className="spinner-border" role="status"><i className="sr-only"/></span>
                        Loading Properties
                    </div>
                    : ""
            }   {/*loading function copied directly from the tutorial*/}
            <ul className={"custom-list"}>
                {
                    searchResult.map(property => (
                        <>
                            <li key={property.id}>
                                <div className={"d-inline-block align-top property-img"}>
                                    <img src={property.imageUrl} alt={`Property images for property ${property.id} are missing`} className={"property-img"}/>
                                </div>
                                <div className={"priceBlock " + iconClassForStatus(property.status)}>
                                    <span>{property.status}</span><br/>
                                    £{property.price}
                                </div>
                                <div className="detailsBlock">
                                    <div>Address: {property.address} <br/>
                                        {property.postcode}</div>
                                    <div>
                                        <span>Type: {toCamelCase(property.type)}</span> <br/>
                                        <span>Bedrooms: {property.bedroom}</span> <br/>
                                        <span>Bathrooms: {property.bathroom}</span> <br/>
                                        <span>Garden: {Number(property.garden) ? "Yes" : "No"}</span> <br/>
                                        Reference:&nbsp;{property.id}
                                    </div>
                                </div>
                                {
                                    property.status === "FOR SALE" ?
                                        <Link to={`/property/${property.id}/booking`} state={property}
                                              className="btn btn-info btn-sm float-end">
                                            <i className="bi-alarm"/>&nbsp;Manage Bookings</Link>
                                        : ""
                                }
                            </li>
                        </>
                    ))
                }
            </ul>
        </>
    );
}