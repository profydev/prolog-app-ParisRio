describe("footer navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("checks that footer is correctly displayed", () => {
      cy.get("#footer").should("exist");
    });
    it("checks that there are four links", () => {
      cy.get("#footer nav").find("a").should("have.length", 4);
    });
    it("checks that the version displayed is correct", () => {
      cy.get("#footer div").contains("Version: 14.5.1");
    });
    it("checks that the footer contain the logo", () => {
      cy.get("#footer img").should("have.attr", "src", "/icons/logo-small.svg");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    it("check that mobile footer is displayed with the logo at the last child of footer container", () => {
      cy.get("#footer:last-child").contains("Version");
    });
  });
});
