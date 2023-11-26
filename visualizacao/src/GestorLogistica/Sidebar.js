import React from 'react';
import '../Sidebar.css';

function Sidebar() {
	return (
		<aside class="sidebar">
			<nav class="nav">
				<ul>
					<li>
						<a href="/gestorLogistica">Página Inicial</a>
					</li>
					<li>
						<a href="/adicionarPercurso">Criar Percurso</a>
					</li>
					<li>
						<a href="/percursosExistentes">Percursos Existentes</a>
					</li>
					<li>
						<a href="/planearRota">Planeamento da Rota</a>
					</li>
					<li>
						<a href="/listarViagens">Viagens Existentes</a>
					</li>
					<li>
						<a href="http://192.168.1.71:5500/sim/simulacao.html">Rede Viária</a>
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
