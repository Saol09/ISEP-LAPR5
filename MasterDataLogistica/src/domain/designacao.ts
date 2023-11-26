import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface DesignacaoProps {
  nome: string;
}

export class Designacao extends ValueObject<DesignacaoProps> {
  get nome(): string {
    return this.props.nome;
  }

  public constructor(props: DesignacaoProps) {
    super(props);
  }

  public static create(designacaoC: string): Result<Designacao> {
    const guardResult = Guard.againstNullOrUndefined(designacaoC, "matricula");
    if (!guardResult.succeeded) {
      return Result.fail<Designacao>(guardResult.message);
    } else {
      return Result.ok<Designacao>(new Designacao({ nome: designacaoC }));
    }
  }
}
