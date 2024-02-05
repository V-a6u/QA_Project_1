//add a new seller
describe("Add a new seller", () => {
    beforeEach("Visit the properties page", () => {
        cy.visit("http://localhost:3000/seller");

        //Aliases for filter categories
        cy.get("[data-cy=addNewSeller]").as("AddNewSellerBtn")
        cy.get("[data-cy=sellerDetails]").as("SellerDetails");

    });

    it("adds a seller", () => {
        //Add the seller
        cy.get("[data-cy=fname]").type("CyFname");
        cy.get("[data-cy=lname]").type("CyLname");
        cy.get("[data-cy=address]").type("Flat, Street, City");
        cy.get("[data-cy=postcode]").type("CyPostcode");
        cy.get("[data-cy=phone]").type("Cy-01234");

        cy.get("@AddNewSellerBtn").click();

        //Check if the seller has been added
        cy.get("@SellerDetails").contains("CyFname CyLname").should("be.visible");
        cy.get("@SellerDetails").contains("Address: Flat, Street, City CyPostcode").should("be.visible");
        cy.get("@SellerDetails").contains("Phone: Cy-01234").should("be.visible");
    });

    it("edits the seller profile", () => {

    });

    it("manages seller properties", () => {

    });

    it("deletes the seller", () => {
        cy.get("@SellerDetails").contains("CyFname CyLname").parent().find("button").contains("Delete").click();

        //confirm the seller row no longer exists
        cy.get("@SellerDetails").contains("CyFname CyLname").should("be.visible");
    });
});