import React from 'react';
import './Sidebar.css';

function Sidebar() {
	return (
		<aside class="sidebar">
			<nav class="nav">
				<ul>
					<li>
						<a href="/criarUser">Criar Utilizador</a>
					</li>
					<li>
						<a href="/cancelarUserLista">Cancelar Utilizador</a>
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
