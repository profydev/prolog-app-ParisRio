describe("footer navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });
  });

  it("checks that footer is correctly displayed", () => {
    cy.get("#footer").should("exist");
  });
});
