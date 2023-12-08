import React, {useEffect, useReducer, useRef, useState} from "react";
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import "./Buyer.css"
import AddBuyerForm from "./AddBuyerForm";
import BuyerProfile from "./BuyerProfile";

export default function Buyer(){
    const [loading, setLoading] = useState(false);
    const [buyerToEdit, setBuyerToEdit] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (buyer) => {
        setBuyerToEdit(buyer)
        setShow(true);
    }

    const handleUpdate = (buyerId) => {
        let newBuyerDetails = {
            "firstName": firstNameRef.current.value,
            "surname": surnameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
        }

        fetch(`http://localhost:3001/buyer/${buyerId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBuyerDetails)
        })
            .then(setShow(false))
            .then(FetchBuyers);

    }

    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const postcodeRef = useRef();

    const buyerListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            case "REMOVE":
                return state.filter(buyer => buyer.id !== action.payload.id);
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

    function FetchBuyers(){
        fetch("http://localhost:3001/buyer")
            .then((response) => response.json())
            .then( (buyers) => {
                dispatch({type: "SET", payload: buyers});
            });
    }

    function handleDelete(buyerId, buyerFname, buyerLname){
        const confirmMessage = "Are you sure you want to delete buyer with \nREFERENCE: " + buyerId + "\nNAME: " + buyerFname + " " + buyerLname;
        const confirmDelete = window.confirm(confirmMessage);

        if(confirmDelete) {
            fetch(`http://localhost:3001/buyer/${buyerId}`, {
                method: "DELETE"
            })
                .then((buyerToDelete) => { dispatch({type: "REMOVE", payload: buyerToDelete}) })
                .then(alert("Buyer deleted"))
                .then(FetchBuyers);

        }
}


    return(
        <>
            {/*<Accordion flush>*/}
            {/*    <Accordion.Item eventKey="0" className={"custom-accordian"}>*/}
            {/*        <Accordion.Header>Add New Buyer</Accordion.Header>*/}
            {/*        <Accordion.Body>*/}
            {/*            <div className="pageHeader bg-dark"><i className="bi bi-person-square"/>&nbsp;Manage Buyers</div>*/}
            {/*            <AddBuyerForm addHandler={buyerAddHandler}/>*/}
            {/*        </Accordion.Body>*/}
            {/*    </Accordion.Item>*/}
            {/*</Accordion>*/}
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
                                <div className={"float-end"}>
                                    <button className="btn btn-info btn-sm" onClick={() => handleShow(buyer)}>
                                        <i className="bi bi-person-fill"/>&nbsp;Edit Profile
                                    </button>
                                    <Link to={`/property`} className="btn btn-warning btn-sm">
                                        <i className="bi bi-house-add"/>&nbsp;Book Property</Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(buyer.id, buyer.firstName, buyer.surname)}>
                                        <i className="bi bi-trash-fill"/>&nbsp;Delete
                                    </button>
                                </div>
                            </li>
                        </>
                        )
                    }
                </ul>
            </div>

            {show && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className={"bg-light text-dark"}>
                            <label>First Name</label>
                            <input type="text" className="form-control" id={"fname"} defaultValue={buyerToEdit.firstName} ref={firstNameRef} />
                            <label>Surname</label>
                            <input type="text" className="form-control" id={"sname"} defaultValue={buyerToEdit.surname}  ref={surnameRef} />
                            <label>Address</label>
                            <input type="text" className="form-control" id={"address"} defaultValue={buyerToEdit.address} ref={addressRef} />
                            <label>Postcode</label>
                            <input type="text" className="form-control" id={"postcode"} defaultValue={buyerToEdit.postcode} ref={postcodeRef} />
                            <label>Phone</label>
                            <input type="text" className="form-control" id={"phone"} defaultValue={buyerToEdit.phone} ref={phoneRef} />
                        </form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleUpdate(buyerToEdit.id)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                )}


        </>
    )


}