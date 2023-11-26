import { Result } from "../../core/logic/Result";
import IViagemDTO from "../../dto/IViagemDTO";
import { Viagem } from "../../domain/viagem";

export default interface IPlaneamentoService {
  efetuarPlaneamento(data: string): Promise<Result<IViagemDTO[]>>;
  efetuarPlaneamentoMenorDistancia(data: string): Promise<Result<IViagemDTO[]>>;
  efetuarPlaneamentoMaiorMassa(data: string): Promise<Result<IViagemDTO[]>>;
  efetuarPlaneamentoMelhorRelacao(data: string): Promise<Result<IViagemDTO[]>>;
  listAllViagens(): Promise<Result<IViagemDTO[]>>;
  listAllViagensPerPage(
    page: number,
    perPage: number
  ): Promise<Result<{ qtdPaginas: number; viagens: IViagemDTO[] }>>;
  efetuarPlaneamentoAlgoritmoGenetico(
    data: string
  ): Promise<Result<IViagemDTO[]>>;
}
