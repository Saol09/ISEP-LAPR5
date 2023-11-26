import { Result } from "../../core/logic/Result";
import IPercursoDTO from "../../dto/IPercursoDTO";

export default interface IPercursoService {
  criarPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>>;
  listarPercursosExistente(
    page: number,
    perPage: number
  ): Promise<Result<{ qtdPaginas: number; percursos: IPercursoDTO[] }>>;
  listarPercursosByArmazemPartida(
    idArmazem: string
  ): Promise<Result<IPercursoDTO[]>>;
  listarPercursosByArmazemChegada(
    idArmazem: string
  ): Promise<Result<IPercursoDTO[]>>;
  listarPercursosByArmazens(
    idArmazemP: string,
    idArmazemC: string
  ): Promise<Result<IPercursoDTO[]>>;
  editarPercurso(
    armazemPartida: string,
    armazemChegada: string,
    distancia: number,
    tempoPercurso: number,
    tempoExtra: number,
    energiaGasta: number
  ): Promise<Result<IPercursoDTO>>;
  listAllPercursos(): Promise<Result<IPercursoDTO[]>>;
}
