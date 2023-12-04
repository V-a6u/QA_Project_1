import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";

import "./Buyer.css"

export default function Buyer(){
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const buyerListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            case "REMOVE":
                return state.filter(buyer => buyer.id !== action.payload);
            default:
                return state;
        }
    };
    const [buyersList, dispatch] = useReducer(buyerListReducer, []);

    useEffect( () => {
        setLoading(true);

        fetch("http://localhost:3001/buyer")
            .then((response) => response.json())
            .then( (buyers) => {
                dispatch({type: "SET", payload: buyers});
                setLoading(false);
            })
    }, []);

    return(
        <>
            <header>Add new buyer form</header>
            <hr/>

            {
                loading ?
                    <div className="message alert alert-info" role="alert">
                        <span className="spinner-border" role="status"><i className="sr-only"/></span>
                        Loading Buyers
                    </div>
                    : ""
            }

            <ul>
                {
                    buyersList.map( buyer => {
                        <li key={buyer.id}>
                            <div className="buyerBlock">
                                <i className="bi bi-person-fill"/>{buyer.firstName}&nbsp;{buyer.surname}
                            </div>
                            <i className="bi bi-geo-alt-fill"/>{buyer.address}&nbsp;{buyer.postcode}<i/><i/>
                            <i className="fa fa-phone"/>{buyer.phone}&nbsp;
                            REF: {buyer.id}
                        </li>
                    })
                }
            </ul>


        </>
    )


}