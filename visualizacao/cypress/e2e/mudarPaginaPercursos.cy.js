describe("Mudar Página Atual", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/percursosExistentes");
  });

  it("Deveria mudar de página", () => {
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#seguinte").click();
    cy.wait(500);
    cy.get("#anterior").click();
    cy.wait(500);
    cy.get("#anterior").click();
    cy.wait(500);
    cy.get("#anterior").click();
    cy.wait(500);
    cy.get("#seguinte").click();
  });
});
