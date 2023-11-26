describe("Mudar Página Atual", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/listarViagens");
  });

  it("Deveria mudar de página", () => {
    cy.wait(500);
    cy.get("#seguinte").click();


  });
});
