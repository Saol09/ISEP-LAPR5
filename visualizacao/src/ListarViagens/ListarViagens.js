import "../app.css";
import "./ListarViagens.css";
import Sidebar from "../GestorLogistica/Sidebar";
import React, { useEffect, useState } from "react";
import percurso from "../CriarPercurso/percurso.png";
import { BsChevronDown as ChevronDown } from "react-icons/bs";
import Select from "react-select";

const ListarViagens = () => {
    const [viagensExistentes, setViagensExistentes] = useState([]);

    const [perPage, setPerPage] = useState(2);
    const [page, setPage] = useState(1);
    const [qtdPaginas, setQtdPaginas] = useState(2);



    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        getViagensExistentes();
    }, [page, perPage]);


    useEffect(() => {
        const numViagens = viagensExistentes.length;
        const numPaginas = Math.ceil(numViagens / perPage);
        setQtdPaginas(numPaginas); // Atualiza o número de páginas
        botoesAtivos();
    }, [page, perPage]);



    const botoesAtivos = async () => {
        const numViagens = viagensExistentes.length;
        const numPaginas = Math.ceil(numViagens / perPage);

        if (page === 1) {
            document.getElementById("anterior").disabled = true;
        } else {
            document.getElementById("anterior").disabled = false;
        }

        if (page === numPaginas) {
            document.getElementById("seguinte").disabled = true;
        } else {
            document.getElementById("seguinte").disabled = false;
        }
    };

    const getViagensExistentes = async () => {
        const viagensSistema = await fetch(
            `http://localhost:3000/api/planeamento/listAllViagens?page=${page}&perPage=${perPage}`
        );

        const viagens = await viagensSistema.json();
        setViagensExistentes(viagens);
        setQtdPaginas(viagens.qtdPaginas);
    };

    const seguinte = async () => {
        setPage(page + 1);
        setIsActive(false);
    };

    const anterior = async () => {
        setPage(page - 1);
        setIsActive(false);
    };

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const viagensPorPagina = viagensExistentes.slice(startIndex, endIndex);

    const qtdPagina = [2, 8, 16, 24, 32];


    const [selectedFilter, setSelectedFilter] = useState(2);
    return (
        <body>
            <Sidebar />
            <div className="inicio">
                <div className="info">
                    <form className="planear-form">
                        <div className="linha">
                            <div className="imagem-geral">
                                <img className="planear" src={percurso} width={60} />
                            </div>
                            <div className="texto">
                                <span className="titulo">Viagens Existentes</span>
                            </div>
                        </div>
                        <div className="tabela">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Armazéns</th>
                                        <th>Camião</th>
                                        <th>Tempo Viagem</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {viagensPorPagina.map(function (trip) {
                                        return (
                                            <tr>
                                                <td> {trip.data} </td>
                                                <td>{trip.armazens.join(", ")}</td>
                                                <td> {trip.camiao} </td>
                                                <td> {trip.tempoViagem} </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="funcionalidades">
                            <div className="paginacao">
                                <div className="dropdown">
                                    <span>Viagens:</span>
                                    <select
                                        className="dropdown-select"
                                        onChange={event => {
                                            setSelectedFilter(event.target.value);
                                            setPerPage(Number(event.target.value));
                                            setPage(1);
                                        }}
                                        value={selectedFilter}
                                    >
                                        {qtdPagina.map(page => (
                                            <option key={page} value={page}>
                                                {page}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="numero-pagina">

                                    <span>Página:</span>
                                    <span>{page}</span>
                                </div>


                                <button
                                    id="anterior"
                                    className="fancy-btn"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await anterior();
                                    }}
                                >
                                    Anterior
                                </button>

                                {qtdPagina.length > 0 && (
                                    <button
                                        id="seguinte"
                                        className="fancy-btn"
                                        disabled={page === qtdPagina.length}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await seguinte();
                                        }}
                                    >
                                        Seguinte
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
};

export default ListarViagens;




