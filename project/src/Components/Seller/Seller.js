import React, {useEffect, useReducer, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';


import SellerForm from './AddSellerForm';
import SellerProperty from './SellerProperty';

import "./Seller.css";

export default function Seller(){
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const postcodeRef = useRef();

    const [loading, setLoading] = useState(false);

    const [sellerToEdit, setSellerToEdit] = useState();
    const [show, setShow] = useState(false);

    const token = sessionStorage.getItem("jwt");

    const handleClose = () => setShow(false);
    const handleShow = (seller) => {
        setSellerToEdit(seller)
        setShow(true);
    }

    const handleUpdate = (sellerId) => {
        let newSellerDetails = {
            //"id" : sellerId,
            "firstName": firstNameRef.current.value,
            "surname": surnameRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
            //"properties" : []
        }

        fetch(`https://localhost:3001/seller/${sellerId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(newSellerDetails)
        })
            .then(setShow(false))
            .then(FetchSellers);

    }

    const sellerListReducer = (state, action) => {
        switch (action.type) {
            case "ADD":
                return state.concat(action.payload);
            case "SET":
                return action.payload;
            case "REMOVE":
                return state.filter(seller => seller.id !== action.payload.id);
            default:
                return state;
        }
    };
    const [sellersList, dispatch] = useReducer(sellerListReducer, []);

    //Loaded on default
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3001/seller/")
            .then((response) => response.json())
            .then(sellers => {
                dispatch({type: "SET", payload: sellers});
                setLoading(false);
            });
    }, []);

    // const sellerAddHandler = (newSeller) => {
    //     fetch("http://localhost:3001/seller", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(newSeller)
    //     })
    //         .then((response) => response.json())
    //         .then(newSeller => {
    //             dispatch({type: "ADD", payload: newSeller});
    //         })
    //         .then(() => {
    //             alert("Seller " + newSeller.firstName + " " + newSeller.surname + " added.")
    //         });
    // };

    const sellerAddHandler = (newSeller) => {
        fetch("https://localhost:3001/seller", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(newSeller)
        })
            .then((response) => response.json())
            .then(newSeller => {
                dispatch({type: "ADD", payload: newSeller});
            })
            .then(() => {
                alert("Seller " + newSeller.firstName + " " + newSeller.surname + " added.")
            });
    };


    function FetchSellers() {
        fetch("https://localhost:3001/seller")
            .then((response) => response.json())
            .then(sellers => {
                dispatch({type: "SET", payload: sellers});
                setLoading(false);
            });
    }

    function handleDelete(sellerId, sellerFname, sellerLname){
        const confirmMessage = "Are you sure you want to delete seller with \nREFERENCE: " + sellerId + "\nNAME: " + sellerFname + " " + sellerLname;
        const confirmDelete = window.confirm(confirmMessage);

        if(confirmDelete) {
            fetch(`https://localhost:3001/seller/${sellerId}`, {
                method: "DELETE",
                headers: {"Authorization" : `Bearer ${token}`}
            })
                .then((sellerToDelete) => { dispatch({type: "REMOVE", payload: sellerToDelete}) })
                .then(alert("Seller deleted"))
                .then(FetchSellers);

        }

    }

    return(
        <>
            <div className="pageHeader bg-dark"><i className="bi bi-person-square"/>&nbsp;Manage Sellers</div>
            <Accordion  >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Seller</Accordion.Header>
                <Accordion.Body>
                <SellerForm addSellerHandler={sellerAddHandler}/>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
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
                                <div className={"float-end text-white"}>
                                <button className="btn btn-info btn-sm" onClick={() => handleShow(seller)}>
                                    <i className="bi bi-person-fill"/>&nbsp;Edit Profile
                                </button>
                                <Link to={`${seller.id}/property`} state={seller}
                                      className="btn btn-warning btn-sm">
                                    <i className="bi bi-house-add"/>&nbsp;Manage Properties</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(seller.id, seller.firstName, seller.surname)}>
                                    <i className="bi bi-trash-fill"/>&nbsp;Delete
                                </button>
                                </div>
                            </div>
                        </li>
                    )
                    )
                }
            </ul>

            {show && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className={"bg-light text-dark"}>
                            <label>First Name</label>
                            <input type="text" className="form-control" id={"fname"} defaultValue={sellerToEdit.firstName} ref={firstNameRef} />
                            <label>Surname</label>
                            <input type="text" className="form-control" id={"sname"} defaultValue={sellerToEdit.surname}  ref={surnameRef} />
                            <label>Address</label>
                            <input type="text" className="form-control" id={"address"} defaultValue={sellerToEdit.address} ref={addressRef} />
                            <label>Postcode</label>
                            <input type="text" className="form-control" id={"postcode"} defaultValue={sellerToEdit.postcode} ref={postcodeRef} />
                            <label>Phone</label>
                            <input type="text" className="form-control" id={"phone"} defaultValue={sellerToEdit.phone} ref={phoneRef} />
                        </form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleUpdate(sellerToEdit.id)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}