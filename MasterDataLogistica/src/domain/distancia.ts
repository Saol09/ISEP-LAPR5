import { ValueObject } from "../core/domain/ValueObject";
import {Result} from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";


interface DistanciaProps {
    km: number;
}

export class Distancia extends ValueObject<DistanciaProps> {

    get km (): number {
        return this.props.km;
    }

    public constructor (props: DistanciaProps) {
        super(props);
    }

    public static create (valor: number ): Result<Distancia>{
        const guardResult = Guard.againstNullOrUndefined(valor, 'distancia');
        if (!guardResult.succeeded || valor < 0) {
          return Result.fail<Distancia>(guardResult.message);
        } else {
          return Result.ok<Distancia>(new Distancia({ km: valor }))
        }

    }

}