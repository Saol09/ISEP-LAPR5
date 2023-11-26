import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import PaginaInicial from './PaginaInicial/PaginaInicial';
import CriarPercurso from './CriarPercurso/CriarPercurso';
import CriarCamiao from './CriarCamiao/CriarCamiao';
import CriarArmazem from './CriarArmazem/CriarArmazem';
import CriarEntrega from './CriarEntrega/CriarEntrega';
import ListarPercurso from './ListarPercursos/ListarPercursos';
import PlanearRota from './PlanearRota/PlanearRota';
import ListarArmazens from './ListarArmazem/ListarArmazem';
import ListarEntrega from './ListarEntrega/ListarEntrega';
import ListarViagens from './ListarViagens/ListarViagens';
import TermosCondicoes from './TermosCondicoes/TermosCondicoes';
import HomeGL from './GestorLogistica/HomeGL';
import HomeGF from './GestorFrota/HomeGF';
import HomeGA from './GestorArmazem/HomeGA';
import HomeADMIN from './Admin/HomeADMIN';
import ListarCamioes from './ListarCamioes/ListarCamioes';
import Rota from './PlanearRota/Rota';
import CriarUser from './CriarUser/CriarUser';
import CancelarUserLista from './CancelarUserLista/CancelarUserLista';
import RotaEmergencia from './PlanearRota/RotaEmergencia';
import CancelarConta from './CancelarConta/CancelarConta';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route exact path="/" element={<PaginaInicial />} />
			<Route path="/gestorLogistica" element={<HomeGL />} />
			<Route path="/gestorFrota" element={<HomeGF />} />
			<Route path="/gestorArmazem" element={<HomeGA />} />
			<Route path="/admin" element={<HomeADMIN />} />
			<Route path="/adicionarPercurso" element={<CriarPercurso />} />
			<Route path="/adicionarCamiao" element={<CriarCamiao />} />
			<Route path="/adicionarArmazem" element={<CriarArmazem />} />
			<Route path="/adicionarEntrega" element={<CriarEntrega />} />
			<Route path="/percursosExistentes" element={<ListarPercurso />} />
			<Route path="/camioesExistentes" element={<ListarCamioes />} />
			<Route path="/planearRota" element={<PlanearRota />} />
			<Route path="/listarArmazens" element={<ListarArmazens />} />
			<Route path="/listarEntrega" element={<ListarEntrega />} />
			<Route path="/listarViagens" element={<ListarViagens />} />
			<Route path="/planearRota/:data/:predicado" element={<Rota />} />
			<Route path="/criarUser" element={<CriarUser />} />
			<Route path="/cancelarUserLista" element={<CancelarUserLista />} />
			<Route path="/rotaEmergencia" element={<RotaEmergencia />} />
			<Route path="/cancelarConta" element={<CancelarConta />} />
			<Route path="/termosCondicoes" element={<TermosCondicoes />} />
		</Routes>
	</BrowserRouter>
);
