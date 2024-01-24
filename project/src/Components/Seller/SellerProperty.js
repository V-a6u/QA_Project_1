import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState, useReducer, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import SellerPropertyForm from "./SellerPropertyForm";

export default function SellerProperty() {
  const { sellerId } = useParams();
  const buyersRef = useRef();
  const seller = useLocation().state; //to keep the state secure
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [propertyId, setPropertyId] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/buyer`)
      .then((response) => response.json())
      .then((record) => setBuyers(record))
      .then(setLoading(false));
  }, []);

  const propertyStatus = useRef();

  //let [sellerRecord, setSellerRecord] = useState([]);

  const propertyListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter((property) => property.id !== action.payload.id);
      default:
        return state;
    }
  };
  const [properties, dispatch] = useReducer(propertyListReducer, []);

  useEffect(() => {
    fetch("http://localhost:3001/property")
      .then((response) => response.json())
      .then((properties) => {
        dispatch({ type: "SET", payload: properties });
      });
  }, []);

  const FetchProperty = () => {
    fetch("http://localhost:3001/property")
      .then((response) => response.json())
      .then((properties) => {
        dispatch({ type: "SET", payload: properties });
      });
  };
  const propertyAddHandler = (newProperty) => {
    fetch("http://localhost:3001/property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    })
      .then((response) => response.json())
      .then((newProperty) => {
        dispatch({ type: "ADD", payload: newProperty });
      })
      .then(alert("New property added"));
  };

  const iconClassForStatus = (propertyStatus) => {
    switch (propertyStatus) {
      case "FOR SALE":
        return "forsale";
      case "SOLD":
        return "sold";
      case "WITHDRAWN":
        return "withdrawn";
    }
  };

  function toCamelCase(uppercaseString) {
    return (
      uppercaseString.charAt(0).toUpperCase() +
      uppercaseString.slice(1).toLowerCase()
    );
  }

  function sellProperty() {
    const propertyData = {
      buyerId: buyersRef.current.value,
      status: "SOLD",
    };
    fetch(`http://localhost:3001/property/${propertyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    })
      .then((response) => response.json())
      .then(() => {
        setShow(false);
      })
      .then(() => {
        setShowAlert(true);
        FetchProperty();
      });
  }

  function deleteProperty(propertyId, propertyAddress, propertyPostcode) {
    const confirmMessage =
      "Are you sure you want to delete property with \nREFERENCE: " +
      propertyId +
      "\nADDRESS: " +
      propertyAddress +
      "\n" +
      propertyPostcode;
    const confirmDelete = window.confirm(confirmMessage);

    if (confirmDelete) {
      fetch(`http://localhost:3001/property/${propertyId}`, {
        method: "DELETE",
      })
        .then((propertyToUpdate) => {
          dispatch({ type: "REMOVE", payload: propertyToUpdate });
        })
        .then(alert("Property deleted"))
        .then(FetchProperty);

      //FetchProperty();
    }
  }

  function withdrawProperty(propertyId, propertyAddress, propertyPostcode) {
    const confirmMessage =
      "Are you sure you want to withdraw property with \nREFERENCE: " +
      propertyId +
      "\nADDRESS: " +
      propertyAddress +
      "\n" +
      propertyPostcode;
    const confirmWithdraw = window.confirm(confirmMessage);

    if (confirmWithdraw) {
      fetch(`http://localhost:3001/property/${propertyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "WITHDRAWN" }),
      })
        .then((propertyToUpdate) => {
          dispatch({ type: "UPDATE", payload: propertyToUpdate });
        })
        .then(alert("Property withdrawn"))
        .then(FetchProperty);
    }
  }

  function resubmitProperty(propertyId, propertyAddress, propertyPostcode) {
    const confirmMessage =
      "Are you sure you want to resubmit property with \nREFERENCE: " +
      propertyId +
      "\nADDRESS: " +
      propertyAddress +
      "\n" +
      propertyPostcode;
    const confirmResubmit = window.confirm(confirmMessage);

    if (confirmResubmit) {
      fetch(`http://localhost:3001/property/${propertyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "FOR SALE" }),
      })
        .then((propertyToUpdate) => {
          dispatch({ type: "UPDATE", payload: propertyToUpdate });
        })
        .then(alert("Property resubmitted"))
        .then(FetchProperty);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = (property) => {
    setPropertyId(property.id);
    setShow(true);
  };

  /* Using map and filter function
    useEffect(() => {
        fetch(`http://localhost:3001/seller/`)
            .then( (response) => response.json())
            .then( (record) => setSellerRecord(record))
            .then(console.log(sellerRecord))
    }, []);


    return (
        <>
            Hi do you want to edit properties?
            <ul>
                {sellerRecord.filter(
                    (record) => record.id == sellerId
                )
                    .map( (record) => <><li>{record.id}</li><li>{record.firstName}</li><li>{record.surname}</li></>)}
            </ul>

        </>
    )*/

  return (
    <>
      {showAlert && (
        <Alert className="m-4" key="success" variant="success" dismissible>
          Property Sold
        </Alert>
      )}

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Property</Accordion.Header>
          <Accordion.Body>
            <SellerPropertyForm
              addHandler={propertyAddHandler}
              state={seller}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />

      {/*<BuyerSelector property={soldProperty} propertyUpdateHandler={propertyUpdateHandler} id={buyerSelectorId}/>*/}
      <ul className={"seller-list"}>
        {properties
          .filter((property) => Number(property.sellerId) === Number(seller.id))
          .map((property) => (
            <li key={property.id}>
              <div className={"d-inline-block align-top property-img"}>
                <img
                  src={property.imageUrl}
                  alt={`Property images for property ${property.id} are missing`}
                  className={"property-img"}
                />
              </div>
              <div
                className={"priceBlock " + iconClassForStatus(property.status)}
              >
                <span ref={propertyStatus}>{property.status}</span>
                <br />£{property.price}
              </div>
              <div className="detailsBlock">
                <div>
                  Address: {property.address} <br />
                  {property.postcode}
                </div>
                <div>
                  <span>Type: {toCamelCase(property.type)}</span> <br />
                  <span>Bedrooms: {property.bedroom}</span> <br />
                  <span>Bathrooms: {property.bathroom}</span> <br />
                  <span>
                    Garden: {Number(property.garden) ? "Yes" : "No"}
                  </span>{" "}
                  <br />
                  Reference:&nbsp;{property.id}
                </div>
              </div>
              {property.status === "FOR SALE" ? (
                <div className="text-end">
                  <button type="button" className={"btn btn-primary"}>
                    <i className="bi bi-pencil-fill"></i>&nbsp;Edit Property
                  </button>
                  <button
                    type="button"
                    className={"btn btn-warning"}
                    onClick={() => handleShow(property)}
                  >
                    <i className="bi bi-credit-card-2-front-fill"></i>&nbsp;Sell
                    Property
                  </button>
                  <button
                    type="button"
                    className={"btn btn-danger"}
                    onClick={() =>
                      deleteProperty(
                        property.id,
                        property.address,
                        property.postcode
                      )
                    }
                  >
                    <i className="bi bi-trash-fill"></i>&nbsp;Delete Property
                  </button>
                  <button
                    type="button"
                    className={"btn btn-info"}
                    onClick={() =>
                      withdrawProperty(
                        property.id,
                        property.address,
                        property.postcode
                      )
                    }
                  >
                    <i className="bi bi-trash-fill"></i>&nbsp;Withdraw Property
                  </button>
                </div>
              ) : (
                ""
              )}
              {property.status === "WITHDRAWN" ? (
                <div className="text-end">
                  <button
                    type="button"
                    className={"btn btn-info"}
                    onClick={() =>
                      resubmitProperty(
                        property.id,
                        property.address,
                        property.postcode
                      )
                    }
                  >
                    <i className="bi bi-trash-fill"></i>&nbsp;Resubmit Property
                  </button>
                </div>
              ) : (
                ""
              )}
            </li>
          ))}
      </ul>

      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Select buyer</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form className={"bg-light text-dark"}>
              <div className="form-group col mt-4">
                <label htmlFor="buyer">Buyer</label>
                <select className="form-select" ref={buyersRef}>
                  {buyers.map((buyer) => (
                    <option value={buyer.id} key={buyer.id}>
                      {buyer.firstName + " " + buyer.surname}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => sellProperty()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
