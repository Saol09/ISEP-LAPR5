import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from "mongoose";
import { Percurso } from "../domain/percurso";
import { IPercursoPersistence } from "../dataschema/IPercursoPersistence";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPercursoDTO from "../dto/IPercursoDTO";
import { ArmazemId } from "../domain/armazemId";
import { Distancia } from "../domain/distancia";
import { Energia } from "../domain/energia";
import { Tempo } from "../domain/tempo";

export class PercursoMap extends Mapper<Percurso> {
  public static toDomain(
    percurso: any | Model<IPercursoPersistence & Document>
  ): Percurso {
    /*
          const percursoOrError = Percurso.create(
          percurso,
          new UniqueEntityID(percurso.domainId)
        );
    
        */

    const armazemPartidaOrError = ArmazemId.create(percurso.armazemPartida);
    const armazemChegadaOrError = ArmazemId.create(percurso.armazemChegada);
    const distanciaOrError = Distancia.create(percurso.distancia);
    const tempoPercursoOrError = Tempo.create(percurso.tempoPercurso);
    const tempoExtraOrError = Tempo.create(percurso.tempoExtra);
    const energiaGastaOrError = Energia.create(percurso.energiaGasta);

    const percursoOrError = Percurso.create(
      {
        armazemPartida: armazemPartidaOrError.getValue(),
        armazemChegada: armazemChegadaOrError.getValue(),
        distancia: distanciaOrError.getValue(),
        tempoPercurso: tempoPercursoOrError.getValue(),
        tempoExtra: tempoExtraOrError.getValue(),
        energiaGasta: energiaGastaOrError.getValue(),
      },
      new UniqueEntityID(percurso.domainId)
    );

    percursoOrError.isFailure ? console.log(percursoOrError.error) : "";

    return percursoOrError.isSuccess ? percursoOrError.getValue() : null;
  }

  public static toPersistence(percurso: Percurso): any {
    return {
      domainId: percurso.id.toString(),
      armazemPartida: percurso.props.armazemPartida.id,
      armazemChegada: percurso.props.armazemChegada.id,
      distancia: percurso.props.distancia.km,
      tempoPercurso: percurso.props.tempoPercurso.minutos,
      tempoExtra: percurso.props.tempoExtra.minutos,
      energiaGasta: percurso.props.energiaGasta.kWh,
    };
  }

  public static toDTO(percurso: Percurso): IPercursoDTO {
    return {
      domainId: percurso.id.toString(),
      armazemPartida: percurso.props.armazemPartida.id,
      armazemChegada: percurso.props.armazemChegada.id,
      distancia: percurso.props.distancia.km,
      tempoPercurso: percurso.props.tempoPercurso.minutos,
      tempoExtra: percurso.props.tempoExtra.minutos,
      energiaGasta: percurso.props.energiaGasta.kWh,
    } as IPercursoDTO;
  }
}
