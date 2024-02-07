/* eslint-disable no-undef */
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

describe("tests stubbing", () => {
  it("intercepts the GET", () => {
    cy.intercept("GET", "http://localhost:3001/seller", sellerData.seller).as(
      "getSellerInfo"
    );

    cy.visit("http://localhost:3000/seller");
    cy.wait("@getSellerInfo");

    cy.get("[data-cy=sellerDetails]").should("have.length", "4");
  });
});

describe("tests stubbing from fixture", () => {
  //Tests te GET method
  it("intercepts the GET and replaces it with fixture", () => {
    cy.intercept("GET", "http://localhost:3001/seller", {
      fixture: "seller.json",
    }).as("getSellerInfo");

    cy.visit("http://localhost:3000/seller");
    cy.wait("@getSellerInfo");

    cy.get("[data-cy=sellerDetails]").should("have.length", "4");
  });

  //Tests the POST method
  it("intercepts the POST", () => {
    cy.intercept("GET", "http://localhost:3001/seller", {
      fixture: "seller.json",
    }).as("getSellerInfo");

    cy.visit("http://localhost:3000/seller");
    cy.wait("@getSellerInfo")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);

    // Listen for POST request
    cy.intercept("POST", "http://localhost:3001/seller").as("addSellerInfo");

    //Add the seller
    cy.get("[data-cy=fname]").type("CyFnameStub");
    cy.get("[data-cy=lname]").type("CyLname");
    cy.get("[data-cy=address]").type("Flat, Street, City");
    cy.get("[data-cy=postcode]").type("CyPostcode");
    cy.get("[data-cy=phone]").type("Cy-01234");

    cy.get("[data-cy=addNewSeller]").click();

    //Stubbing
    cy.wait("@addSellerInfo");

    cy.get("[data-cy=sellerDetails]").should("have.length", "5");
  });

  //Tests the PUT method
  // it("intercepts the PUT", () => {
  //   //intercept GET
  //   cy.intercept("GET", "http://localhost:3001/seller/", {
  //     fixture: "seller.json",
  //   }).as("getSellerInfo");

  //   //intercept PUT
  //   cy.intercept("PUT", "http://localhost:3001/seller/**").as("putSellerInfo");

  //   //get stubbed data
  //   cy.visit("http://localhost:3000/seller");
  //   cy.wait("@getSellerInfo");

  //   //Edit seller
  //   cy.get("[data-cy=sellerDetails]")
  //     .contains("John Doe")
  //     .parent()
  //     .find("button")
  //     .contains("Edit Profile")
  //     .click();

  //   //make changes in the field
  //   cy.get("[data-cy=profilefname]").type("Test");
  //   cy.get("[data-cy=profilelname]").type("Test");
  //   cy.get("[data-cy=profileaddress]").type("Test");
  //   cy.get("[data-cy=profilepostcode]").type("Test");
  //   cy.get("[data-cy=profilephone]").type("Test");

  //   //click the Save Changes button
  //   cy.get("[data-cy=saveChangesBtn]").click();

  //   //Stub PUT
  //   cy.wait("@putSellerInfo");
  // });
});
