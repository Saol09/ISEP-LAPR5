import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface EnergiaProps {
    kWh: number; 
}

export class Energia extends ValueObject<EnergiaProps> {
    get kWh (): number {
        return this.props.kWh;
    }
    
    public constructor (props: EnergiaProps) {
        super(props);
    }

    public static create (valor: number): Result<Energia> {
        const guardResult = Guard.againstNullOrUndefined(valor, 'energia');
        if (!guardResult.succeeded || valor < 0) {
        return Result.fail<Energia>(guardResult.message);
        } else {
        return Result.ok<Energia>(new Energia({ kWh: valor }))
        }

    }
}