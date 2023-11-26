import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPercursoService from "./IServices/IPercursoService";
import IPercursoDTO from "../dto/IPercursoDTO";
import IPercursoRepo from "./IRepos/IPercursoRepo";
import { Percurso } from "../domain/percurso";
import { Tempo } from "../domain/tempo";
import { Distancia } from "../domain/distancia";
import { Energia } from "../domain/energia";
import { ArmazemId } from "../domain/armazemId";
import https = require("https");
import { PercursoMap } from "../mappers/PercursoMap";

@Service()
export default class PercursoService implements IPercursoService {
  constructor(
    @Inject(config.repos.percurso.name) private percursoRepo: IPercursoRepo,
    @Inject(config.repos.armazem.name) private armazemRepo
  ) { }

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  public async listarPercursosByArmazens(
    idArmazemP: string,
    idArmazemC: string
  ): Promise<Result<IPercursoDTO[]>> {
    let valores: IPercursoDTO[] = [];

    const percursos = await this.percursoRepo.findByArmazens(
      idArmazemP,
      idArmazemC
    );
    percursos.forEach((percurso) => {
      valores.push(PercursoMap.toDTO(percurso));
    });

    return Result.ok<IPercursoDTO[]>(valores);
  }

  public async listarPercursosByArmazemPartida(
    idArmazem: string
  ): Promise<Result<IPercursoDTO[]>> {
    let valores: IPercursoDTO[] = [];

    const percursos = await this.percursoRepo.findByArmazemPartidaId(idArmazem);
    percursos.forEach((percurso) => {
      valores.push(PercursoMap.toDTO(percurso));
    });

    return Result.ok<IPercursoDTO[]>(valores);
  }

  public async listarPercursosByArmazemChegada(
    idArmazem: string
  ): Promise<Result<IPercursoDTO[]>> {
    let valores: IPercursoDTO[] = [];

    const percursos = await this.percursoRepo.findByArmazemChegadaId(idArmazem);
    percursos.forEach((percurso) => {
      valores.push(PercursoMap.toDTO(percurso));
    });

    return Result.ok<IPercursoDTO[]>(valores);
  }

  public async listarPercursosExistente(
    page: number,
    perPage: number
  ): Promise<Result<{ qtdPaginas: number; percursos: IPercursoDTO[] }>> {
    let valores: IPercursoDTO[] = [];

    const percursos = await this.percursoRepo.find(page, perPage);

    percursos.percursos.forEach((percurso) => {
      valores.push(PercursoMap.toDTO(percurso));
    });

    const info = {
      qtdPaginas: percursos.qtdPaginas,
      percursos: valores,
    };

    return Result.ok<{ qtdPaginas: number; percursos: IPercursoDTO[] }>(info);
  }


  public async listAllPercursos(): Promise<Result<IPercursoDTO[]>> {
    let valores: IPercursoDTO[] = [];

    const percursos = await this.percursoRepo.findAll();
    percursos.forEach((percurso) => {
      valores.push(PercursoMap.toDTO(percurso));
    });

    return Result.ok<IPercursoDTO[]>(valores);
  }

  public async criarPercurso(
    percursoDTO: IPercursoDTO
  ): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByArmazens(
        percursoDTO.armazemPartida,
        percursoDTO.armazemChegada
      );

      if (percurso === null) {
        const armazensExistentes: any[] = await this.armazemRepo.findAll();

        if (
          (
            await this.armazemExiste(
              percursoDTO.armazemPartida,
              percursoDTO.armazemChegada,
              armazensExistentes
            )
          ).valueOf()
        ) {
          const armazemPartida = await ArmazemId.create(
            percursoDTO.armazemPartida
          ).getValue();
          const armazemChegada = await ArmazemId.create(
            percursoDTO.armazemChegada
          ).getValue();
          const distancia = await Distancia.create(
            percursoDTO.distancia
          ).getValue();
          const tempoPercurso = await Tempo.create(
            percursoDTO.tempoPercurso
          ).getValue();
          const tempoExtra = await Tempo.create(
            percursoDTO.tempoExtra
          ).getValue();
          const energiaGasta = await Energia.create(
            percursoDTO.energiaGasta
          ).getValue();

          const percursoOrError = await Percurso.create({
            armazemPartida: armazemPartida,
            armazemChegada: armazemChegada,
            distancia: distancia,
            tempoPercurso: tempoPercurso,
            tempoExtra: tempoExtra,
            energiaGasta: energiaGasta,
          });

          if (percursoOrError.isFailure) {
            return Result.fail<IPercursoDTO>(percursoOrError.errorValue());
          }

          const percursoResult = percursoOrError.getValue();

          await this.percursoRepo.save(percursoResult);

          const percursoDTOResult = PercursoMap.toDTO(
            percursoResult
          ) as IPercursoDTO;
          return Result.ok<IPercursoDTO>(percursoDTOResult);
        } else {
          return Result.fail<IPercursoDTO>(
            "Os id's dos armazens indicados não existem no sistema"
          );
        }
      } else {
        return Result.fail<IPercursoDTO>("O Percurso já existe no sistema!");
      }
    } catch (e) {
      throw e;
    }
  }

  public async editarPercurso(
    armazemPartida: string,
    armazemChegada: string,
    distancia: number,
    tempoPercurso: number,
    tempoExtra: number,
    energiaGasta: number
  ): Promise<Result<IPercursoDTO>> {
    try {
      const percurso = await this.percursoRepo.findByArmazens(
        armazemPartida,
        armazemChegada
      )[0];
      if (percurso === null) {
        return Result.fail<IPercursoDTO>(
          "O Percurso não se encontra inserido no sistema!"
        );
      } else {
        (percurso.props.distancia = await Distancia.create(
          distancia
        ).getValue()),
          (percurso.props.tempoPercurso = await Tempo.create(
            tempoPercurso
          ).getValue()),
          (percurso.props.tempoExtra = await Tempo.create(
            tempoExtra
          ).getValue()),
          (percurso.props.energiaGasta = await Energia.create(
            energiaGasta
          ).getValue()),
          await this.percursoRepo.save(percurso);
        const percursoDTOResult = PercursoMap.toDTO(percurso) as IPercursoDTO;
        return Result.ok<IPercursoDTO>(percursoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  private async armazemExiste(
    armazemP: string,
    armazemC: string,
    armazensExistentes: any[]
  ): Promise<Boolean> {
    try {
      let aux = 0;

      armazensExistentes.forEach((element) => {
        if (
          armazemP.localeCompare(element.id) == 0 ||
          armazemC.localeCompare(element.id) == 0
        ) {
          aux++;
        }
      });
      if (aux == 2) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }
}
