describe('Visualizar Camiões Ativos', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3001/camioesExistentes');
	});

	it('Deveria filtrar por camiões ativos', () => {
		cy.wait(1500);
		cy.get('#filtragem').click();
	});
});
