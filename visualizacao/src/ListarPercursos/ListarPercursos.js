import "../app.css";
import "../percurso.css";
import Sidebar from "../GestorLogistica/Sidebar";
import React, { useEffect, useState } from "react";
import percurso from "../CriarPercurso/percurso.png";
import Select from "react-select";

const ListarPercurso = () => {
  const [percursosExistentes, setPercursosExistentes] = useState([]);
  const [armazemPartida, setArmazemPartida] = useState("");
  const [armazemChegada, setArmazemChegada] = useState("");

  const [perPage, setPerPage] = useState(16);
  const [page, setPage] = useState(1);
  const [qtdPaginas, setQtdPaginas] = useState(17);

  useEffect(() => {
    getPercursosExistentes();
  }, [page, perPage]);

  useEffect(() => {
    botoesAtivos();
  }, [page, qtdPaginas]);

  const botoesAtivos = async () => {
    if (page === 1) {
      document.getElementById("anterior").disabled = true;
    } else {
      document.getElementById("anterior").disabled = false;
    }

    if (page === qtdPaginas) {
      document.getElementById("seguinte").disabled = true;
    } else {
      document.getElementById("seguinte").disabled = false;
    }
  };

  const getPercursosExistentes = async () => {
    const percursosSistema = await fetch(
      "http://localhost:3000/api/percurso/percursosExistentes/?page=" +
        page +
        "&perPage=" +
        perPage
    );

    const percursos = await percursosSistema.json();
    setPercursosExistentes(percursos.percursos);
    setQtdPaginas(percursos.qtdPaginas);
  };

  const getPercursosExistentesFiltroArmChegada = async () => {
    const percursosSistema = await fetch(
      "http://localhost:3000/api/percurso/percursosArmazemChegada/" +
        armazemChegada
    );
    const percursos = await percursosSistema.json();
    setPercursosExistentes(percursos);
  };

  const getPercursosExistentesFiltroArmPartida = async () => {
    const percursosSistema = await fetch(
      "http://localhost:3000/api/percurso/percursosArmazemPartida/" +
        armazemPartida
    );
    const percursos = await percursosSistema.json();
    setPercursosExistentes(percursos);
  };

  const getPercursosExistentesFiltroAmbos = async () => {
    const percursosSistema = await fetch(
      "http://localhost:3000/api/percurso/percursosPorArmazens/" +
        armazemPartida +
        "/" +
        armazemChegada
    );
    const percursos = await percursosSistema.json();
    setPercursosExistentes(percursos);
  };

  const filtrar = async () => {
    if (armazemPartida === "" && armazemChegada === "") {
      getPercursosExistentes();
    } else if (armazemPartida === "" && armazemChegada !== "") {
      await getPercursosExistentesFiltroArmChegada();
    } else if (armazemChegada === "" && armazemPartida !== "") {
      await getPercursosExistentesFiltroArmPartida();
    } else {
      await getPercursosExistentesFiltroAmbos();
    }
  };

  const apagar = async () => {
    setArmazemPartida("");
    setArmazemChegada("");
    await getPercursosExistentes();
  };

  const seguinte = async () => {
    setPage(page + 1);
  };

  const anterior = async () => {
    setPage(page - 1);
  };

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
                <span className="titulo">Percursos Existentes</span>
              </div>
            </div>
            <div className="filtrar-pesquisa">
              <div className="filtros">
                <div className="informacao">
                  <div className="percurso-input">
                    <input
                      id="armPart"
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
                  <div className="percurso-input">
                    <input
                      id="armCheg"
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
                </div>
                <div className="botoes">
                  <li className="btn-listar">
                    <button
                      id="apagar"
                      className="fancy-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        await apagar();
                      }}
                    >
                      Apagar
                    </button>
                  </li>
                  <li className="btn-listar">
                    <button
                      id="filtragem"
                      className="fancy-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        await filtrar();
                      }}
                    >
                      Filtrar
                    </button>
                  </li>
                </div>
              </div>
            </div>
            <div className="tabela">
              <table>
                <thead>
                  <tr>
                    <th>Armazem Partida</th>
                    <th>Armazem Chegada</th>
                    <th>Distância</th>
                    <th>Tempo Percurso</th>
                    <th>Energia Consumida</th>
                  </tr>
                </thead>

                <tbody>
                  {percursosExistentes.map(function (percurso) {
                    return (
                      <tr>
                        <td> {percurso.armazemPartida} </td>
                        <td> {percurso.armazemChegada} </td>
                        <td> {percurso.distancia} </td>
                        <td> {percurso.tempoPercurso} </td>
                        <td> {percurso.energiaGasta} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="funcionalidades">
              <div>Percursos: </div>
              <Select
                id="porPagina"
                className="perPage"
                options={[
                  { value: 8, label: 8 },
                  { value: 16, label: 16 },
                  { value: 24, label: 24 },
                  { value: 32, label: 32 },
                ]}
                placeholder={"16"}
                onChange={(value) => setPerPage(value.value)}
              />
              <div className="paginacao">
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

                <button
                  id="seguinte"
                  className="fancy-btn"
                  onClick={async (e) => {
                    e.preventDefault();
                    await seguinte();
                  }}
                >
                  Seguinte
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default ListarPercurso;
