import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";

import "./Seller.css";

export default function Seller(){
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const sellerListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            default:
                return state;
        }
    };
    const [sellersList, dispatch] = useReducer(sellerListReducer, []);
    const sellerAddHandler = (newSeller) => {
        setSaving(true);

        fetch("http://localhost:3001/seller", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newSeller)
        })
            .then((response) => response.json())
            .then(newSeller => {
                dispatch({type: "ADD", payload: newSeller});
                setSaving(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3001/seller")
            .then((response) => response.json())
            .then(sellers => {
                dispatch({type: "SET", payload: sellers});
                setLoading(false);
            });
    }, []);

    return(
        <>
            <header>Add seller form here</header>
            <hr/>

            {
                loading ?
                    <div className="message alert alert-info" role="alert">
                        <span className="spinner-border" role="status"><i className="sr-only"/></span>
                        Loading Seller
                    </div>
                    : ""
            }
            <ul className={"custom-list"}>
                {
                    sellersList.map(seller => (
                        <li key={seller.id}>
                            <div className="sellerBlock bg-dark-subtle"> {seller.firstName}&nbsp;{seller.surname}</div>
                            <div>
                                Address: {seller.address}&nbsp;{seller.postcode} <br/>
                                Phone: {seller.phone} <br/>
                                REF: {seller.id}
                                <Link to={`${seller.id}/property`} state={seller}
                                      className="btn btn-info btn-sm float-end">
                                    <i className="bi bi-house-add"/>&nbsp;Manage Properties</Link>
                            </div>
                        </li>
                    )
                    )
                }
            </ul>
        </>
    );
}