import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IViagemDTO from "../dto/IViagemDTO";
import { Viagem } from "../domain/viagem";
import { ViagemMap } from "../mappers/ViagemMap";
import { Designacao } from "../domain/designacao";
import IViagemService from "./IServices/IViagemService";
import { Tempo } from "../domain/tempo";

@Service()
export default class ViagemService implements IViagemService {
  constructor(@Inject(config.repos.viagem.name) private viagemRepo) {}

  public async listAllViagens(): Promise<Result<IViagemDTO[]>> {
    let valores: IViagemDTO[] = [];

    const viagens = await this.viagemRepo.findAll();
    viagens.forEach((trip) => {
      valores.push(ViagemMap.toDTO(trip));
    });

    return Result.ok<IViagemDTO[]>(valores);
  }

  public async listAllViagensPerPage(
    page: number,
    perPage: number
  ): Promise<Result<{ qtdPaginas: number; viagens: IViagemDTO[] }>> {
    let valores: IViagemDTO[] = [];

    const viagens = await this.viagemRepo.find(page, perPage);

    viagens.viagens.forEach((trip) => {
      valores.push(ViagemMap.toDTO(trip));
    });

    const info = {
      qtdPaginas: viagens.qtdPaginas,
      viagens: valores,
    };

    return Result.ok<{ qtdPaginas: number; viagens: IViagemDTO[] }>(info);
  }

  public async efetuarPlaneamento(data: string): Promise<Result<IViagemDTO[]>> {
    try {
      const camiaoNome = "eTruck01";

      const { tempo, viagem } = await this.viagemRepo.melhorViagem(
        data,
        camiaoNome
      );

      const tempoViagem = Tempo.create(tempo).getValue();

      const viagemOrError = Viagem.create({
        tempoViagem: tempoViagem,
        camiao: camiaoNome,
        data: data,
        armazens: viagem,
      });

      if (viagemOrError.isFailure) {
        return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
      }

      const viagemResult = viagemOrError.getValue();

      await this.viagemRepo.save(viagemResult);

      const viagemDTOResult = ViagemMap.toDTO(viagemResult) as IViagemDTO;

      let viagens: IViagemDTO[] = [];
      viagens.push(viagemDTOResult);
      return Result.ok<IViagemDTO[]>(viagens);
    } catch (e) {
      throw e;
    }
  }

  public async efetuarPlaneamentoMenorDistancia(
    data: string
  ): Promise<Result<IViagemDTO[]>> {
    try {
      const camiaoNome = "eTruck01";

      const { tempo, viagem } = await this.viagemRepo.menorDistancia(
        data,
        camiaoNome
      );

      const tempoViagem = Tempo.create(tempo).getValue();

      const viagemOrError = Viagem.create({
        tempoViagem: tempoViagem,
        camiao: camiaoNome,
        data: data,
        armazens: viagem,
      });

      if (viagemOrError.isFailure) {
        return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
      }

      const viagemResult = viagemOrError.getValue();

      await this.viagemRepo.save(viagemResult);

      const viagemDTOResult = ViagemMap.toDTO(viagemResult) as IViagemDTO;

      let viagens: IViagemDTO[] = [];
      viagens.push(viagemDTOResult);

      return Result.ok<IViagemDTO[]>(viagens);
    } catch (e) {
      throw e;
    }
  }

  public async efetuarPlaneamentoMaiorMassa(
    data: string
  ): Promise<Result<IViagemDTO[]>> {
    try {
      const camiaoNome = "eTruck01";

      const { tempo, viagem } = await this.viagemRepo.maiorMassa(
        data,
        camiaoNome
      );

      const tempoViagem = Tempo.create(tempo).getValue();

      const viagemOrError = Viagem.create({
        tempoViagem: tempoViagem,
        camiao: camiaoNome,
        data: data,
        armazens: viagem,
      });

      if (viagemOrError.isFailure) {
        return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
      }

      const viagemResult = viagemOrError.getValue();

      await this.viagemRepo.save(viagemResult);

      const viagemDTOResult = ViagemMap.toDTO(viagemResult) as IViagemDTO;

      let viagens: IViagemDTO[] = [];
      viagens.push(viagemDTOResult);
      return Result.ok<IViagemDTO[]>(viagens);
    } catch (e) {
      throw e;
    }
  }

  public async efetuarPlaneamentoMelhorRelacao(
    data: string
  ): Promise<Result<IViagemDTO[]>> {
    try {
      const camiaoNome = "eTruck01";

      const { tempo, viagem } = await this.viagemRepo.melhorRelacao(
        data,
        camiaoNome
      );

      const tempoViagem = Tempo.create(tempo).getValue();

      const viagemOrError = Viagem.create({
        tempoViagem: tempoViagem,
        camiao: camiaoNome,
        data: data,
        armazens: viagem,
      });

      if (viagemOrError.isFailure) {
        return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
      }

      const viagemResult = viagemOrError.getValue();

      await this.viagemRepo.save(viagemResult);

      const viagemDTOResult = ViagemMap.toDTO(viagemResult) as IViagemDTO;

      let viagens: IViagemDTO[] = [];
      viagens.push(viagemDTOResult);

      return Result.ok<IViagemDTO[]>(viagens);
    } catch (e) {
      throw e;
    }
  }

  public async efetuarPlaneamentoAlgoritmoGenetico(
    data: string
  ): Promise<Result<IViagemDTO[]>> {
    try {
      const camiaoNome = "eTruck01";

      const {
        tempo,
        viagem,
        qtdCamioes,
        entregasPorCamiao,
      } = await this.viagemRepo.algoritmoGenetico(data, camiaoNome);

      console.log(qtdCamioes, entregasPorCamiao);

      const tempoViagem = Tempo.create(tempo).getValue();

      let viagens: IViagemDTO[] = [];

      for (let i = 0; i < qtdCamioes - 1; i++) {
        const viagemCamiaoAtual = viagem.slice(
          i * entregasPorCamiao,
          (i + 1) * entregasPorCamiao
        );

        viagemCamiaoAtual.splice(0, 0, "Matosinhos"); // inserts "Matosinhos" at index 0
        viagemCamiaoAtual.push("Matosinhos");

        const viagemOrError = Viagem.create({
          tempoViagem: tempoViagem,
          camiao: camiaoNome,
          data: data,
          armazens: viagemCamiaoAtual,
        });

        if (viagemOrError.isFailure) {
          return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
        }

        const viagemResult = viagemOrError.getValue();

        await this.viagemRepo.save(viagemResult);
        viagens[i] = ViagemMap.toDTO(viagemOrError.getValue()) as IViagemDTO;
      }

      const viagemCamiaoAtual = viagem.slice(
        (qtdCamioes - 1) * entregasPorCamiao
      );

      viagemCamiaoAtual.splice(0, 0, "Matosinhos"); // inserts "Matosinhos" at index 0
      viagemCamiaoAtual.push("Matosinhos");

      const viagemOrError = Viagem.create({
        tempoViagem: tempoViagem,
        camiao: camiaoNome,
        data: data,
        armazens: viagemCamiaoAtual,
      });

      if (viagemOrError.isFailure) {
        return Result.fail<IViagemDTO[]>(viagemOrError.errorValue());
      }

      const viagemResult = viagemOrError.getValue();

      await this.viagemRepo.save(viagemResult);
      viagens[qtdCamioes - 1] = ViagemMap.toDTO(
        viagemOrError.getValue()
      ) as IViagemDTO;

      return Result.ok<IViagemDTO[]>(viagens);
    } catch (e) {
      throw e;
    }
  }
}
