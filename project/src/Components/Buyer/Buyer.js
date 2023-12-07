import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";

import "./Buyer.css"
import AddBuyerForm from "./AddBuyerForm";


export default function Buyer(){
    const [loading, setLoading] = useState(false);

    const buyerListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            default:
                return state;
        }
    };
    const [buyersList, dispatch] = useReducer(buyerListReducer, []);

    const buyerAddHandler = (newBuyer) => {
        fetch("http://localhost:3001/buyer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBuyer)
        })
            .then((response) => response.json())
            .then(newBuyer => {
                dispatch({type: "ADD", payload: newBuyer});
            })
            .then(() => {
                alert("Buyer " + newBuyer.firstName + " " + newBuyer.surname + " added.")
            });
    };

    useEffect( () => {
        setLoading(true);

        fetch("http://localhost:3001/buyer")
            .then((response) => response.json())
            .then( (buyers) => {
                //getBuyers(buyers);
                dispatch({type: "SET", payload: buyers});
                setLoading(false);
                //console.log(JSON.stringify(buyers));
            })
    }, []);

    return(
        <>
            <div className="pageHeader bg-dark"><i className="bi bi-person-square"/>&nbsp;Manage Buyers</div>
            <AddBuyerForm addHandler={buyerAddHandler}/>
            <hr/>

            {
                loading ?
                    <div className="message alert alert-info" role="alert">
                        <span className="spinner-border" role="status"><i className="sr-only"/></span>
                        Loading Buyers
                    </div>
                    : ""
            }


            <div>
                <ul className={"custom-list"}>
                    {
                        buyersList.map( (buyer) =>
                        <>
                            <li key={buyer.id}>
                                <div className={"buyerBlock bg-dark-subtle"}> {buyer.firstName}&nbsp;{buyer.surname} </div>
                                Address: {buyer.address}&nbsp;{buyer.postcode} <br/>
                                Phone: {buyer.phone} <br/>
                                REF: {buyer.id}
                                <Link to={`${buyer.id}/profile`} state={buyer}
                                      className="btn btn-info btn-sm float-end">
                                    <i className="bi bi-person-fill"/>&nbsp;Edit Profile</Link>
                            </li>
                        </>
                        )
                    }
                </ul>
            </div>


        </>
    )


}