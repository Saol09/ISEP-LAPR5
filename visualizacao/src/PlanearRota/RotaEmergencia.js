import Sidebar from '../GestorLogistica/Sidebar';
import React from 'react';
import '../app.css';
import { useState, useRef } from 'react';
import planear from './planear.png';

const RotaEmergencia = () => {
	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="planear-form">
						<div className="linha">
							<div className="imagem-geral">
								<img className="planear" alt="foto-planear" src={planear} width={40} />
							</div>
							<div className="texto">
								<span className="titulo">Rota de Emergencia</span>
							</div>
						</div>

						<div className="tabela">
							<table>
								<tbody>
									<tr>Matosinhos</tr>
									<tr>Maia</tr>
									<tr>Porto</tr>
									<tr>Vila Nova de Gaia</tr>
									<tr>Matosinhos</tr>
								</tbody>
							</table>
						</div>

						<div className="linha-tempo">
							<div className="texto">
								<span className="subtitulo">3</span>
							</div>
							<div className="texto">
								<span className="subtitulo">Horas</span>
							</div>
							<div className="texto">
								<span className="subtitulo">41</span>
							</div>
							<div className="texto">
								<span className="subtitulo">Minutos</span>
							</div>
							<div className="texto">
								<span className="subtitulo">47</span>
							</div>
							<div className="texto">
								<span className="subtitulo">Segundos</span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</body>
	);
};

export default RotaEmergencia;
