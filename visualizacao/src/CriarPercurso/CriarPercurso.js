import "../app.css";
import "../percurso.css";
import { useState } from "react";
import React from "react";
import logo from "./percurso.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../GestorLogistica/Sidebar";

const CriarPercurso = () => {
  const [armazemPartida, setArmazemPartida] = useState("");
  const [armazemChegada, setArmazemChegada] = useState("");
  const [distanciaPercurso, setDistanciaPercurso] = useState("");
  const [energiaGasta, setEnergiaGasta] = useState("");
  const [tempoPercurso, setTempoPercurso] = useState("");
  const [tempoExtra, setTempoExtra] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function comunicarMDL() {
    await fetch("http://localhost:3000/api/percurso/adicionar", {
      method: "POST",
      body: JSON.stringify({
        armazemPartida: armazemPartida,
        armazemChegada: armazemChegada,
        distancia: distanciaPercurso,
        tempoPercurso: tempoPercurso,
        tempoExtra: tempoExtra,
        energiaGasta: energiaGasta,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      armazemPartida.length !== 3 ||
      armazemChegada.length !== 3 ||
      distanciaPercurso < 0 ||
      distanciaPercurso.length === 0 ||
      energiaGasta < 0 ||
      energiaGasta.length === 0 ||
      tempoPercurso < 0 ||
      tempoPercurso.length === 0 ||
      tempoExtra < 0 ||
      tempoExtra.length === 0
    ) {
      setError(true);
    } else {
      comunicarMDL();
      navigate("/percursosExistentes");
    }
  };

  return (
    <body>
      <Sidebar />
      <div className="inicio">
        <div className="info">
          <form className="percurso-form" onSubmit={handleSubmit}>
            <div className="linha">
              <div className="imagem-geral">
                <img
                  className="percurso"
                  alt="imagem percurso"
                  src={logo}
                  width={60}
                />
              </div>
              <div className="texto">
                <span className="titulo">Adicionar Percurso</span>
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={
                      armazemPartida !== "" ? "has-val input" : "input"
                    }
                    type="text"
                    value={armazemPartida}
                    onChange={(e) => setArmazemPartida(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Armazem Partida"
                  ></span>
                </div>
                {error && armazemPartida.length !== 3 ? (
                  <label>Identificador armazém inválido</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={
                      armazemChegada !== "" ? "has-val input" : "input"
                    }
                    type="text"
                    value={armazemChegada}
                    onChange={(e) => setArmazemChegada(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Armazem Chegada"
                  ></span>
                </div>
                {error && armazemChegada.length !== 3 ? (
                  <label>Identificador armazém inválido</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={
                      distanciaPercurso !== "" ? "has-val input" : "input"
                    }
                    type="number"
                    value={distanciaPercurso}
                    onChange={(e) => setDistanciaPercurso(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Distância"
                  ></span>
                </div>
                {error &&
                (distanciaPercurso < 0 || distanciaPercurso.length === 0) ? (
                  <label>Distância inválida</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={energiaGasta !== "" ? "has-val input" : "input"}
                    type="number"
                    value={energiaGasta}
                    onChange={(e) => setEnergiaGasta(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Energia Consumida"
                  ></span>
                </div>
                {error && (energiaGasta < 0 || energiaGasta.length === 0) ? (
                  <label>Energia inválida</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={tempoPercurso !== "" ? "has-val input" : "input"}
                    type="number"
                    value={tempoPercurso}
                    onChange={(e) => setTempoPercurso(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Tempo Percurso"
                  ></span>
                </div>
                {error && (tempoPercurso < 0 || tempoPercurso.length === 0) ? (
                  <label>Tempo inválido</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="percurso-input">
                  <input
                    className={tempoExtra !== "" ? "has-val input" : "input"}
                    type="number"
                    value={tempoExtra}
                    onChange={(e) => setTempoExtra(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Tempo Extra"
                  ></span>
                </div>
                {error && (tempoExtra < 0 || tempoExtra.length === 0) ? (
                  <label>Tempo inválido</label>
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

export default CriarPercurso;
