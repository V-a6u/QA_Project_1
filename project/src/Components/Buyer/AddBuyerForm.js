import React, {useRef, useState} from "react";

export default function AddBuyerForm(props){
    const addBuyerHandler = props.addHandler;

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

    function addBuyer() {
        if (firstNameRef.current.value && surnameRef.current.value && addressRef.current.value && phoneRef.current.value && postcodeRef.current.value) {
            addBuyerHandler({
                "firstName": firstNameRef.current.value,
                "surname": surnameRef.current.value,
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "phone": phoneRef.current.value,
            });
        }
        else{
            alert("Please fill all the fields");
        }

        clearForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setFirstNameError(!firstNameRef.current.value);
        setSurnameError(!surnameRef.current.value);
        setAddressError(!addressRef.current.value);
        setPhoneError(!phoneRef.current.value);
        setPostcodeError(!postcodeRef.current.value);

        if (firstNameRef.current.value && surnameRef.current.value && addressRef.current.value && phoneRef.current.value && postcodeRef.current.value) {
            addBuyerHandler({
                "firstName": firstNameRef.current.value,
                "surname": surnameRef.current.value,
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "phone": phoneRef.current.value,
            });
            clearForm();
        }
    };


    function clearForm() {
        firstNameRef.current.value = "";
        surnameRef.current.value = "";
        addressRef.current.value = "";
        postcodeRef.current.value = "";
        phoneRef.current.value = "";
    };


    return(
        <>
            <form>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" className="form-control" id={"fname"} ref={firstNameRef} data-cy="fname"/>
                        {
                            firstNameError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>First Name cannot be blank </div>
                                : ""
                        }
                    </div>
                    <div className="form-group col-md-6">
                        <label >Surname</label>
                        <input type="text" className="form-control" id={"sname"} ref={surnameRef} data-cy="lname" />
                        {
                            surnameError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Surname cannot be blank </div>
                                : ""
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" id={"sellerAddress"} ref={addressRef} data-cy="address" />
                    {
                        addressError ?
                            <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Address cannot be blank </div>
                            : ""
                    }
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Postcode</label>
                        <input type="text" className="form-control" id={"sellerPostcode"} ref={postcodeRef} data-cy="postcode"/>
                        {
                            postcodeError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Postcode cannot be blank </div>
                                : ""
                        }
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="text" className="form-control" id={"sellerPhone"} ref={phoneRef} data-cy="phone"/>
                        {
                            phoneError ?
                                <div className={"text-danger"}><i className={"bi bi-exclamation-circle"}/>Phone number cannot be blank </div>
                                : ""
                        }
                    </div>
                </div>
                <div className="text-end">
                    <button type={"submit"} className="btn btn-primary custom-button" onClick={handleSubmit} data-cy="addNewBuyer">
                        <i className="bi bi-person-add"/>&nbsp;Add New Buyer
                    </button>
                </div>
            </form>
        </>

    )
}