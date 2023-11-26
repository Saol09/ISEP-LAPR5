import { Document } from 'mongodb';
import { FilterQuery, Model } from 'mongoose';
import { Inject, Service } from 'typedi';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';
import { Camiao } from '../domain/camiao';
import { CamiaoId } from '../domain/camiaoId';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
	constructor(
		@Inject('camiaoSchema')
		private camiaoSchema: Model<ICamiaoPersistence & Document>
	) {}

	public async save(camiao: Camiao): Promise<Camiao> {
		const query = { matricula: camiao.matricula.matricula };

		const camiaoDocument = await this.camiaoSchema.findOne(query);

		try {
			if (camiaoDocument === null) {
				const rawCamiao: any = CamiaoMap.toPersistence(camiao);

				const camiaoCreated = await this.camiaoSchema.create(rawCamiao);

				return CamiaoMap.toDomain(camiaoCreated);
			} else {
				camiaoDocument.designacao = camiao.designacao.nome;
				camiaoDocument.tara = camiao.tara.number;
				camiaoDocument.capacidadeCarga = camiao.capacidadeCarga.number;
				camiaoDocument.tempoCarregamentoRapido = camiao.tempoCarregamentoRapido.minutos;
				camiaoDocument.cargaMaximaBaterias = camiao.cargaMaximaBaterias.kWh;
				camiaoDocument.autonomia = camiao.autonomia.km;
				camiaoDocument.matricula = camiao.matricula.matricula;
				camiaoDocument.ativo = camiao.ativo;
				await camiaoDocument.save();

				return camiao;
			}
		} catch (err) {
			throw err;
		}
	}

	public async findAll(): Promise<Camiao[]> {
		const camiaoRecord = await this.camiaoSchema.find();
		var camioes: Camiao[] = [];
		if (camiaoRecord != null) {
			camiaoRecord.forEach(async (element) => {
				camioes.push(await CamiaoMap.toDomain(element));
			});
			return camioes;
		} else return null;
	}

	public async findByMatricula(matricula: string): Promise<Camiao> {
		const camiaoList = this.findAll();
		var finalCamiao = null;

		(await camiaoList).forEach((element) => {
			if (matricula.localeCompare(element.matricula.matricula) == 0) {
				finalCamiao = element;
			}
		});
		return finalCamiao;
	}

	public async findByAtivo(ativo: boolean): Promise<Camiao[]> {
		const camiaoList = this.findAll();
		var listaCamioes: Camiao[] = [];

		(await camiaoList).forEach((element) => {
			if (ativo == element.ativo) {
				listaCamioes.push(element);
			}
		});
		return listaCamioes;
	}

	public async findByDomainId(id: string): Promise<Camiao> {
		const camiaoList = this.findAll();
		var finalRoute = null;
		(await camiaoList).forEach((element) => {
			if (id.localeCompare(element.id.toString()) == 0) {
				finalRoute = element;
			}
		});
		return finalRoute;
	}

	public async exists(camiao: Camiao): Promise<boolean> {
		const idX = camiao.id instanceof CamiaoId ? (<CamiaoId>camiao.id).id : camiao.id;

		const query = { domainId: idX };
		const camiaoDocument = await this.camiaoSchema.findOne(
			query as FilterQuery<ICamiaoPersistence & Document>
		);

		return !!camiaoDocument === true;
	}
}
