import { Repo } from "../../core/infra/Repo";
import { ArmazemId } from "../../domain/armazemId";
import { Percurso } from "../../domain/percurso";
import { PercursoId } from "../../domain/percursoId";

export default interface IPercursoRepo extends Repo<Percurso> {
  save(percurso: Percurso): Promise<Percurso>;
  findByDomainId(percursoId: PercursoId | string): Promise<Percurso>;
  find(
    page: number,
    perPage: number
  ): Promise<{
    qtdPaginas: number;
    percursos: Percurso[];
  }>;
  qtdPaginas(perPage: number): Promise<number>;
  findAll(): Promise<Percurso[]>;
  findByArmazemPartidaId(idArmazem: ArmazemId | string): Promise<Percurso[]>;
  findByArmazemChegadaId(idArmazem: ArmazemId | string): Promise<Percurso[]>;
  findByArmazens(idArmazemP: string, idArmazemC: string): Promise<Percurso[]>;
}
