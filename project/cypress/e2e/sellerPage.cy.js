/* eslint-disable no-undef */
describe("Check seller page", () => {
  beforeEach("Visit the seller page", () => {
    cy.visit("http://localhost:3000/seller");

    //Aliases for filter categories
    cy.get("[data-cy=sellerDetails]").as("SellerDetails");
  });

  it("adds a seller", () => {
    //Add the seller
    cy.get("[data-cy=fname]").type("CyFname");
    cy.get("[data-cy=lname]").type("CyLname");
    cy.get("[data-cy=address]").type("Flat, Street, City");
    cy.get("[data-cy=postcode]").type("CyPostcode");
    cy.get("[data-cy=phone]").type("Cy-01234");

    cy.get("[data-cy=addNewSeller]").as("AddNewSellerBtn");
    cy.get("@AddNewSellerBtn").click();

    //Check if the seller has been added
    cy.visit("http://localhost:3000/seller");
    cy.get("@SellerDetails").contains("CyFname CyLname").should("be.visible");
    cy.get("@SellerDetails")
      .contains("Address: Flat, Street, City CyPostcode")
      .should("be.visible");
    cy.get("@SellerDetails").contains("Phone: Cy-01234").should("be.visible");
  });

  it("edits the seller profile", () => {
    //get the edit button
    cy.get("@SellerDetails")
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
    cy.get("@SellerDetails")
      .contains("CyFnameTest CyLnameTest")
      .should("be.visible");
    cy.get("@SellerDetails")
      .contains("Address: Flat, Street, CityTest CyPostcodeTest")
      .should("be.visible");
    cy.get("@SellerDetails")
      .contains("Phone: Cy-01234Test")
      .should("be.visible");
  });

  it("manages seller properties", () => {
    cy.get("@SellerDetails")
      .contains("John Doe")
      .parent()
      .find("[data-cy=managePropertyBtn]")
      .click();

    cy.url().should("include", "/seller/1/property");
  });

  it("deletes the seller", () => {
    cy.get("@SellerDetails")
      .contains("CyFnameTest CyLnameTest")
      .parent()
      .find("button")
      .contains("Delete")
      .click();

    //confirm the seller row no longer exists
    cy.get("@SellerDetails")
      .contains("CyFnameTest CyLnameTest")
      .should("not.exist");
  });
});
