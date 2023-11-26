import { Document } from 'mongodb';
import { Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { Camiao } from '../domain/camiao';
import { Designacao } from '../domain/designacao';
import { Distancia } from '../domain/distancia';
import { Energia } from '../domain/energia';
import { Massa } from '../domain/massa';
import { Matricula } from '../domain/matricula';
import { Tempo } from '../domain/tempo';
import ICamiaoDTO from '../dto/ICamiaoDTO';

export class CamiaoMap extends Mapper<Camiao> {
	public static toDomain(camiao: any | Model<ICamiaoPersistence & Document>): Camiao {
		const designacaoOrError = Designacao.create(camiao.designacao);
		const taraOrError = Massa.create(camiao.tara);
		const capacidadeCargaOrError = Massa.create(camiao.capacidadeCarga);
		const tempoCarregamentoRapidoOrError = Tempo.create(camiao.tempoCarregamentoRapido);
		const cargaMaximaBateriasOrError = Energia.create(camiao.cargaMaximaBaterias);
		const autonomiaOrError = Distancia.create(camiao.autonomia);
		const matriculaOrError = Matricula.create(camiao.matricula);

		const camiaoOrError = Camiao.create(
			{
				designacao: designacaoOrError.getValue(),
				tara: taraOrError.getValue(),
				capacidadeCarga: capacidadeCargaOrError.getValue(),
				tempoCarregamentoRapido: tempoCarregamentoRapidoOrError.getValue(),
				cargaMaximaBaterias: cargaMaximaBateriasOrError.getValue(),
				autonomia: autonomiaOrError.getValue(),
				matricula: matriculaOrError.getValue(),
				ativo: Boolean(camiao.ativo),
			},
			new UniqueEntityID(camiao.id)
		);

		camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

		return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
	}

	public static toPersistence(camiao: Camiao): any {
		return {
			domainId: camiao.id.toString(),
			designacao: camiao.props.designacao.nome,
			tara: camiao.props.tara.number,
			capacidadeCarga: camiao.props.capacidadeCarga.number,
			tempoCarregamentoRapido: camiao.props.tempoCarregamentoRapido.minutos,
			cargaMaximaBaterias: camiao.props.cargaMaximaBaterias.kWh,
			autonomia: camiao.props.autonomia.km,
			matricula: camiao.props.matricula.matricula,
			ativo: camiao.props.ativo,
		};
	}

	public static toDto(camiao: Camiao): ICamiaoDTO {
		return {
			id: camiao.id.toString(),
			designacao: camiao.props.designacao.nome,
			tara: camiao.props.tara.number,
			capacidadeCarga: camiao.props.capacidadeCarga.number,
			tempoCarregamentoRapido: camiao.props.tempoCarregamentoRapido.minutos,
			cargaMaximaBaterias: camiao.props.cargaMaximaBaterias.kWh,
			autonomia: camiao.props.autonomia.km,
			matricula: camiao.props.matricula.matricula,
			ativo: camiao.props.ativo,
		} as ICamiaoDTO;
	}
}
