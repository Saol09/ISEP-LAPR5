import React, { useState, useEffect, useId } from "react";
import "../app.css";
import planear from "./planear.png";
import Sidebar from "../GestorLogistica/Sidebar";
import { useParams } from "react-router-dom";

const Rota = () => {
  const [tempoViagem, setTempoViagem] = useState("");
  const [linhasViagem, setLinhasViagem] = useState([]);
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [segundos, setSegundos] = useState("");
  const [novaData, setNovaData] = useState("");

  const params = useParams("/planearRota/:data/:predicado");

  const { data, predicado } = params;

  const fetchEndpoints = {
    "Melhor Viagem": "",
    "Menor Distância": "/menorDistancia",
    "Maior Massa": "/maiorMassa",
    "Melhor Relação": "/melhorRelacao",
    "Algortimo Genético": "/algoritmoGenetico",
  };

  const obterViagem = async () => {
    const fetchEndpoint = `http://localhost:3000/api/planeamento${fetchEndpoints[predicado]}/${data}`;

    const infoJson = await (await fetch(fetchEndpoint)).json();

    setTempoViagem(infoJson[0].tempoViagem);

    for (let i = 0; i < infoJson.length; i++) {
      const current = [];
      for (let j = 0; j < infoJson[i].armazens.length; j++)
        current.push(infoJson[i].armazens[j]);

      setLinhasViagem((state) => [...state, current]);
    }
  };

  const tratamentoData = () => {
    const ano = data.substring(0, 4);
    const mês = data.substring(4, 6);
    const dia = data.substring(6, 8);
    setNovaData(dia + "-" + mês + "-" + ano);
  };

  const tratamentoTempo = () => {
    const valor = tempoViagem / 60;
    const str = valor.toString();
    const splitted = str.split(".");
    setHoras(parseInt(splitted[0]));

    const resto = tempoViagem % 60;
    const valor2 = resto;
    const str2 = valor2.toString();
    const splitted2 = str2.split(".");
    setMinutos(parseInt(splitted2[0]));

    const resto2 = (tempoViagem * 60) % 60;
    const valor3 = resto2;
    const str3 = valor3.toString();
    const splitted3 = str3.split(".");
    setSegundos(parseInt(splitted3[0]));
  };

  console.log("render");
  useEffect(() => {
    obterViagem();
    console.log("useEffect");
    return () => console.log("unmount");
  }, []);

  useEffect(() => {
    tratamentoTempo();

    tratamentoData();
  }, [tempoViagem]);

  return (
    <body>
      <Sidebar />
      <div className="inicio">
        <div className="info">
          <form className="planear-form">
            <div className="linha">
              <div className="imagem-geral">
                <img className="planear" src={planear} width={40} />
              </div>
              <div className="texto">
                <span className="titulo">Viagem {novaData}</span>
              </div>
            </div>

            <div className="tabela">
              <table>
                <tbody>
                  {linhasViagem.map((linha) => (
                    <tr>
                      {linha.map((coluna) => (
                        <td>{coluna}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="linha-tempo">
              <div className="texto">
                <span className="subtitulo">{horas}</span>
              </div>
              <div className="texto">
                <span className="subtitulo">Horas</span>
              </div>
              <div className="texto">
                <span className="subtitulo">{minutos}</span>
              </div>
              <div className="texto">
                <span className="subtitulo">Minutos</span>
              </div>
              <div className="texto">
                <span className="subtitulo">{segundos}</span>
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

export default Rota;
