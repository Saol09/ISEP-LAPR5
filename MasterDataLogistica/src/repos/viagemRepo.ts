import { Service, Inject } from "typedi";
import fetch from "node-fetch";
import http = require("http");
import https = require("https");
import { Viagem } from "../domain/viagem";
import { Document, Model } from "mongoose";
import { IViagemPersistence } from "../dataschema/IViagemPersistence";
import { ViagemMap } from "../mappers/ViagemMap";
import IViagemRepo from "../services/IRepos/IViagemRepo";

@Service()
export default class ViagemRepo implements IViagemRepo {
  constructor(
    @Inject("viagemSchema")
    private viagemSchema: Model<IViagemPersistence & Document>
  ) {}

  public async qtdPaginas(perPage: number): Promise<number> {
    const qtdViagens = await this.viagemSchema.countDocuments();

    return Math.ceil(qtdViagens / perPage);
  }

  public async findAll(): Promise<Viagem[]> {
    const viagemRecord = await this.viagemSchema.find();
    var viagens: Viagem[] = [];
    if (viagemRecord != null) {
      viagemRecord.forEach(async (element) => {
        viagens.push(await ViagemMap.toDomain(element));
      });
      return viagens;
    } else return null;
  }

  public async find(
    page: number,
    perPage: number
  ): Promise<{
    qtdPaginas: number;
    viagens: Viagem[];
  }> {
    const viagemRecord = await this.viagemSchema.find({}, "", {
      limit: perPage,
      skip: perPage * (page - 1),
    });

    if (viagemRecord === null) return null;

    const viagens: Viagem[] = [];
    viagemRecord.forEach(async (element) => {
      viagens.push(await ViagemMap.toDomain(element));
    });

    const qtgPages = (await this.qtdPaginas(perPage)).valueOf();

    return {
      qtdPaginas: qtgPages,
      viagens: viagens,
    };
  }

  public async save(viagem: Viagem): Promise<Viagem> {
    const query = { domainId: viagem.id.toString() };

    const viagemDocument = await this.viagemSchema.findOne(query);

    try {
      if (viagemDocument === null) {
        const rawViagem: any = ViagemMap.toPersistence(viagem);

        const viagemCriada = await this.viagemSchema.create(rawViagem);

        return ViagemMap.toDomain(viagemCriada);
      } else {
        viagemDocument.id = viagem.id.toString();
        viagemDocument.camiao = viagem.camiao;
        viagemDocument.data = viagem.data;
        viagemDocument.armazens = viagem.armazens;
        viagemDocument.tempoViagem = viagem.tempoViagem.props.minutos;

        await viagemDocument.save();

        return viagem;
      }
    } catch (err) {
      throw err;
    }
  }

  httpAgent = new http.Agent({});

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  public async melhorViagem(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: string[];
  }> {
    const response = await fetch(
      "http://localhost:5050/obterMelhorViagem?data=" +
        data +
        "&camiao=" +
        camiao,
      {
        method: "GET",
        agent: this.httpAgent,
      }
    );

    const viagem = await response.json();

    const formattedViagens = [];
    formattedViagens.push("Matosinhos");

    for (let i = 0; i < viagem[1].length; i++) {
      const armazemId = viagem[1][i];
      const armazemName = await this.getArmazemName(parseInt(armazemId));
      formattedViagens.push(armazemName);
    }

    formattedViagens.push("Matosinhos");

    return {
      tempo: viagem[0],
      viagem: formattedViagens,
    };
  }

  private async getArmazemName(armazemId: number): Promise<string> {
    const res = await fetch(
      `https://localhost:5001/api/Armazens/${armazemId
        .toString()
        .padStart(3, "0")}`,
      {
        method: "GET",
        agent: this.httpsAgent,
      }
    );
    const json = await res.json();

    return json.designacaoArmazem.designacao;
  }

  public async menorDistancia(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }> {
    const response = await fetch(
      "http://localhost:5050/menorDistancia?data=" + data + "&camiao=" + camiao,
      {
        method: "GET",
        agent: this.httpAgent,
      }
    );

    const viagem = await response.json();

    const formattedViagens = [];

    formattedViagens.push("Matosinhos");

    for (let i = 0; i < viagem[1].length; i++) {
      const armazemId = viagem[1][i];
      const armazemName = await this.getArmazemName(parseInt(armazemId));
      formattedViagens.push(armazemName);
    }

    formattedViagens.push("Matosinhos");

    return {
      tempo: viagem[0],
      viagem: formattedViagens,
    };
  }

  public async maiorMassa(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }> {
    const response = await fetch(
      "http://localhost:5050/maiorMassa?data=" + data + "&camiao=" + camiao,
      {
        method: "GET",
        agent: this.httpAgent,
      }
    );

    const viagem = await response.json();

    const formattedViagens = [];
    formattedViagens.push("Matosinhos");

    for (let i = 0; i < viagem[1].length; i++) {
      const armazemId = viagem[1][i];
      const armazemName = await this.getArmazemName(parseInt(armazemId));
      formattedViagens.push(armazemName);
    }

    formattedViagens.push("Matosinhos");

    return {
      tempo: viagem[0],
      viagem: formattedViagens,
    };
  }

  public async melhorRelacao(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }> {
    const response = await fetch(
      "http://localhost:5050/melhorRelacao?data=" + data + "&camiao=" + camiao,
      {
        method: "GET",
        agent: this.httpAgent,
      }
    );

    const viagem = await response.json();

    const formattedViagens = [];
    formattedViagens.push("Matosinhos");

    for (let i = 0; i < viagem[1].length; i++) {
      const armazemId = viagem[1][i];
      const armazemName = await this.getArmazemName(parseInt(armazemId));
      formattedViagens.push(armazemName);
    }

    formattedViagens.push("Matosinhos");

    return {
      tempo: viagem[0],
      viagem: formattedViagens,
    };
  }

  public async algoritmoGenetico(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
    qtdCamioes: number;
    entregasPorCamiao: number;
  }> {
    const response = await fetch(
      "http://localhost:5050/algoritmoGenetico?data=" +
        data +
        "&camiao=" +
        camiao,
      {
        method: "GET",
        agent: this.httpAgent,
      }
    );

    const teste = new Map(Object.entries(response));

    console.log(teste);

    const viagem = await response.json();

    const formattedViagens = [];

    for (let i = 0; i < viagem[1].length; i++) {
      const armazemId = viagem[1][i];
      const armazemName = await this.getArmazemName(parseInt(armazemId));
      formattedViagens.push(armazemName);
    }

    return {
      tempo: viagem[0],
      viagem: formattedViagens,
      qtdCamioes: 3,
      entregasPorCamiao: 5,
    };
  }
}
