import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ArmazemIdProps {
    id: string;
  }

export class ArmazemId extends ValueObject<ArmazemIdProps> {
    get id (): string {
        return this.props.id;
    }

    public constructor (props: ArmazemIdProps) {
        super(props);
    }

    public static create (identificador: string): Result<ArmazemId> {
        const guardResult = Guard.againstNullOrUndefined(identificador, 'ArmazemId');
        if (!guardResult.succeeded) {
          return Result.fail<ArmazemId>(guardResult.message);
        } else {
          return Result.ok<ArmazemId>(new ArmazemId({ id: identificador }))
        }
    }
}