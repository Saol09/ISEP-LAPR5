import React from 'react';
import './Sidebar.css';

function Sidebar() {
	return (
		<aside class="sidebar">
			<nav class="nav">
				<ul>
					<li>
						<a href="/gestorArmazem">Página Inicial</a>
					</li>
					<li>
						<a href="/adicionarArmazem">Criar Armazem</a>
					</li>
					<li>
						<a href="/listarArmazens">Armazens Existentes</a>
					</li>

					<li>
						<a href="/adicionarEntrega">Criar Entrega</a>
					</li>
					<li>
						<a href="/listarEntrega">Entregas Existentes</a>
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
