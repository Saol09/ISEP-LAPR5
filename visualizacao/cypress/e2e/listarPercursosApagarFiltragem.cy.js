describe("Visualizar Percursos Filtrados", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/percursosExistentes");
  });

  it("Deveria filtrar por armazem de chegada", () => {
    cy.get("#armCheg").type("005");
    cy.get("#filtragem").click();
    cy.get("#apagar").click();
  });
});
