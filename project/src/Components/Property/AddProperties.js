import React, {useRef, useState} from "react";

export default function AddProperties(){
    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const postcodeRef = useRef();

    const [firstNameError, setFirstNameError] = useState();
    const [surnameError, setSurnameError] = useState();
    const [addressError, setAddressError] = useState();
    const [phoneError, setPhoneError] = useState();
    const [postcodeError, setPostcodeError] = useState();

    // function clearForm(){
    //     firstNameRef.current.value = "";
    //     surnameRef.current.value = "";
    //     addressRef.current.value = "";
    //     postcodeRef.current.value = "";
    //     phoneRef.current.value = "";
    // }

    function handleSubmit(){
        if(firstNameRef.current.value=="" || surnameRef.current.value==""){
            alert("not acceptable");
        }
        else{
            //POST method;
        }
    }

    function addProperty(){
        handleSubmit();
    }

    return (
        <>
            <div className="pageHeader">Add Properties</div>
            <form className={"property-form bg-dark"}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="sellerFirstName">First Name</label>
                        <input type="text" className="form-control" id="sellerFirstName" ref={firstNameRef}/>
                        {firstNameError ?
                            <div className="text-danger"><i className="bi bi-exclamation-circle"/>First Name cannot
                                be blank</div> : ""}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="sellerSurname">Surname</label>
                        <input type="text" className="form-control" id="sellerSurname" ref={surnameRef}/>
                        {surnameError ?
                            <div className="text-danger"><i className="bi bi-exclamation-circle"/>Surname cannot be
                                blank</div> : ""}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="sellerAddress">Address</label>
                    <input type="text" className="form-control" id="sellerAddress" ref={addressRef}/>
                    {addressError ?
                        <div className="text-danger"><i className="bi bi-exclamation-circle"/>Address cannot be
                            blank</div> : ""}
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="sellerPostcode">Postcode</label>
                        <input type="text" className="form-control" id="sellerPostcode" ref={postcodeRef}/>
                        {postcodeError ?
                            <div className="text-danger"><i className="bi bi-exclamation-circle"/>
                                Postcode cannot be blank</div> : ""}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="sellerPhone">Phone</label>
                        <input type="text" className="form-control" id="sellerPhone" ref={phoneRef}/>
                        {phoneError ?
                            <div className="text-danger"><i className="bi bi-exclamation-circle"/>Phone cannot be blank
                            </div> : ""}
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}><i
                        className="bi bi-person-add"/>&nbsp;Add New Seller
                    </button>
                </div>
            </form>

        </>
    );
}