import React, {useRef} from "react";

import './AddSellerForm.css';
export default function AddSellerForm(props){
    const addHandler = props.addHandler;

    const firstNameRef = useRef();
    const surnameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const postcodeRef = useRef();

    // useEffect( () => {
    //     fetch("http://localhost:3001/seller", {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(newSellerRecord)
    //     })
    //         .then((x) => alert("Record Added Successfully"));
    // }, sellerRecord);


    function addSeller() {
        if (firstNameRef.current.value && surnameRef.current.value && addressRef.current.value && phoneRef.current.value && postcodeRef.current.value) {
            addHandler({
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
                {/*Fname: <input type="text" ref={firstNameRef} id={"fname"} required/> <br/>*/}
                {/*Lname: <input type="text" ref={surnameRef} id={"sname"} /> <br/>*/}
                {/*Addrss: <input type="text" ref={addressRef} id={"address"} /> <br/>*/}
                {/*Postcode: <input type="text" ref={postcodeRef} id={"postcode"} /> <br/>*/}
                {/*Phone: <input type="text" ref={phoneRef} id={"phone"} /> <br/>*/}
                {/*<input type={"button"} value={"Sumit"} onClick={() => addSeller()}/>*/}

                <div className="row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" className="form-control" id={"fname"} ref={firstNameRef} />
                    </div>
                    <div className="form-group col-md-6">
                        <label >Surname</label>
                        <input type="text" className="form-control" id={"sname"} ref={surnameRef}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" id={"sellerAddress"} ref={addressRef}/>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Postcode</label>
                        <input type="text" className="form-control" id={"sellerPostcode"} ref={postcodeRef}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="text" className="form-control" id={"sellerPhone"} ref={phoneRef}/>
                    </div>
                </div>
                <div className="text-end">
                    <button className="btn btn-primary custom-button" onClick={() => addSeller()}>
                        <i className="bi bi-person-add"/>&nbsp;Add New Seller
                    </button>
                </div>
            </form>
        </>
    )
}
