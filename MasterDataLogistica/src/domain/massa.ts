import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { ValueObject } from '../core/domain/ValueObject';

interface MassaProps {
	massa: number;
}

export class Massa extends ValueObject<MassaProps> {
	get number(): number {
		return this.props.massa;
	}

	public constructor(props: MassaProps) {
		super(props);
	}

	public static create(valor: number): Result<Massa> {
		const guardResult = Guard.againstNullOrUndefined(valor, 'massa');
		if (!guardResult.succeeded || valor < 0) {
			return Result.fail<Massa>(guardResult.message);
		} else {
			return Result.ok<Massa>(new Massa({ massa: valor }));
		}
	}
}
