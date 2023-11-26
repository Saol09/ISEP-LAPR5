import "./CriarArmazem.css";
import "../app.css"
import { useState } from "react";
import React from "react";
import logo from "./armazem.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../GestorArmazem/Sidebar";

const CriarArmazem = () => {
  const [armazemId, setArmazemId] = useState("");
  const [designacao, setDesignacao] = useState("");

  const [rua, setRua] = useState("");
  const [porta, setPorta] = useState("");
  const [cidade, setCidade] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [pais, setPais] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function comunicarMDA() {
    await fetch("https://localhost:5001/api/Armazens/", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        "id": armazemId,
        "designacaoArmazem": {
          "designacao": designacao,
        },
        "enderecoArmazem": {
          "rua": rua,
          "porta": porta,
          "cidade": cidade,
          "codigopostal": codigoPostal,
          "pais": pais,
        },
        "coordenadasArmazem": {
          "latitude": latitude,
          "longitude": longitude,
          "altitude": altitude
        },
      }),

    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch(err => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      armazemId.length !== 3 ||
      (designacao.length > 50 && designacao.length <= 0) ||
      rua.length === 0 ||
      porta <= 0 ||
      cidade.length === 0 ||
      codigoPostal.length !== 8 ||
      pais.length === 0 ||
      latitude > 90 ||
      latitude < -90 ||
      longitude > 180 ||
      longitude < -180
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
          <form className="armazem-form" onSubmit={handleSubmit}>
            <div className="linha">
              <div className="imagem">
                <img className="armazem" src={logo} width={50} />
              </div>
              <div className="texto">
                <span className="armazem-titulo">Adicionar Armazem</span>
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={armazemId !== "" ? "has-val input" : "input"}
                    type="text"
                    value={armazemId}
                    onChange={(e) => setArmazemId(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Armazem ID"
                  ></span>
                </div>
                {error && armazemId.length !== 3 ? (
                  <label>Identificador armazém inválido.</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={designacao !== "" ? "has-val input" : "input"}
                    type="text"
                    value={designacao}
                    onChange={(e) => setDesignacao(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Designação Armazem"
                  ></span>
                </div>
                {error && (designacao.length > 50 || designacao.length <= 0) ? (
                  <label>Designação invalida.</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={rua !== "" ? "has-val input" : "input"}
                    type="text"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                  ></input>
                  <span className="input-focus" data-placeholder="Rua"></span>
                </div>
                {error && rua.length === 0 ? <label>Rua inválida.</label> : ""}
              </div>
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={porta !== "" ? "has-val input" : "input"}
                    type="number"
                    value={porta}
                    onChange={(e) => setPorta(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Numero Da Porta"
                  ></span>
                </div>
                {error && porta <= 0 ? <label>Porta inválida.</label> : ""}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={cidade !== "" ? "has-val input" : "input"}
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Cidade"
                  ></span>
                </div>
                {error && cidade.length === 0 ? (
                  <label>Cidade inválida.</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={codigoPostal !== "" ? "has-val input" : "input"}
                    type="text"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Codigo Postal"
                  ></span>
                </div>
                {error && codigoPostal.length !== 8 ? (
                  <label>Código postal inválido.</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={pais !== "" ? "has-val input" : "input"}
                    type="text"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                  ></input>
                  <span className="input-focus" data-placeholder="País"></span>
                </div>
                {error && pais.length === 0 ? <label>País inválido.</label> : ""}
              </div>
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={latitude !== "" ? "has-val input" : "input"}
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Latitude"
                  ></span>
                </div>
                {error && (latitude > 90 || latitude < -90) ? (
                  <label>Latitude inválida.</label>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="linha-input">
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={longitude !== "" ? "has-val input" : "input"}
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Longitude"
                  ></span>
                </div>
                {error && (longitude > 180 || longitude < -180) ? (
                  <label>Longitude inválida.</label>
                ) : (
                  ""
                )}
              </div>
              <div className="inputEValidacao">
                <div className="geral-input">
                  <input
                    className={altitude !== "" ? "has-val input" : "input"}
                    type="number"
                    value={altitude}
                    onChange={(e) => setAltitude(e.target.value)}
                  ></input>
                  <span
                    className="input-focus"
                    data-placeholder="Altitude"
                  ></span>
                </div>
                {error ? (
                  <label>altitude inválida.</label>
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

export default CriarArmazem;
