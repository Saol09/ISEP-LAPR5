import React from 'react';
import '../app.css';
import logo from '../PaginaInicial/Logo_EletricGo.png';
import Sidebar from './Sidebar';

const Home = () => {
	return (
		<body>
			<Sidebar />
			<div className="inicio">
				<img src={logo} width={650} />
			</div>
		</body>
	);
};

export default Home;
