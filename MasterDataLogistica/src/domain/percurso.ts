import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { ArmazemId } from "./armazemId";
import { Distancia } from "./distancia";
import { Tempo } from "./tempo";
import { Energia } from "./energia";
import { PercursoId } from "./percursoId";
import IPercursoDTO from "../dto/IPercursoDTO";
import { Guard } from "../core/logic/Guard";


interface PercursoProps {
  armazemPartida: ArmazemId;
  armazemChegada: ArmazemId;
  distancia: Distancia;
  tempoPercurso: Tempo;
  tempoExtra: Tempo;
  energiaGasta: Energia;
}

export class Percurso extends AggregateRoot<PercursoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get percursoId (): PercursoId {
    return PercursoId.caller(this.id)
  }

  get armazemPartida (): ArmazemId{
    return this.props.armazemPartida
  }

  get armazemChegada (): ArmazemId{
    return this.props.armazemChegada
  }

  get distancia (): Distancia{
    return this.props.distancia
  }

  get tempoPercurso (): Tempo{
    return this.props.tempoPercurso
  }

  get tempoExtra (): Tempo{
    return this.props.tempoExtra
  }

  get energiaGasta (): Energia{
    return this.props.energiaGasta
  }

  set distancia ( value: Distancia) {
    this.props.distancia = value;
  }

  set tempoPercurso ( value: Tempo) {
    this.props.tempoPercurso = value;
  }

  set tempoExtra ( value: Tempo) {
    this.props.tempoExtra = value;
  }

  set energiaGasta ( value: Energia) {
    this.props.energiaGasta = value;
  }

  private constructor (props: PercursoProps, id?: UniqueEntityID) {
    super(props, id);
}

public static create (props: PercursoProps, id?: UniqueEntityID): Result<Percurso> {
    
  /*
    const percurso = new Percurso(
        {
            armazemPartida: new ArmazemId({id: percursoDTO.armazemPartida}),
            armazemChegada: new ArmazemId({id: percursoDTO.armazemChegada}),
            distancia: new Distancia({km: percursoDTO.distancia}),
            tempoPercurso: new Tempo({minutos: percursoDTO.tempoPercurso}),
            tempoExtra: new Tempo({minutos: percursoDTO.tempoExtra}),
            energiaGasta: new Energia({kWh: percursoDTO.energiaGasta}),
        },
        id
    );

    */

    const percurso = [
      { argument: props.armazemPartida, argumentName: 'armazemPartida' },
      { argument: props.armazemChegada, argumentName: 'armazemChegada' },
      { argument: props.distancia, argumentName: 'distancia' },
      { argument: props.tempoPercurso, argumentName: 'tempoPercurso' },
      { argument: props.tempoExtra, argumentName: 'tempoExtra' },
      { argument: props.energiaGasta, argumentName: 'energiaGasta' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(percurso);

    if (!guardResult.succeeded) {
      return Result.fail<Percurso>(guardResult.message)
    }     
    else {
      const percurso = new Percurso({
        ...props
      }, id);

      return Result.ok<Percurso>(percurso);
    }
}

}