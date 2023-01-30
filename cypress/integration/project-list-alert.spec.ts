describe("project list alert", () => {
  beforeEach(() => {
    //setup a mock request
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      statusCode: 404,
    }).as("getProjects");
    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  context("it should display the alert message", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
      cy.wait(9000);
    });

    it("test that the alert message appears", () => {
      cy.get("#alertContainer").should("exist");
      cy.get("#alertContainer").contains(
        "There was a problem while loading the project data"
      );
      cy.get("#alertContainer").contains("Try again");
    });

    it("should refect when the button try again is clicked", () => {
      cy.get("#alertContainer").contains("Try again").click();
      cy.wait("@getProjects").then((xhr) => {
        // Check the properties of the XHR object to make sure the request was made as expected
        expect(xhr.response?.statusCode).to.equal(404);
        expect(xhr.request.method).to.equal("GET");
        expect(xhr.request.url).to.equal(
          "https://prolog-api.profy.dev/project"
        );
      });
    });
  });
});
