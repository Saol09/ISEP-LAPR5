import '../app.css';
import { useState } from 'react';
import React from 'react';
import logoCamiao from './camiao.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../GestorFrota/Sidebar';

const CriarCamiao = () => {
	const [designacao, setDesignacao] = useState('');
	const [tara, setTara] = useState('');
	const [capacidadeCarga, setCapacidadeCarga] = useState('');
	const [tempoCarregamentoRapido, setTempoCarregamentoRapido] = useState('');
	const [cargaMaximaBaterias, setCargaMaximaBaterias] = useState('');
	const [autonomia, setAutonomia] = useState('');
	const [matricula, setMatricula] = useState('');
	const [error, setError] = useState('');
	const regexMat = new RegExp(
		/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/
	);
	const regexDes = new RegExp(/(eTruck[0-9]{2})/);

	const navigate = useNavigate();

	async function comunicarMDL() {
		await fetch('http://localhost:3000/api/camiao/adicionar', {
			method: 'POST',
			body: JSON.stringify({
				designacao: designacao,
				tara: tara,
				capacidadeCarga: capacidadeCarga,
				tempoCarregamentoRapido: tempoCarregamentoRapido,
				cargaMaximaBaterias: cargaMaximaBaterias,
				autonomia: autonomia,
				matricula: matricula,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			designacao.length !== 8 ||
			!designacao.match(regexDes) ||
			tara < 0 ||
			tara.length === 0 ||
			capacidadeCarga < 0 ||
			capacidadeCarga.length === 0 ||
			tempoCarregamentoRapido < 0 ||
			tempoCarregamentoRapido.length === 0 ||
			cargaMaximaBaterias < 0 ||
			cargaMaximaBaterias.length === 0 ||
			autonomia < 0 ||
			autonomia.length === 0 ||
			matricula.length !== 8 ||
			!matricula.match(regexMat)
		) {
			setError(true);
			console.log('1');
		} else {
			console.log('2');
			comunicarMDL();
			navigate('/gestorFrota');
		}
	};

	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="camiao-form" onSubmit={handleSubmit}>
						<div className="linha">
							<div className="imagem-geral">
								<img className="camiao" alt="imagem camiao" src={logoCamiao} width={60} />
							</div>
							<div className="texto">
								<span className="titulo">Adicionar Camião</span>
							</div>
						</div>
						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={matricula !== '' ? 'has-val input' : 'input'}
										type="string"
										value={matricula}
										onChange={(e) => setMatricula(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Matrícula"></span>
								</div>
								{error && (matricula.length !== 8 || !matricula.match(regexMat)) ? (
									<label className="geral-validacao">Matrícula inválida</label>
								) : (
									''
								)}
							</div>
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={capacidadeCarga !== '' ? 'has-val input' : 'input'}
										type="number"
										value={capacidadeCarga}
										onChange={(e) => setCapacidadeCarga(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Capacidade de Carga"></span>
								</div>
								{error && (capacidadeCarga < 0 || capacidadeCarga.length === 0) ? (
									<label className="geral-validacao">Capacidade de Carga inválida</label>
								) : (
									''
								)}
							</div>
						</div>
						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={tempoCarregamentoRapido !== '' ? 'has-val input' : 'input'}
										type="number"
										value={tempoCarregamentoRapido}
										onChange={(e) => setTempoCarregamentoRapido(e.target.value)}></input>
									<span
										className="input-focus"
										data-placeholder="Tempo de Carregamento Rápido"></span>
								</div>
								{error &&
								(tempoCarregamentoRapido < 0 || tempoCarregamentoRapido.length === 0) ? (
									<label className="geral-validacao">
										Tempo de Carregamento Rápido inválida
									</label>
								) : (
									''
								)}
							</div>
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={cargaMaximaBaterias !== '' ? 'has-val input' : 'input'}
										type="number"
										value={cargaMaximaBaterias}
										onChange={(e) => setCargaMaximaBaterias(e.target.value)}></input>
									<span
										className="input-focus"
										data-placeholder="Carga Máxima Baterias"></span>
								</div>
								{error && (cargaMaximaBaterias < 0 || cargaMaximaBaterias.length === 0) ? (
									<label className="geral-validacao">Carga Máxima das Baterias inválida</label>
								) : (
									''
								)}
							</div>
						</div>
						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={autonomia !== '' ? 'has-val input' : 'input'}
										type="number"
										value={autonomia}
										onChange={(e) => setAutonomia(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Autonomia"></span>
								</div>
								{error && (autonomia < 0 || autonomia.length === 0) ? (
									<label className="geral-validacao">Autonomia inválida</label>
								) : (
									''
								)}
							</div>
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={tara !== '' ? 'has-val input' : 'input'}
										type="number"
										value={tara}
										onChange={(e) => setTara(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Tara"></span>
								</div>
								{error && (tara < 0 || tara.length === 0) ? (
									<label className="geral-validacao">Tara inválida</label>
								) : (
									''
								)}
							</div>
						</div>
						<div className="linha-input-single">
							<div className="inputEValidacao">
								<div className="geral-input">
									<input
										className={designacao !== '' ? 'has-val input' : 'input'}
										type="string"
										value={designacao}
										onChange={(e) => setDesignacao(e.target.value)}></input>
									<span className="input-focus" data-placeholder="Designação"></span>
								</div>
								{error && (designacao.length !== 8 || !designacao.match(regexDes)) ? (
									<label className="geral-validacao">Designação inválida</label>
								) : (
									''
								)}
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

export default CriarCamiao;
