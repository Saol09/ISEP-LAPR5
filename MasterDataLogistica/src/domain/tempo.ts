import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface TempoProps {
    minutos: number;
}

export class Tempo extends ValueObject<TempoProps> {
    get minutos (): number {
        return this.props.minutos;
    }

    public constructor (props: TempoProps) {
        super(props);
    }

    public static create (valor: number): Result<Tempo> {
        //const guardResult = Guard.againstNullOrUndefined(valor, 'minutosPercurso');
        if(valor < 0) {
            return Result.fail<Tempo>("O tempo inserido não é um valor válido.");
        } else {
            return Result.ok<Tempo>(new Tempo({ minutos: valor }))
        }
    }
}