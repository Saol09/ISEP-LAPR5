import { Result } from '../../core/logic/Result';
import ICamiaoDTO from '../../dto/ICamiaoDTO';

export default interface ICamiaoService {
	listarCamioesExistentes(): Promise<Result<ICamiaoDTO[]>>;
	listarCamioesAtivos(): Promise<Result<ICamiaoDTO[]>>;
	listarCamioesInativos(): Promise<Result<ICamiaoDTO[]>>;
	editarCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
	criarCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
	desativarCamiao(matricula: string): Promise<Result<boolean>>;
	ativarCamiao(matricula: string): Promise<Result<boolean>>;
}
