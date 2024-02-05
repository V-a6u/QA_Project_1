deescribe("tests stubbing", () => {
    it("intercepts the GET", () => {
        cy.intercept("GET", "http://localhost:3000/seller", { fixture: "seller.json" }).as("getSellerInfo");
        cy.wait("@getSellerInfo");
    });
});