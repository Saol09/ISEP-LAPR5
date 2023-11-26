import '../app.css';
import Sidebar from '../GestorLogistica/Sidebar';
import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import planear from './planear.png';

import { BsChevronDown as ChevronDown } from 'react-icons/bs';
const PlanearRota = () => {
	const dataInputRef = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const HEURISTIC_PLACEHOLDER = 'Algoritmo Pretendido';
	const [selectedHeuristic, setSelectedHeuristic] = useState(HEURISTIC_PLACEHOLDER);

	const navigate = useNavigate();

	const obterMelhorViagem = () => {
		if (selectedHeuristic === HEURISTIC_PLACEHOLDER) return;
		if (selectedHeuristic === 'Rota de Emergência') {
			navigate('/rotaEmergencia');
		} else {
			navigate('/planearRota/' + dataInputRef.current.value + '/' + selectedHeuristic);
		}
	};

	const heuristicas = [
		'Melhor Viagem',
		'Menor Distância',
		'Maior Massa',
		'Melhor Relação',
		'Algortimo Genético',
		'Rota de Emergência',
	];

	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="planear-form">
						<div className="linha">
							<div className="imagem-geral">
								<img className="planear" src={planear} width={40} />
							</div>
							<div className="texto">
								<span className="titulo">Planear Rota</span>
							</div>
						</div>

						<div className="linha-input">
							<div className="inputEValidacao">
								<div className="percurso-input">
									<input
										className={
											dataInputRef.current?.value !== '' && dataInputRef.current !== null
												? 'has-val input'
												: 'input'
										}
										type="text"
										ref={dataInputRef}
										placeholder=""
										defaultValue={''}></input>
									<span className="input-focus" data-placeholder="Data"></span>
								</div>
							</div>

							<div className="inputEValidacao">
								<div className="dropdown">
									<div className="dropdown-btn" onClick={() => setIsActive((state) => !state)}>
										{selectedHeuristic}{' '}
										<ChevronDown className={!isActive ? 'arrow-down' : 'arrow-down rotate'} />
									</div>
									{isActive && (
										<div className="dropdown-content">
											{heuristicas.map((heuristica) => (
												<div
													className="dropdown-item"
													onClick={() => {
														setSelectedHeuristic(heuristica);
														setIsActive(false);
													}}>
													{heuristica}
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="btn-div">
							<button className="btn-fancy" onClick={obterMelhorViagem}>
								Obter Planeamento
							</button>
						</div>
					</form>
				</div>
			</div>
		</body>
	);
};

export default PlanearRota;
