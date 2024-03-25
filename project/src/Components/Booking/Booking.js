import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import "./Booking.css";
import Calendar from "react-calendar";
import Alert from "react-bootstrap/Alert";

export default function Booking() {
  const { propertyId } = useParams();
  const timeRef = useRef();
  const buyersRef = useRef();

  let [propertyRecord, setPropertyRecord] = useState();
  const [sellerDetails, setSellerDetails] = useState();
  const [buyers, setBuyers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/property/${propertyId}`)
      .then((response) => response.json())
      .then((record) => setPropertyRecord(record))
      .then(setLoading(false));
  }, [propertyId]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/booking?propertyId=${propertyId}`)
      .then((response) => response.json())
      .then((record) => setBookings(record))
      .then(setLoading(false));
  }, [propertyId]);

  useEffect(() => {
    setLoading(true);
    if (propertyRecord) {
      fetch(`http://localhost:3001/seller/${propertyRecord.sellerId}`)
        .then((response) => response.json())
        .then((record) => setSellerDetails(record))
        .then(setLoading(false));
    }
  }, [propertyRecord]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/buyer`)
      .then((response) => response.json())
      .then((record) => setBuyers(record))
      .then(setLoading(false));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const fetchBookings = () => {
    fetch(`http://localhost:3001/booking?propertyId=${propertyId}`)
      .then((response) => response.json())
      .then((record) => setBookings(record));
  };
  const handleAddBooking = () => {
    const booking = {
      buyerId: buyersRef.current.value,
      propertyId,
      time: timeRef.current.value,
      date: dateValue,
      propertyImage: propertyRecord.imageUrl,
    };

    const bookingValidation = bookings.filter(
      (x) =>
        x.time === booking.time &&
        x.date === new Date(booking.date).toISOString()
    );

    if (bookingValidation.length > 0) {
      setShow(false);
      setShowDangerAlert(true);
      setDateValue(new Date());
      return;
    }

    fetch("http://localhost:3001/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then(() => {
        setShow(false);
      })
      .then(() => {
        setShowAlert(true);
        fetchBookings();
      });
  };
  return (
    <>
      {showAlert && (
        <Alert className="m-4" key="success" variant="success" dismissible>
          New booking added
        </Alert>
      )}
      {showDangerAlert && (
        <Alert className="m-4" key="danger" variant="danger" dismissible>
          The time slot is not available. Please try again.
        </Alert>
      )}
      {loading && <p>Loading.....</p>}
      <h1 className="m-4">Book viewing slots</h1>
      <div className="text-end m-">
        <button className="btn btn-info btn-sm float-end" onClick={handleShow}>
          <i className="bi bi-house-add" />
          &nbsp;Add New Booking
        </button>
      </div>
      <br />
      <br />
      <br />

      <ul className={"custom-list"}>
        {bookings.map((booking) => (
          <>
            <li key={booking.id}>
              <img
                src={booking.propertyImage}
                alt={booking.id}
                className="bookingImg"
              />{" "}
              <div className="detailsBlock">
                <div>
                  <span>
                    Buyer:{" "}
                    {buyers
                      .filter((buyer) => buyer.id === booking.buyerId)
                      .map((buyerDetails) => (
                        <span>
                          {buyerDetails.firstName + " " + buyerDetails.surname}
                        </span>
                      ))}
                  </span>{" "}
                  <br />
                  <span>Time: {booking.time}</span> <br />
                  <span>
                    Date:{" "}
                    {new Date(booking.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </span>{" "}
                  <br />
                  {/* Reference:&nbsp;{booking.id} */}
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>

      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Add Booking</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form className={"bg-light text-dark"}>
              <div className="form-group col ">
                <label>Seller Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={"sellerDetails"}
                  disabled
                  defaultValue={
                    sellerDetails.firstName + " " + sellerDetails.surname
                  }
                />
              </div>
              <div className="form-group col mt-4">
                <label htmlFor="buyersList">Buyers</label>
                <select className="form-select" ref={buyersRef}>
                  {buyers.map((buyer) => (
                    <option value={buyer.id} key={buyer.id}>
                      {buyer.firstName + " " + buyer.surname}
                    </option>
                  ))}
                </select>
              </div>
              <FormGroup className="mt-4">
                <label htmlFor="bookingDate">Select Date</label>
                <Calendar onChange={setDateValue} value={dateValue} />
              </FormGroup>

              <div className="form-group col mt-4 mb-4">
                <label htmlFor="timeSlot">Select Time</label>
                <select className="form-select" ref={timeRef}>
                  <option value="9am-10am">9am-10am</option>
                  <option value="10am-11am">10am-11am</option>
                  <option value="11am-12pm">11am-12pm</option>
                  <option value="12pm-1pm">12pm-1pm</option>
                  <option value="1pm-2pm">1pm-2pm</option>
                  <option value="2pm-3pm">2pm-3pm</option>
                  <option value="3pm-4pm">3pm-4pm</option>
                  <option value="4pm-5pm">4pm-5pm</option>
                </select>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleAddBooking()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
