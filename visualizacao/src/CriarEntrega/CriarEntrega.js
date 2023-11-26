import "../app.css";
import "./CriarEntrega.css"
import { useState } from "react";
import React from "react";
import logo from "./entrega.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../GestorArmazem/Sidebar";

const CriarEntrega = () => {
    const [tempoCarga, setTempoCarga] = useState("");
    const [tempoDescarga, setTempoDescarga] = useState("");
    const [massaEntrega, setMassaEntrega] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [idA, setIdA] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function comunicarMDA() {

        await fetch("https://localhost:5001/api/Entrega/", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                "tempoCarga": {
                    "Minutos": tempoCarga
                },
                "tempoDescarga": {
                    "Minutos": tempoDescarga
                },
                "massaEntrega": {
                    "valor": massaEntrega
                },
                "Data": dataEntrega,
                "armazemID": {
                    "value": idA
                }
            }),

        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch(err => console.log(err));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            idA.length !== 3 ||
            tempoCarga <= 0 ||
            tempoDescarga <= 0 ||
            massaEntrega <= 0

        ) {
            setError(true);
        } else {
            comunicarMDA();
            navigate("/gestorArmazem");
        }
    };

    return (
        <body>
            <Sidebar />
            <div className="inicio">
                <div className="info">
                    <form className="entrega-form" onSubmit={handleSubmit}>
                        <div className="linha">
                            <div className="imagem-geral">
                                <img className="entrega" alt="imagem entrega" src={logo} width={60} />
                            </div>
                            <div className="texto">
                                <span className="titulo">Adicionar Entrega</span>
                            </div>
                        </div>
                        <div className="linha-input">
                            <div className="inputEValidacao">
                                <div className="geral-input">
                                    <input
                                        className={tempoCarga !== '' ? 'has-val input' : 'input'}
                                        type="text"
                                        value={tempoCarga}
                                        onChange={(e) => setTempoCarga(e.target.value)}></input>
                                    <span
                                        className="input-focus"
                                        data-placeholder="Tempo de Carga"></span>
                                </div>
                                {error &&
                                    (tempoCarga < 0 || tempoCarga.length === 0) ? (
                                    <label>Tempo de Carga inválida</label>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="inputEValidacao">
                                <div className="geral-input">
                                    <input
                                        className={tempoDescarga !== '' ? 'has-val input' : 'input'}
                                        type="text"
                                        value={tempoDescarga}
                                        onChange={(e) => setTempoDescarga(e.target.value)}></input>
                                    <span
                                        className="input-focus"
                                        data-placeholder="Tempo Descarga"></span>
                                </div>
                                {error && (tempoDescarga < 0 || tempoDescarga.length === 0) ? (
                                    <label>Tempo Descarga inválido</label>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div className="linha-input">
                            <div className="inputEValidacao">
                                <div className="geral-input">
                                    <input
                                        className={massaEntrega !== '' ? 'has-val input' : 'input'}
                                        type="text"
                                        value={massaEntrega}
                                        onChange={(e) => setMassaEntrega(e.target.value)}></input>
                                    <span
                                        className="input-focus"
                                        data-placeholder="Massa de Entrega"></span>
                                </div>
                                {error &&
                                    (massaEntrega < 0 || massaEntrega.length === 0) ? (
                                    <label>Massa de Entrega inválida</label>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="inputEValidacao">
                                <div className="geral-input">
                                    <input
                                        className={idA !== '' ? 'has-val input' : 'input'}
                                        type="text"
                                        value={idA}
                                        onChange={(e) => setIdA(e.target.value)}></input>
                                    <span
                                        className="input-focus"
                                        data-placeholder="Armazem ID"></span>
                                </div>
                                {error && (idA.length !== 3 || idA.length === 0) ? (
                                    <label>ID Armazem inválido.</label>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="linha-input-single">
                            <div className="inputEValidacao">
                                <div className="geral-input">
                                    <input
                                        className={dataEntrega !== "" ? "has-val input" : "input"}
                                        type="text"
                                        value={dataEntrega}
                                        onChange={(e) => setDataEntrega(e.target.value)}
                                    ></input>
                                    <span
                                        className="input-focus"
                                        data-placeholder="Data Entrega (yyyyMMdd)"
                                    ></span>
                                </div>
                                {error && (dataEntrega.length === 0) ? (
                                    <label>Data Entrega inválida.</label>
                                ) : (
                                    ""
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

export default CriarEntrega;