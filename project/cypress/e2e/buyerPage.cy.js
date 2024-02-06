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
        cy.get("@BuyerDetails").contains("Address: Flat, Street, City CyPostcode").should("be.visible");
        cy.get("@BuyerDetails").contains("Phone: Cy-01234").should("be.visible");
    });

    it("edits the buyer profile", () => {

    });

    it("manages buyer properties", () => {

    });

    it("deletes the buyer", () => {
        cy.get("@BuyerDetails").contains("CyFname CyLname").parent().find("button").contains("Delete").click();

        //confirm the buyer row no longer exists
        cy.get("@BuyerDetails").contains("CyFname CyLname").should("be.visible");
    });
});