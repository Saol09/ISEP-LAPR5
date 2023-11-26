import { ValueObject } from '../core/domain/ValueObject';
import { Guard } from '../core/logic/Guard';
import { Result } from '../core/logic/Result';

interface MatriculaProps {
	matricula: string;
}

export class Matricula extends ValueObject<MatriculaProps> {
	get matricula(): string {
		return this.props.matricula;
	}

	public constructor(props: MatriculaProps) {
		super(props);
	}

	public static create(matriculaC: string): Result<Matricula> {
		const guardResult = Guard.againstNullOrUndefined(matriculaC, 'matricula');
		if (!guardResult.succeeded) {
			return Result.fail<Matricula>(guardResult.message);
		} else {
			return Result.ok<Matricula>(new Matricula({ matricula: matriculaC }));
		}
	}

	/* public static create(matriculaC: string): Result<Matricula> {
		let regex = new RegExp(
			/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/
		);
		const guardResult = Guard.againstNullOrUndefined(matriculaC, 'matricula');

		if (regex.test(matriculaC) && guardResult.succeeded) {
			return Result.ok<Matricula>(new Matricula({ matricula: matriculaC }));
		} else {
			return Result.fail<Matricula>(guardResult.message);
		}
	} */
}
