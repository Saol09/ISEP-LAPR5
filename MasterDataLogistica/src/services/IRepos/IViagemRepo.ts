import { Viagem } from "../../domain/viagem";

export default interface IViagemRepo {
  find(
    page: number,
    perPage: number
  ): Promise<{
    qtdPaginas: number;
    viagens: Viagem[];
  }>;
  findAll(): Promise<Viagem[]>;
  qtdPaginas(perPage: number): Promise<number>;
  melhorViagem(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: string[];
  }>;
  menorDistancia(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }>;
  maiorMassa(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }>;
  melhorRelacao(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
  }>;
  save(viagem: Viagem): Promise<Viagem>;

  algoritmoGenetico(
    data: string,
    camiao: string
  ): Promise<{
    tempo: number;
    viagem: number[];
    qtdCamioes: number;
    entregasPorCamiao: number;
  }>;
}
