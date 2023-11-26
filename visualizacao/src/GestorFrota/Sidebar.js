import React from 'react';
import '../Sidebar.css';

function Sidebar() {
	return (
		<aside class="sidebar">
			<nav class="nav">
				<ul>
					<li>
						<a href="/gestorFrota">Página Inicial</a>
					</li>
					<li>
						<a href="/adicionarCamiao">Criar Camião</a>
					</li>
					<li>
						<a href="/camioesExistentes">Camiões Existentes</a>
					</li>
					<li>
						<a href="/cancelarConta">Cancelar Conta</a>
					</li>
					<li>
						<a onClick={() => localStorage.removeItem('email')} href="/">
							Sair
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
