import '../app.css';
import Sidebar from '../GestorFrota/Sidebar';
import React, { useEffect, useState } from 'react';
import camiao from '../CriarCamiao/camiao.png';

const ListarCamioes = () => {
	useEffect(() => {
		getCamioesExistentes();
		getCamioesAtivos();
		inibirCamiao(camiao);
	}, []);

	const [camioesExistentes, setCamioesExistentes] = useState([]);

	const getCamioesAtivos = async () => {
		const camioesSistema = await fetch('http://localhost:3000/api/camiao/camioesAtivos');
		const camioes = await camioesSistema.json();
		setCamioesExistentes(camioes);
	};

	const getCamioesExistentes = async () => {
		const camioesSistema = await fetch('http://localhost:3000/api/camiao/camioesExistentes');
		const camioes = await camioesSistema.json();
		setCamioesExistentes(camioes);
	};

	const inibirCamiao = async (camiao) => {
		await fetch('http://localhost:3000/api/camiao/editar', {
			method: 'PUT',
			body: JSON.stringify({
				designacao: camiao.designacao,
				tara: camiao.tara,
				capacidadeCarga: camiao.capacidadeCarga,
				tempoCarregamentoRapido: camiao.tempoCarregamentoRapido,
				cargaMaximaBaterias: camiao.cargaMaximaBaterias,
				autonomia: camiao.autonomia,
				matricula: camiao.matricula,
				ativo: false,
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
		getCamioesExistentes();
	};

	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<div className="info">
					<form className="camiao-form">
						<div className="linha">
							<div className="imagem-geral">
								<img className="camiao" alt="imagem-camiao" src={camiao} width={60} />
							</div>
							<div className="texto">
								<span className="titulo">Camiões Existentes</span>
							</div>
						</div>
						<div className="botoes">
							<li className="btn-listar">
								<button
									id="filtragem"
									className="btn-fancy"
									onClick={async (e) => {
										e.preventDefault();
										await getCamioesAtivos();
									}}>
									Visualizar apenas Camiões Ativos
								</button>
							</li>
							<li className="btn-listar">
								<button
									id="filtragem-todos"
									className="btn-fancy"
									onClick={async (e) => {
										e.preventDefault();
										await getCamioesExistentes();
									}}>
									Visualizar todos os camiões
								</button>
							</li>
						</div>

						<div className="tabela">
							<table>
								<thead>
									<tr>
										<th>Matricula</th>
										<th>Designação</th>
										<th>Tara</th>
										<th>Capacidade de carga</th>
										<th>Tempo de Carregamento Rápido</th>
										<th>Carga Máxima das Baterias</th>
										<th>Autonomia</th>
										<th></th>
									</tr>
								</thead>

								<tbody>
									{camioesExistentes.map(function (camiao) {
										return (
											<tr>
												<td> {camiao.matricula} </td>
												<td> {camiao.designacao} </td>
												<td> {camiao.tara} </td>
												<td> {camiao.capacidadeCarga} </td>
												<td> {camiao.tempoCarregamentoRapido} </td>
												<td> {camiao.cargaMaximaBaterias} </td>
												<td> {camiao.autonomia} </td>

												<td>
													{' '}
													{camiao.ativo ? (
														<button
															className="btn-fancy"
															onClick={async (e) => {
																e.preventDefault();
																await inibirCamiao(camiao);
															}}>
															Inibir
														</button>
													) : (
														'Inibido'
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

export default ListarCamioes;
