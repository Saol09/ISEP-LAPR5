import '../app.css';
import React, { useEffect, useState } from 'react';
import user from '../Admin/user.png';
import { useNavigate } from 'react-router-dom';

const CancelarConta = () => {
	const anonimizarUser = async () => {
		const emailUser = localStorage.getItem('email');
		console.log(emailUser + 'user atual');
		await fetch('http://localhost:3000/api/auth/cancelarUser', {
			method: 'PATCH',
			body: JSON.stringify({
				email: emailUser,
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	};

	const navigate = useNavigate();

	return (
		<body>
			<div className="inicio-cancelarConta">
				<div className="info">
					<form className="user-form">
						<div className="linha-cancelar-conta">
							<div className="imagem-geral">
								<img className="user" alt="imagem-user" src={user} width={60} />
							</div>
							<div className="texto">
								<span className="titulo">Tem a certeza que deseja cancelar a sua conta?</span>
							</div>
						</div>
						<div className="linha-botoes-cancelar">
							<button
								className="btn-fancy-cancelar"
								onClick={async (e) => {
									e.preventDefault();
									anonimizarUser();
									navigate('/');
									localStorage.clear();
								}}>
								Sim
							</button>
							<button
								className="btn-fancy-cancelar"
								onClick={async (e) => {
									e.preventDefault();
									navigate(-1);
								}}>
								Não
							</button>
						</div>
					</form>
				</div>
			</div>
		</body>
	);
};

export default CancelarConta;
