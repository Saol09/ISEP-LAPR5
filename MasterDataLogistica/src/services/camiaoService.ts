import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import { Camiao } from '../domain/camiao';
import { CamiaoId } from '../domain/camiaoId';
import { Designacao } from '../domain/designacao';
import { Distancia } from '../domain/distancia';
import { Energia } from '../domain/energia';
import { Massa } from '../domain/massa';
import { Matricula } from '../domain/matricula';
import { Tempo } from '../domain/tempo';
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoRepo from './IRepos/ICamiaoRepo';

import ICamiaoService from './IServices/ICamiaoService';

@Service()
export default class CamiaoService implements ICamiaoService {
	constructor(@Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo) {}

	public async listarCamioesExistentes(): Promise<Result<ICamiaoDTO[]>> {
		let valores: ICamiaoDTO[] = [];

		const camioes = await this.camiaoRepo.findAll();
		camioes.forEach((camiao) => {
			valores.push(CamiaoMap.toDto(camiao));
		});

		return Result.ok<ICamiaoDTO[]>(valores);
	}

	//listar camioes ativos
	public async listarCamioesAtivos(): Promise<Result<ICamiaoDTO[]>> {
		let valores: ICamiaoDTO[] = [];

		const camioes = await this.camiaoRepo.findByAtivo(true);
		camioes.forEach((camiao) => {
			valores.push(CamiaoMap.toDto(camiao));
		});

		return Result.ok<ICamiaoDTO[]>(valores);
	}

	public async listarCamioesInativos(): Promise<Result<ICamiaoDTO[]>> {
		let valores: ICamiaoDTO[] = [];

		const camioes = await this.camiaoRepo.findByAtivo(false);
		camioes.forEach((camiao) => {
			valores.push(CamiaoMap.toDto(camiao));
		});

		return Result.ok<ICamiaoDTO[]>(valores);
	}

	public async criarCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
		const truckRoute = this.camiaoRepo.findByMatricula(camiaoDTO.matricula);

		if ((await truckRoute) != null) {
			return Result.fail<ICamiaoDTO>('O camião já foi inserido no sistema!');
		}
		try {
			const designacao = await Designacao.create(camiaoDTO.designacao).getValue();
			const tara = await Massa.create(camiaoDTO.tara).getValue();
			const capacidadeCarga = await Massa.create(camiaoDTO.capacidadeCarga).getValue();
			const tempoCarregamentoRapido = await Tempo.create(
				camiaoDTO.tempoCarregamentoRapido
			).getValue();
			const cargaMaximaBaterias = await Energia.create(
				camiaoDTO.cargaMaximaBaterias
			).getValue();
			const autonomia = await Distancia.create(camiaoDTO.autonomia).getValue();
			const matricula = await Matricula.create(camiaoDTO.matricula).getValue();

			const camiaoOrError = await Camiao.create({
				designacao: designacao,
				tara: tara,
				capacidadeCarga: capacidadeCarga,
				tempoCarregamentoRapido: tempoCarregamentoRapido,
				cargaMaximaBaterias: cargaMaximaBaterias,
				autonomia: autonomia,
				matricula: matricula,
				ativo: true,
			});

			if (camiaoOrError.isFailure) {
				return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
			}

			await this.camiaoRepo.save(camiaoOrError.getValue());

			const camiaoDTOResult = CamiaoMap.toDto(camiaoOrError.getValue()) as ICamiaoDTO;
			return Result.ok<ICamiaoDTO>(camiaoDTOResult);
		} catch (e) {
			throw e;
		}
	}

	public async editarCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
		try {
			const camiao = await this.camiaoRepo.findByMatricula(camiaoDTO.matricula);
			if (camiao === null) {
				return Result.fail<ICamiaoDTO>('O Camião não se encontra inserido no sistema!');
			} else {
				const tara = await Massa.create(camiaoDTO.tara);
				const capacidadeCarga = await Massa.create(camiaoDTO.capacidadeCarga);
				const tempoCarregamentoRapido = await Tempo.create(camiaoDTO.tempoCarregamentoRapido);
				const cargaMaximaBaterias = await Energia.create(camiaoDTO.cargaMaximaBaterias);
				const autonomia = await Distancia.create(camiaoDTO.autonomia);

				camiao.props.tara = tara.getValue();
				camiao.props.capacidadeCarga = capacidadeCarga.getValue();
				camiao.props.tempoCarregamentoRapido = tempoCarregamentoRapido.getValue();
				camiao.props.cargaMaximaBaterias = cargaMaximaBaterias.getValue();
				camiao.props.autonomia = autonomia.getValue();
				camiao.ativo = camiaoDTO.ativo;

				await this.camiaoRepo.save(camiao);

				const camiaoDTOResult = CamiaoMap.toDto(camiao) as ICamiaoDTO;
				return Result.ok<ICamiaoDTO>(camiaoDTOResult);
			}
		} catch (e) {
			throw e;
		}
	}

	public async desativarCamiao(matricula: string): Promise<Result<boolean>> {
		try {
			const camiao = await this.camiaoRepo.findByMatricula(matricula);
			if (camiao === null) {
				return Result.fail<boolean>('O Camião não se encontra inserido no sistema!');
			} else if (camiao.props.ativo === false) {
				return Result.fail<boolean>('O Camião já se encontra desativado!');
			} else {
				camiao.props.ativo = false;
				await this.camiaoRepo.save(camiao);
				return Result.ok<boolean>(true);
			}
		} catch (e) {
			throw e;
		}
	}

	public async ativarCamiao(matricula: string): Promise<Result<boolean>> {
		try {
			const camiao = await this.camiaoRepo.findByMatricula(matricula);
			if (camiao === null) {
				return Result.fail<boolean>('O Camião não se encontra inserido no sistema!');
			} else if (camiao.props.ativo === true) {
				return Result.fail<boolean>('O Camião já se encontra ativo!');
			} else {
				camiao.props.ativo = true;
				await this.camiaoRepo.save(camiao);
				return Result.ok<boolean>(true);
			}
		} catch (e) {
			throw e;
		}
	}
}
