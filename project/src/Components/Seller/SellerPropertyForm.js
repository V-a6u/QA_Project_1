import React, {useRef, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {add} from "react-modal/lib/helpers/classList";

export default function SellerPropertyForm(props){
    //const {sellerId} = useParams();
    const seller = useLocation().state;
    const addHandler = props.addHandler;

    const addressRef = useRef();
    const postcodeRef = useRef();
    const typeRef = useRef(null);
    const bedroomsRef = useRef();
    const bathroomsRef = useRef();
    const gardenRef = useRef();
    const priceRef = useRef();

    const [priceError, setPriceError] = useState();
    const [bedroomError, setBedroomError] = useState();
    const [bathroomError, setBathroomError] = useState();
    const [addressError, setAddressError] = useState();
    const [postcodeError, setPostcodeError] = useState();

    function handleSubmit(e){
        e.preventDefault();

        setPriceError(!priceRef.current.value);
        setBedroomError(!bedroomsRef.current.value);
        setAddressError(!addressRef.current.value);
        setBathroomError(!bathroomsRef.current.value)
        setPostcodeError(!postcodeRef.current.value);

        if (priceRef.current.value && bedroomsRef.current.value && bathroomsRef.current.value && addressRef.current.value && postcodeRef.current.value) {
            addHandler({
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "type": typeRef.current.value,
                "price": priceRef.current.value,
                "bedrooms": bedroomsRef.current.value,
                "bathrooms": bathroomsRef.current.value,
                "garden": gardenRef.current.value,
                "sellerId": seller.id,
                "status": "FOR SALE",
                "imageUrl": "https://emacplan.co.za/wp-content/themes/homely/images/property-img-default.gif"
            });
        }

        clearForm();
    }

    function clearForm() {
        typeRef.current.value = "DETACHED";
        priceRef.current.value = "";
        bedroomsRef.current.value = "";
        bathroomsRef.current.value = "";
        gardenRef.current.value = "false";
        addressRef.current.value = "";
        postcodeRef.current.value = "";
    }

    return(
        <>
            <div className="pageHeader bg-dark"><i className="bi bi-person-square"/>&nbsp;Manage Properties for&nbsp;&nbsp;
                <span className={"text-primary"}>{seller.firstName} {seller.surname} - {seller.address}</span>
            </div>
            <form>
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="propertyType">Type</label>
                        <select className="form-select" ref={typeRef}>
                            <option value="DETACHED">Detached</option>
                            <option value="SEMI">Semi</option>
                            <option value="APARTMENT">Apartment</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="propertyPrice">Price</label>
                        <input type="number" className="form-control" id="propertyPrice" ref={priceRef} placeholder={"£100000"}/>
                        {
                            priceError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Price cannot be blank or alphabet</div>
                                    : ""
                        }
                    </div>
                    <div className="form-group col">
                        <label>Bedrooms</label>
                        <input type="number" className="form-control" id="numberBedrooms" ref={bedroomsRef} placeholder={"2"}/>
                        {
                            bedroomError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Bedrooms cannot be blank or alphabet</div>
                                : ""
                        }
                    </div>
                    <div className="form-group col">
                        <label>Bathrooms</label>
                        <input type="number" className="form-control" id="numberBathrooms" ref={bathroomsRef} placeholder={"2"}/>
                        {
                            bathroomError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Bathroom cannot be blank or alphabet</div>
                                : ""
                        }
                    </div>
                    <div className="form-group col">
                        <label htmlFor="numberOfGardens">Garden</label>
                        <select className="form-select" ref={gardenRef}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                <div className="form-group col-md-8">
                    <label htmlFor="propertyAddress">Address</label>
                    <input type="text" className="form-control" id="propertyAddress" ref={addressRef}/>
                    {
                        addressError ?
                            <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Address cannot be blank</div>
                            : ""
                    }
                </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="propertyPostcode">Postcode</label>
                        <input type="text" className="form-control" id="propertyPostcode" ref={postcodeRef}/>
                        {
                            postcodeError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Postcode cannot be blank </div>
                                : ""
                        }
                    </div>
                </div>
                <div className="text-end">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        <i className="bi bi-house-add"/>&nbsp;Add New Property
                    </button>
                </div>
            </form>
        </>
    )
}