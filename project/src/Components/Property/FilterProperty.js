import { useRef } from "react";

export default function FilterProperty(props){
    const searchHandler = props.searchHandler;

    const typeRef = useRef();
    const bedroomsRef = useRef();
    const bathroomsRef = useRef();
    const gardenRef = useRef();
    const priceRef = useRef();

    /*
    useEffect(() => {
        fetch("http://localhost:3001/property")
            .then( (response) => response.json())
            .then( (properties) => getunFilteredProperties(properties) )
        }, []);


    function filterRecords(){
        setfilteredProperties(unfilteredProperties.filter( (properties) =>
            (properties.bedroom >= input1.current.value) &&
            (properties.bathroom >= input2.current.value)
        ));
        //alert(input1.current.value);
        console.log(filteredProperties);
    }
    */

    function doSearch(){
        searchHandler(
            {
                type: typeRef.current.value,
                bedroom: bedroomsRef.current.value,
                bathroom: bathroomsRef.current.value,
                garden: gardenRef.current.value,
                price: priceRef.current.value,

            }
        )
    }

    function doClear(){
        typeRef.current.value = "Any";
        bedroomsRef.current.value = 0;
        bathroomsRef.current.value = 0;
        gardenRef.current.value = 0;
        priceRef.current.value = 0;

        window.location.reload();
    }


    return(
        <>
            <form>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="propertyType">Type</label>
                            <select className="form-select" ref={typeRef} data-cy="property-type-filter">
                                <option value="Any">Any</option>
                                <option value="DETACHED">Detached</option>
                                <option value="SEMI">Semi</option>
                                <option value="APARTMENT">Apartment</option>
                            </select>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="propertyPrice">Price</label>
                            <select className="form-select" ref={priceRef} data-cy="property-price-filter">
                                <option value="0">Any</option>
                                <option value="50000">Up to 50000</option>
                                <option value="100000">Up to 100000</option>
                                <option value="200000">Up to 200000</option>
                                <option value="300000">Up to 300000</option>
                                <option value="400000">Up to 400000</option>
                            </select>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="numberOfBedrooms">Bedrooms</label>
                            <select className="form-select" ref={bedroomsRef} data-cy="property-bedroom-filter">
                                <option value="0">Any</option>
                                <option value="1">Minimum 1</option>
                                <option value="2">Minimum 2</option>
                                <option value="3">Minimum 3</option>
                                <option value="4">Minimum 4</option>
                                <option value="5">Minimum 5</option>
                            </select>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="numberOfBathrooms">Bathrooms</label>
                            <select className="form-select" ref={bathroomsRef} data-cy="property-bathroom-filter">
                                <option value="0">Any</option>
                                <option value="1">Minimum 1</option>
                                <option value="2">Minimum 2</option>
                                <option value="3">Minimum 3</option>
                            </select>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="numberOfGardens">Garden</label>
                            <select className="form-select" ref={gardenRef} data-cy="property-garden-filter">
                                <option value="0">Any</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="button" className="btn btn-warning" onClick={() => doClear()}>
                            <i className="bi bi-arrow-left-circle"></i>&nbsp;Clear
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-primary" onClick={() => doSearch()} data-cy="find-property">
                            <i className="bi bi-search"></i>&nbsp;Find Properties
                        </button>
                    </div>
            </form>
       </>
    )
}