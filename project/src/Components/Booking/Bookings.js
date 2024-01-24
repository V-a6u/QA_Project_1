import { useEffect, useState } from "react";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/booking`)
      .then((response) => response.json())
      .then((record) => setBookings(record))
      .then(setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/buyer/`)
      .then((response) => response.json())
      .then((record) => setBuyers(record))
      .then(setLoading(false));
  }, []);

  console.log(buyers);

  return (
    <>
      {loading && <p>Loading.....</p>}

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
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
