import './CriarUser.css';
import '../app.css';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import { BsChevronDown as ChevronDown } from 'react-icons/bs';
import user from '../Admin/user.png';

const CriarUser = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [telemovel, setTelemovel] = useState('');
	const [selectedRole, setSelectedRole] = useState('');
	const regexTele = new RegExp(/(^([9]{1})+(6|3|2|1{1})+([0-9]{7}))/);
	const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

	const roles = ['Gestor de Frotas', 'Gestor de Armazens', 'Gestor de Logistica', 'Admin'];

	const [error, setError] = useState('');

	const navigate = useNavigate();

	async function comunicarMDA() {
		console.log('selectedRole: ', selectedRole);
		await fetch('http://localhost:3000/api/auth/signup/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				telemovel: telemovel,
				role: selectedRole,
			}),
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((err) => console.log(err));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			firstName.length === 0 ||
			lastName.length === 0 ||
			email.length === 0 ||
			password.length < 8
		) {
			setError(true);
		} else {
			comunicarMDA();
			navigate('/admin');
		}
	};

	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="user-form" onSubmit={handleSubmit}>
						<div className="linha">
							<div className="imagem-geral">
								<img className="user" alt="imagem-user" src={user} width={60} />
							</div>
							<div className="texto">
								<span className="user-titulo">Criar User</span>
							</div>
						</div>
						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={firstName !== '' ? 'has-val input' : 'input'}
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Primeiro Nome"></span>
								</div>
								{error && firstName.length === 0 ? <label>Primeiro nome inválido.</label> : ''}
							</div>
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={lastName !== '' ? 'has-val input' : 'input'}
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Apelido"></span>
								</div>
								{error && lastName.length === 0 ? <label>Apelido invalido.</label> : ''}
							</div>
						</div>
						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={email !== '' ? 'has-val input' : 'input'}
										type="text"
										value={email}
										onChange={(e) => setEmail(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Email"></span>
								</div>
								{error && email.length === 0 ? <label>Email inválido.</label> : ''}
							</div>
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={password !== '' ? 'has-val input' : 'input'}
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Password"></span>
								</div>
								{error && !password.match(regexPassword) ? (
									<label>Password inválida.</label>
								) : (
									''
								)}
							</div>
						</div>
						<div className="linha-input">
							<div className="geral-input">
								<input
									className={telemovel !== '' ? 'has-val input' : 'input'}
									type="number"
									value={telemovel}
									onChange={(e) => setTelemovel(e.target.value)}></input>
								<span className="input-focus" data-placeholder="Telemovel"></span>
							</div>
							{error && !telemovel.match(regexTele) ? <label>Telemovel inválido.</label> : ''}
							<div className="inputEValidacao">
								<div className="dropdown">
									<div className="dropdown-btn" onClick={() => setIsActive((state) => !state)}>
										{selectedRole}{' '}
										<ChevronDown className={!isActive ? 'arrow-down' : 'arrow-down rotate'} />
									</div>
									{isActive && (
										<div className="dropdown-content">
											{roles.map((role) => (
												<div
													className="dropdown-item"
													onClick={() => {
														setSelectedRole(role);
														setIsActive(false);
													}}>
													{role}
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>

						<li className="btn-div">
							<button className="btn-fancy">Criar</button>
						</li>
					</form>
				</div>
			</div>
		</body>
	);
};

export default CriarUser;
