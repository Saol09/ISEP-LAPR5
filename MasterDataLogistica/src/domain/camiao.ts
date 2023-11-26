import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { CamiaoId } from './camiaoId';
import { Designacao } from './designacao';
import { Distancia } from './distancia';
import { Energia } from './energia';
import { Massa } from './massa';
import { Matricula } from './matricula';
import { Tempo } from './tempo';

interface CamiaoProps {
	designacao: Designacao;
	tara: Massa;
	capacidadeCarga: Massa;
	tempoCarregamentoRapido: Tempo;
	cargaMaximaBaterias: Energia;
	autonomia: Distancia;
	matricula: Matricula;
	ativo: boolean;
}

export class Camiao extends AggregateRoot<CamiaoProps> {
	get id(): UniqueEntityID {
		return this._id;
	}

	get camiaoId(): CamiaoId {
		return CamiaoId.caller(this.id);
	}

	get designacao(): Designacao {
		return this.props.designacao;
	}

	get tara(): Massa {
		return this.props.tara;
	}

	get capacidadeCarga(): Massa {
		return this.props.capacidadeCarga;
	}

	get tempoCarregamentoRapido(): Tempo {
		return this.props.tempoCarregamentoRapido;
	}

	get cargaMaximaBaterias(): Energia {
		return this.props.cargaMaximaBaterias;
	}

	get autonomia(): Distancia {
		return this.props.autonomia;
	}

	get matricula(): Matricula {
		return this.props.matricula;
	}

	get ativo(): boolean {
		return this.props.ativo;
	}

	set designacao(value: Designacao) {
		this.props.designacao;
	}

	set tara(value: Massa) {
		this.props.tara = value;
	}

	set capacidadeCarga(value: Massa) {
		this.props.capacidadeCarga = value;
	}

	set tempoCarregamentoRapido(value: Tempo) {
		this.props.tempoCarregamentoRapido = value;
	}

	set cargaMaximaBaterias(value: Energia) {
		this.props.cargaMaximaBaterias = value;
	}

	set autonomia(value: Distancia) {
		this.props.autonomia = value;
	}

	set matricula(value: Matricula) {
		this.props.matricula = value;
	}

	set ativo(value: boolean) {
		this.props.ativo = value;
	}

	private constructor(props: CamiaoProps, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {
		const camiao = [
			{ argument: props.designacao, argumentName: 'designacao' },
			{ argument: props.tara, argumentName: 'tara' },
			{ argument: props.capacidadeCarga, argumentName: 'capacidadeCarga' },
			{
				argument: props.tempoCarregamentoRapido,
				argumentName: 'tempoCarregamentoRapido',
			},
			{
				argument: props.cargaMaximaBaterias,
				argumentName: 'cargaMaximaBaterias',
			},
			{ argument: props.autonomia, argumentName: 'autonomia' },
			{ argument: props.matricula, argumentName: 'matricula' },
			{ argument: props.ativo, argumentName: 'ativo' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(camiao);

		if (!guardResult.succeeded) {
			return Result.fail<Camiao>(guardResult.message);
		} else {
			const camiao = new Camiao(
				{
					...props,
				},
				id
			);
			return Result.ok<Camiao>(camiao);
		}
	}
}
