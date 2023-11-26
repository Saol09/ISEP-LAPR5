import '../app.css';
import './ListarEntrega.css';
import Sidebar from "../GestorArmazem/Sidebar";
import React, { useEffect, useState } from "react";
import logo from "./entrega.png";
import { BsChevronDown as ChevronDown } from "react-icons/bs";

const ListarEntrega = () => {

    const [entregasExistentes, setEntregasExistentes] = useState([]);
    const [tempoCarga, setTempoCarga] = useState("");
    const [tempoDescarga, setTempoDescarga] = useState("");
    const [massaEntrega, setMassaEntrega] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [dataEntregaR, setDataREntrega] = useState("");
    const [idA, setIdA] = useState("");
    const [isActive, setIsActive] = useState(false);

    const getEntregasExistentes = async () => {

        const entregasSistema = await fetch('https://localhost:5001/api/Entrega/');
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
    }

    const getEntregaFiltroCarga = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/cargaAscendente'
        );
        const entregas = await entregasSistema.json();
        console.log("Setting entregasExistentes state variable:", entregas);
        setEntregasExistentes(entregas);
        setTempoCarga(entregas);
    };
    const getEntregaFiltroDescarga = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/descargaAscendente'
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setTempoDescarga(entregas);
    };
    const getEntregaFiltroData = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/dataAscendente'
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setDataEntrega(entregas);
    };
    const getEntregaFiltroDataR = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/dataRecente'
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setDataREntrega(entregas);
    };
    const getEntregaFiltroMassa = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/massaAscendente'
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setMassaEntrega(entregas);
    };

    const getEntregaFiltroArmazem = async () => {
        const entregasSistema = await fetch(
            'https://localhost:5001/api/Entrega/armazemAscendente'
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setIdA(entregas);
    };

    const mostrarEntregasPorData = async (data) => {
        const entregasSistema = await fetch(
            `https://localhost:5001/api/Entrega/${data}/getEntregaData`
        );
        const entregas = await entregasSistema.json();
        setEntregasExistentes(entregas);
        setDataEntrega(entregas);
    };


    const filtrarEntregasPorArmazem = async (armazemID) => {
        if (armazemID) {
            const entregasSistema = await fetch(
                `https://localhost:5001/api/Entrega/${armazemID}/getEntregaArmazem`
            );
            const entregas = await entregasSistema.json();
            setEntregasExistentes(entregas);
        }

    };

    const apagar = async () => {
        setTempoCarga("");
        setTempoDescarga("");
        setMassaEntrega("");
        setDataEntrega("");
        setIdA("");
        await getEntregasExistentes();
    };

    const resetOrder = () => {
        setSelectedOrder('Ordenar Por:');
        getEntregasExistentes();
    };

    const ordenagemEscolhida = "Ordenar por:";
    const [selectedOrder, setSelectedOrder] = useState(ordenagemEscolhida);

    const filtragemEscolhida = "Filtrar por:";
    const [selectedFilter, setSelectedFilter] = useState(filtragemEscolhida);

    const filtrarEntregas = ['Data', 'Armazém'];

    useEffect(() => {
        if (selectedFilter === filtragemEscolhida) {
            getEntregasExistentes();
        }
        else if (selectedFilter === 'Data') {
            if (dataEntrega !== "")
                mostrarEntregasPorData(dataEntrega);
        }

        else if (selectedFilter === 'Armazém') {
            if (idA !== "")
                filtrarEntregasPorArmazem(idA);
        }
    }, [selectedFilter]);



    const [doubleClicked, setDoubleClicked] = useState(false);

    const handleClick = () => {
        if (doubleClicked) {
            getEntregaFiltroData();
            setDoubleClicked(false);
        } else {
            getEntregaFiltroDataR();
            setDoubleClicked(true);
            setTimeout(() => setDoubleClicked(false), 300);
        }
    }; 


    return (
        <body>
            <Sidebar />
            <div className="inicio">
                <div className="info">
                    <form className="planear-form" >
                        <div className="linha">
                            <div className="imagem-geral">
                                <img className="planear" src={logo} width={60} />
                            </div>
                            <div className="texto">
                                <span className="titulo">Entregas Existentes</span>
                            </div>
                        </div>

                        <div className="filtrar-pesquisa">
                            <div className="filtros">
                                <div className="informacao">
                                    <li className="btn-listar">
                                        <button id="reset-button" className="fancy-btn" onClick={resetOrder}>Repor</button>
                                    </li>
                                    <div className="parent" >
                                        <div className="dropdown">
                                            <div
                                                className="dropdown-btn"
                                                onClick={() => setIsActive((state) => !state)}
                                            >
                                                {selectedFilter} <ChevronDown
                                                    className={!isActive ? 'arrow-down' : 'arrow-down rotate'}
                                                />
                                            </div>
                                            {isActive && (
                                                <div className="dropdown-content">
                                                    {filtrarEntregas.map((fe) => (
                                                        <div
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                setSelectedFilter(fe);
                                                                setIsActive(false);

                                                            }}
                                                        >
                                                            {fe}
                                                        </div>
                                                    ))}
                                                </div>

                                            )}
                                            {selectedFilter === "Data" && (
                                                <div className="entrega-input">
                                                    <input
                                                        id="dataEnt"
                                                        className={
                                                            dataEntregaR !== "" ? "has-val input" : "input"
                                                        }
                                                        type="text"
                                                        value={dataEntregaR}
                                                        onChange={(e) => setDataREntrega(e.target.value)}
                                                    ></input>
                                                    <span
                                                        className="input-focus"
                                                        data-placeholder="Data Entrega"
                                                    ></span>
                                                    <button
                                                        id="filtragem"
                                                        className="fancy-btn"
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            await mostrarEntregasPorData(dataEntregaR);
                                                        }}
                                                    >
                                                        Filtrar
                                                    </button>

                                                </div>
                                            )}



                                            {selectedFilter === "Armazém" && (
                                                <div className="entrega-input">
                                                    <input
                                                        id="armEnt"
                                                        className={
                                                            idA !== "" ? "has-val input" : "input"
                                                        }
                                                        type="text"
                                                        value={idA}
                                                        onChange={(e) => setIdA(e.target.value)}
                                                    ></input>
                                                    <span
                                                        className="input-focus"
                                                        data-placeholder="Armazem Partida"
                                                    ></span>

                                                    <button
                                                        id="filtragem"
                                                        className="fancy-btn"
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            await filtrarEntregasPorArmazem(idA);
                                                        }}
                                                    >
                                                        Filtrar
                                                    </button>

                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tabela'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Entrega ID</th>
                                        <th onClick={getEntregaFiltroCarga}>Tempo de Carga</th>
                                        <th onClick={getEntregaFiltroDescarga}> Tempo Descarga </th>
                                        <th onClick={getEntregaFiltroMassa}> Massa Entrega </th>
                                        <th onClick={handleClick}>Data Entrega</th>
                                        <th onClick={getEntregaFiltroArmazem}> Armazem ID</th>
                                    </tr>

                                </thead>
                                {entregasExistentes.map((entrega) => (
                                    <tbody>
                                        <tr key={entrega.identificadorEntrega}>
                                            <td>{entrega.identificadorEntrega}</td>
                                            <td> {entrega.tempoCarga.minutos} </td>
                                            <td> {entrega.tempoDescarga.minutos} </td>
                                            <td> {entrega.massaEntrega.valor} </td>
                                            <td> {entrega.data} </td>
                                            <td> {entrega.armazemID.value} </td>
                                        </tr>
                                    </tbody>
                                )
                                )}


                            </table>
                        </div>
                    </form>
                </div >
            </div >

        </body >

    );

}

export default ListarEntrega;