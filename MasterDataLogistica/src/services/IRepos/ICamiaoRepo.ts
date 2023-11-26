import { Repo } from '../../core/infra/Repo';
import { Camiao } from '../../domain/camiao';
import { CamiaoId } from '../../domain/camiaoId';
import { Matricula } from '../../domain/matricula';

export default interface ICamiaoRepo extends Repo<Camiao> {
	save(camiao: Camiao): Promise<Camiao>;
	findByDomainId(id: CamiaoId | string): Promise<Camiao>;
	findAll(): Promise<Camiao[]>;
	findByMatricula(matricula: string): Promise<Camiao>;
	findByAtivo(ativo: boolean): Promise<Camiao[]>;
}
