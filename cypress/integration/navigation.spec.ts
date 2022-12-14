describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
      cy.get("#sidebar-navigation nav").as("nav");
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("@nav").contains("Issues").click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      cy.get("@nav").contains("Projects").click();
      cy.url().should("eq", "http://localhost:3000/dashboard");

      cy.get("@nav").contains("Alerts").click();
      cy.url().should("eq", "http://localhost:3000/dashboard/alerts");

      cy.get("@nav").contains("Users").click();
      cy.url().should("eq", "http://localhost:3000/dashboard/users");

      cy.get("@nav").contains("Settings").click();
      cy.url().should("eq", "http://localhost:3000/dashboard/settings");
    });

    it("opens user email app by clicking the support button", () => {
      // check that support button opens the user’s mail app
      cy.get("@nav")
        .contains("Support")
        .should(
          "have.attr",
          "href",
          "mailto:support@prolog-app.com?subject=Support Request: "
        );
    });

    it("checks that large logo is displayed in desktop resolution with nav not collapsed", () => {
      cy.get("header")
        .find("img")
        .should("have.attr", "src", "/icons/logo-large.svg");
    });

    it("is collapsible", () => {
      // collapse navigation
      cy.get("@nav").contains("Collapse").click();

      // check that links still exist and are functionable
      cy.get("@nav").find("a").should("have.length", 6).eq(1).click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get("@nav").contains("Issues").should("not.exist");

      //check that small logo is displayed in desktop resolution with nav collapsed
      cy.get("header")
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
      cy.get("#sidebar-navigation nav").as("nav");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("@nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("@nav");

      // check that all links are rendered
      cy.get("@nav").find("a").should("have.length", 6);

      // Support button should be rendered but Collapse button not
      cy.get("@nav").contains("Support").should("exist");
      cy.get("@nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("@nav");
    });

    it("checks that large logo is displayed in mobile resolution", () => {
      cy.get("header")
        .find("img")
        .should("have.attr", "src", "/icons/logo-large.svg");
    });
  });
});
