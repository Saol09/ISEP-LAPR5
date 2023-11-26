import '../app.css';
import Sidebar from '../Admin/Sidebar';
import React, { useEffect, useState } from 'react';
import user from '../Admin/user.png';

const CancelarUserLista = () => {
	useEffect(() => {
		getUsersExistentes();
	}, []);

	const [usersExistentes, setUsersExistentes] = useState([]);

	const getUsersExistentes = async () => {
		const usersSistema = await fetch('http://localhost:3000/api/auth/listUsers');
		const users = await usersSistema.json();
		setUsersExistentes(users);
	};

	const anonimizarUser = async (user) => {
		await fetch('http://localhost:3000/api/auth/cancelarUser', {
			method: 'PATCH',
			body: JSON.stringify({
				email: user.email,
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
		getUsersExistentes();
	};

	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="user-form">
						<div className="linha">
							<div className="imagem-geral">
								<img className="user" alt="imagem-user" src={user} width={60} />
							</div>
							<div className="texto">
								<span className="titulo">Utilizadores Existentes</span>
							</div>
						</div>
						<div className="tabela">
							<table>
								<thead>
									<tr>
										<th>Primeiro Nome</th>
										<th>Último Nome</th>
										<th>Email</th>
										<th>Cargo</th>
										<th>Telemovel</th>
									</tr>
								</thead>

								<tbody>
									{usersExistentes.map(function (user) {
										return (
											<tr>
												<td> {user.firstName} </td>
												<td> {user.lastName} </td>
												<td> {user.email} </td>
												<td> {user.role} </td>
												<td> {user.telemovel} </td>

												<td>
													{' '}
													{user.telemovel !== '999999999' ? (
														<button
															className="btn-fancy"
															onClick={async (e) => {
																e.preventDefault();
																await anonimizarUser(user);
															}}>
															Cancelar Conta
														</button>
													) : (
														'Conta cancelada'
													)}{' '}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</form>
				</div>
			</div>
		</body>
	);
};

export default CancelarUserLista;
