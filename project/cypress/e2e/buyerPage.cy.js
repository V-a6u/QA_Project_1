describe("Add a new buyer", () => {
  beforeEach("Visit the buyer page", () => {
    cy.visit("http://localhost:3000/buyer");

    //Aliases
    cy.get("[data-cy=buyerDetails]").as("BuyerDetails");
  });

  it("adds a buyer", () => {
    //Add the buyer
    cy.get("[data-cy=fname]").type("CyFname");
    cy.get("[data-cy=lname]").type("CyLname");
    cy.get("[data-cy=address]").type("Flat, Street, City");
    cy.get("[data-cy=postcode]").type("CyPostcode");
    cy.get("[data-cy=phone]").type("Cy-01234");

    cy.get("[data-cy=addNewBuyer]").as("AddNewBuyerBtn");
    cy.get("@AddNewBuyerBtn").click();

    //Check if the buyer has been added
    cy.get("@BuyerDetails").contains("CyFname CyLname").should("be.visible");
    cy.get("@BuyerDetails")
      .contains("Address: Flat, Street, City CyPostcode")
      .should("be.visible");
    cy.get("@BuyerDetails").contains("Phone: Cy-01234").should("be.visible");
  });

  it("edits the buyer profile", () => {
    //get the edit button
    cy.get("@BuyerDetails")
      .contains("CyFname CyLname")
      .parent()
      .find("button")
      .contains("Edit Profile")
      .click();

    //make changes in the field
    cy.get("[data-cy=profilefname]").type("Test");
    cy.get("[data-cy=profilelname]").type("Test");
    cy.get("[data-cy=profileaddress]").type("Test");
    cy.get("[data-cy=profilepostcode]").type("Test");
    cy.get("[data-cy=profilephone]").type("Test");

    //click the Save Changes button
    cy.get("[data-cy=saveChangesBtn]").click();

    //check the values have been changed
    cy.get("@BuyerDetails")
      .contains("CyFnameTest CyLnameTest")
      .should("be.visible");
    cy.get("@BuyerDetails")
      .contains("Address: Flat, Street, CityTest CyPostcodeTest")
      .should("be.visible");
    cy.get("@BuyerDetails")
      .contains("Phone: Cy-01234Test")
      .should("be.visible");
  });

  it("book a property", () => {
    cy.get("@BuyerDetails")
      .contains("CyFnameTest CyLnameTest")
      .parent()
      .find("[data-cy=bookPropertyBtn]")
      .click();

    cy.url().should("eq", "http://localhost:3000/property");
  });

  it("deletes the buyer", () => {
    cy.get("@BuyerDetails")
      .contains("CyFnameTest CyLnameTest")
      .parent()
      .find("button")
      .contains("Delete")
      .click();

    //confirm the buyer row no longer exists
    cy.get("@BuyerDetails")
      .contains("CyFnameTest CyLnameTest")
      .should("not.exist");
  });
});
