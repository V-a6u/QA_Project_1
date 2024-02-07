const sellerData = {
  seller: [
    {
      id: 1,
      firstName: "John",
      surname: "Doe",
      address: "1 High Street, Cardiff",
      postcode: "CF1 1AA",
      phone: "01234567890",
    },
    {
      id: 2,
      firstName: "Anna",
      surname: "Smith",
      address: "2 Main Street, Cardiff",
      postcode: "CF1 1AB",
      phone: "01234567891",
    },
    {
      id: 3,
      firstName: "Peter",
      surname: "Jones",
      address: "3 Low Street, Cardiff",
      postcode: "CF1 1AC",
      phone: "01234567892",
    },
    {
      id: 4,
      firstName: "Karen",
      surname: "Slater",
      address: "4 High Street, Cardiff",
      postcode: "CF1 1AD",
      phone: "01234567893",
    },
  ],
};

const buyerData = {
  buyer: [
    {
      id: 1,
      firstName: "Alice",
      surname: "Johnson",
      address: "42 Pen-y-lan Road, Cardiff",
      postcode: "CA1 8RR",
      phone: "01234567890",
    },
    {
      id: 2,
      firstName: "David",
      surname: "Williams",
      address: "100 Magor Road, Newport",
      postcode: "NP1 2LL",
      phone: "01234567891",
    },
    {
      id: 3,
      firstName: "Sophie",
      surname: "Clark",
      address: "Very Rich Street, London",
      postcode: "W1",
      phone: "01234567892",
    },
    {
      id: 4,
      firstName: "Oliver",
      surname: "Smith",
      address: "24 Meadow Lane, Bristol",
      postcode: "BS1 3AB",
      phone: "01234567893",
    },
  ],
};

const propertyData = {
  property: [
    {
      id: 1,
      address: "34 OK Place, OK Town",
      postcode: "OK1 1OK",
      type: "DETACHED",
      price: 100000,
      bedroom: 3,
      bathroom: 1,
      garden: 0,
      sellerId: 1,
      status: "SOLD",
      buyerId: 3,
      imageUrl:
        "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      address: "22 Maple Street, Maple City",
      postcode: "MC1 1MC",
      type: "SEMI",
      price: 150000,
      bedroom: 4,
      bathroom: 2,
      garden: 1,
      sellerId: 2,
      status: "FOR SALE",
      imageUrl:
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

// describe("tests stubbing", () => {
//   it("intercepts the GET", () => {
//     cy.intercept("GET", "http://localhost:3001/seller", sellerData.seller).as(
//       "getSellerInfo"
//     );

//     cy.visit("http://localhost:3000/seller");
//     cy.wait("@getSellerInfo");

//     cy.get("[data-cy=sellerDetails]").should("have.length", "4");
//   });
// });

describe("tests stubbing from fixture", () => {
  it("intercepts the GET and replaces it with fixture", () => {
    cy.intercept("GET", "http://localhost:3001/seller", {
      fixture: "seller.json",
    }).as("getSellerInfo");

    cy.visit("http://localhost:3000/seller");
    cy.wait("@getSellerInfo");

    cy.get("[data-cy=sellerDetails]").should("have.length", "4");
  });
});
