/* eslint-disable no-undef */
//<reference types="cypress" />

//Tests navigation to all pages
describe("navigation", () => {
  it("navigates to the home page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("navigates to the properties page", () => {
    cy.visit("http://localhost:3000/property");
  });

  it("navigates to the seller page", () => {
    cy.visit("http://localhost:3000/seller");
  });

  it("navigates to the buyer page", () => {
    cy.visit("http://localhost:3000/buyer");
  });

  it("navigates to the bookings page", () => {
    cy.visit("http://localhost:3000/bookings");
  });
});

//Checks contents of the home page
// describe("home features", () => {
//     it("", () => {

//     });
// });
