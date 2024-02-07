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
