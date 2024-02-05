//Filter feature on the properties
describe("filter properties", () => {
    beforeEach("Visit the properties page", () => {
        cy.visit("http://localhost:3000/property");

        //Aliases for filter categories
        cy.get("[data-cy=property-type-filter]").as("PropertyTypeFilter");
        cy.get("[data-cy=find-property]").as("FindPropertiesBtn");
        cy.get("[data-cy=property-price-filter]").as("PropertyPriceFilter");
        cy.get("[data-cy=property-bedroom-filter]").as("PropertyBedroomFilter");
        cy.get("[data-cy=property-bathroom-filter]").as("PropertyBathroomFilter")
        cy.get("[data-cy=property-garden-filter]").as("PropertyGardenFilter")
    });

    // it("intercepts the GET", () => {
    //     cy.get("button").contains("Clear").click();
    //     cy.intercept("GET", "http://localhost:3000/property", { fixture: "property.json" }).as("getPropertyInfo");
    //     cy.wait("@getPropertyInfo");
    // });

    //filter based on type of property
    it("property type selected as Detached. Should only display Detached properties", () => {
        cy.get("@PropertyTypeFilter").select("Detached");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-type]").contains("Detached").should("be.visible");
        cy.get("[data-cy=property-type]").wait(1000).contains("Semi").should("not.exist");
        cy.get("[data-cy=property-type]").contains("Apartment").should("not.exist");
    });
    it("property type selected as Semi. Should only display Semi properties", () => {
        cy.get("@PropertyTypeFilter").select("Semi");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-type]").contains("Detached").should("not.exist");
        cy.get("[data-cy=property-type]").contains("Semi").should("be.visible");
        cy.get("[data-cy=property-type]").contains("Apartment").should("not.exist");
    });
    it("property type selected as Apartment. Should only display Apartment properties", () => {
        cy.get("@PropertyTypeFilter").select("Apartment");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-type]").contains("Detached").should("not.exist");
        cy.get("[data-cy=property-type]").contains("Semi").should("not.exist");
        cy.get("[data-cy=property-type]").contains("Apartment").should("be.visible");
    });

    //filter based on property price
    it("property price should be upto 50000", () => {
        cy.get("@PropertyPriceFilter").select("50000");
        cy.get("@FindPropertiesBtn").click();

        /*if(cy.find("div[data-cy=property-price]").length > 0){
            //cy.get("[data-cy=property-price]").contains("50000").should("be.visible");
            cy.get("[data-cy=property-price]").contains("100000").should("not.exist");
            cy.get("[data-cy=property-price]").contains("200000").should("not.exist");
            cy.get("[data-cy=property-price]").contains("300000").should("not.exist");
            cy.get("[data-cy=property-price]").contains("400000").should("not.exist");
        }*/
    });
    it("property price should be upto 100000", () => {
        cy.get("@PropertyPriceFilter").select("100000");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-price]").contains("50000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("100000").should("be.visible");

        //cy.get("[data-cy=property-price]").should('match', /^(1[0-9]{5}|200000)$/);

        cy.get("[data-cy=property-price]").contains("200000").should("not.exist");
        cy.get("[data-cy=property-price]").contains("300000").should("not.exist");
        cy.get("[data-cy=property-price]").contains("400000").should("not.exist");
    });
    it("property price should be upto 200000", () => {
        cy.get("@PropertyPriceFilter").select("200000");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-price]").contains("50000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("100000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("200000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("300000").should("not.exist");
        cy.get("[data-cy=property-price]").contains("400000").should("not.exist");
    });
    it("property price should be upto 300000", () => {
        cy.get("@PropertyPriceFilter").select("300000");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-price]").contains("50000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("100000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("200000").should("be.visible");
        //cy.get("[data-cy=property-price]").contains("300000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("400000").should("not.exist");
    });
    it("property price should be upto 400000", () => {
        cy.get("@PropertyPriceFilter").select("400000");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-price]").contains("50000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("100000").should("be.visible");
        cy.get("[data-cy=property-price]").contains("200000").should("be.visible");
        //cy.get("[data-cy=property-price]").contains("300000").should("be.visible");
        //cy.get("[data-cy=property-price]").contains("400000").should("be.visible");
    });
    

    //filters based on number of bedrooms
    it("Minimum 1 bedroom exists", () => {
        cy.get("@PropertyBedroomFilter").select("Minimum 1");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-bedroom]").contains("1").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("2").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("3").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("4").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");
    });
    it("Minimum 2 bedroom exists", () => {
        cy.get("@PropertyBedroomFilter").select("Minimum 2");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bedroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("2").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("3").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("4").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");
    });
    it("Minimum 3 bedroom exists", () => {
        cy.get("@PropertyBedroomFilter").select("Minimum 3");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bedroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("2").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("3").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("4").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");
    });
    it("Minimum 4 bedroom exists", () => {
        cy.get("@PropertyBedroomFilter").select("Minimum 4");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bedroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("2").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("3").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("4").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");
    });
    it("Minimum 5 bedroom exists", () => {
        cy.get("@PropertyBedroomFilter").select("Minimum 5");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bedroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("2").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("3").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("4").should("not.exist");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");
    });


    //filters based on number of bathrooms
    it("Minimum 1 bathroom exists", () => {
        cy.get("@PropertyBathroomFilter").select("Minimum 1");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bathroom]").contains("1").should("be.visible");
        cy.get("[data-cy=property-bathroom]").contains("2").should("be.visible");
        cy.get("[data-cy=property-bathroom]").contains("3").should("be.visible");
    });
    it("Minimum 2 bathroom exists", () => {
        cy.get("@PropertyBathroomFilter").select("Minimum 2");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bathroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bathroom]").contains("2").should("be.visible");
        cy.get("[data-cy=property-bathroom]").contains("3").should("be.visible");
    });
    it("Minimum 3 bathroom exists", () => {
        cy.get("@PropertyBathroomFilter").select("Minimum 3");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-bathroom]").contains("1").should("not.exist");
        cy.get("[data-cy=property-bathroom]").contains("2").should("not.exist");
        cy.get("[data-cy=property-bathroom]").contains("3").should("be.visible");
    });


    //filters based on existence of garden
    it("Garden exists", () => {
        cy.get("@PropertyGardenFilter").select("Yes");
        cy.get("@FindPropertiesBtn").click();

        cy.get("[data-cy=property-garden]").contains("Yes").should("be.visible");
        cy.get("[data-cy=property-garden]").contains("No").should("not.exist");
    });
    it("Garden exists", () => {
        cy.get("@PropertyGardenFilter").select("No");
        cy.get("@FindPropertiesBtn").click();

        //cy.get("[data-cy=property-garden]").contains("Yes").should("not.exist");
        cy.get("[data-cy=property-garden]").contains("No").should("be.visible");
    });


    it("filters on multiple property conditions", () => {
        cy.get("[data-cy=property-type-filter]").select("Detached");
        cy.get("[data-cy=property-price-filter]").select("200000");
        cy.get("[data-cy=property-bedroom-filter]").select("Minimum 2");
        cy.get("[data-cy=property-bathroom-filter]").select("Minimum 1");
        cy.get("[data-cy=property-garden-filter]").select("Yes");

        cy.get("[data-cy=find-property]").click();

        //check based on different values of the filtred properties
        cy.get("[data-cy=property-type]").contains("Detached").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("4").should("be.visible");
        cy.get("[data-cy=property-bedroom]").contains("5").should("be.visible");

        cy.get("[data-cy=property-bathroom]").contains("2").should("be.visible");
        cy.get("[data-cy=property-bathroom]").contains("3").should("be.visible");

        cy.get("[data-cy=property-garden]").contains("Yes").should("be.visible");
        cy.get("[data-cy=property-garden]").contains("No").should("not.exist");

        //check based on count of properties returned
        cy.get("li").should("have.length", 2);
    });
});