import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import "./Booking.css"

export default function Booking(){
    const {propertyId} = useParams();

    let [propertyRecord, setPropertyRecord] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/seller/`)
            .then( (response) => response.json())
            .then( (record) => setPropertyRecord(record))
            .then(console.log(propertyRecord))
    }, []);

    return (
        <>
            <h1>Book viewing slots</h1>

            <ul className={"custom-list"}>
                {
                    propertyRecord.filter((record) => record.id == propertyId
                        )
                        .map(property => (
                        <>
                            <li key={property.id}>
                                <div className={"priceBlock forsale"}>
                                    <span>{property.status}</span><br/>
                                    £{property.price}
                                </div>
                                <div className="detailsBlock">
                                    <div>Address: {property.address} <br/>
                                        {property.postcode}</div>
                                    <div>
                                        <span>Type: {property.type}</span> <br/>
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
    )
}