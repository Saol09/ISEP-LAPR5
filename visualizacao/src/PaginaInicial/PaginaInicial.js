import { useState } from 'react';
import React from 'react';
import './PaginaInicial.css';
import GoogleLogin from 'react-google-login';

import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import logo from './Logo_EletricGo.png';
import { json, useNavigate } from 'react-router-dom';

const client_Id = '125985875719-fofpttmj1bvfpdk5huhsb9nri01m6rta.apps.googleusercontent.com';

const PaginaInicial = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [user, setUser] = useState([]);

	useEffect(() => {
		getUserByEmail();
	}, []);

	const onFailure = (response) => {
		console.log('Failure');
		console.log(response);
	};

	const onSuccess = (response) => {
		console.log('success');
		console.log(response.profileObj.email);
		getUserByEmail(response);
	};

	const getUserByEmail = async (response) => {
		const userTemp = await fetch(
			'http://localhost:3000/api/auth/email/' + response.profileObj.email
		);
		const user = await userTemp.json();
		setUser(user);
		navigateRole(user.role);
		console.log(user.role);
	};

	async function handleLogin() {
		await fetch('http://localhost:3000/api/auth/signin/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(navigateRole(json.userDTO.role));
				localStorage.setItem('email', email);
			})
			.catch((err) => {
				console.log(err);
				alert('Falha no Login');
			});
	}

	const navigateRole = async (userRole) => {
		switch (userRole) {
			case 'Gestor de Logistica':
				navigate('/gestorLogistica');
				break;
			case 'Gestor de Armazens':
				navigate('/gestorArmazem');
				break;
			case 'Gestor de Frotas':
				navigate('/gestorFrota');
				break;
			case 'Admin':
				navigate('/admin');
				break;
			default:
				break;
		}
	};

	return (
		<div className="paginaInicial">
			<div className="logo">
				<center>
					<img className="logoEletricGo" src={logo} alt="centered image" width={500} />
				</center>
			</div>
			<div className="login">
				<div className="login-info">
					<form className="login-form" onSubmit={handleLogin}>
						<span className="login-titulo">Bem-Vindo!</span>
						<div className="login-input">
							<input
								className={email !== '' ? 'has-val input' : 'input'}
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}></input>
							<span className="input-focus" data-placeholder="Email"></span>
						</div>
						<div className="login-input">
							<input
								className={password !== '' ? 'has-val input' : 'input'}
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}></input>
							<span className="input-focus" data-placeholder="Password"></span>
						</div>
						<div className="login-btn">
							<input
								onClick={() => handleLogin()}
								className="btn-login"
								type="button"
								value="Login"
							/>
						</div>
						<div className="google-btn">
							<div>
								<GoogleLogin
									clientId="125985875719-fofpttmj1bvfpdk5huhsb9nri01m6rta.apps.googleusercontent.com"
									buttonText="Login With Google Account"
									onSuccess={onSuccess}
									onFailure={onFailure}
									cookiePolicy={'single_host_origin'}
								/>
							</div>
						</div>
						<div>
							<p className="termos-condicoes">
								<a href={'/termoscondicoes'}>Termos e Condições</a>
							</p>
						</div>
					</form>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default PaginaInicial;
