import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function SellerProperty(){
    const {sellerId} = useParams();

    let [sellerRecord, setSellerRecord] = useState([]);

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
    )
}