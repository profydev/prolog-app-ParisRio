import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      delay: 2000,
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  context("loading indicator while API request is not resolved", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("test that loading indicator appears", () => {
      cy.get("#loadingIndicator").should("exist");
    });
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      // wait for request to resolve
      cy.wait("@getProjects");
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusNames = ["Critical", "Warning", "Stable"];
      const projectNames = ["Frontend - Web", "Backend", "ML Service"];

      // get all project cards
      cy.get("main")
        .find("#main-container li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(statusNames[index]);
          cy.wrap($el)
            .find("a")
            .should(
              "have.attr",
              "href",
              `/dashboard/issues?project=${encodeURIComponent(
                projectNames[index]
              )}`
            );
        });
    });
  });
});
