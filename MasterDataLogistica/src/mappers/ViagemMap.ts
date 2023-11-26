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
import { Viagem } from "../domain/viagem";
import { IViagemPersistence } from "../dataschema/IViagemPersistence";
import { Designacao } from "../domain/designacao";
import IViagemDTO from "../dto/IViagemDTO";

export class ViagemMap extends Mapper<Viagem> {
  public static toDomain(
    viagem: any | Model<IViagemPersistence & Document>
  ): Viagem {
    const camiaoOrError = viagem.camiao;
    const dataOrError = viagem.data;
    const armazensOrError = viagem.armazens;
    const tempoViagemOrError = Tempo.create(viagem.tempoViagem);

    const viagemOrError = Viagem.create(
      {
        camiao: camiaoOrError,
        data: dataOrError,
        armazens: armazensOrError,
        tempoViagem: tempoViagemOrError.getValue(),
      },
      new UniqueEntityID(viagem.domainId)
    );

    viagemOrError.isFailure ? console.log(viagemOrError.error) : "";

    return viagemOrError.isSuccess ? viagemOrError.getValue() : null;
  }

  public static toPersistence(viagem: Viagem): any {
    return {
      domainId: viagem.id.toString(),
      camiao: viagem.props.camiao,
      data: viagem.props.data,
      armazens: viagem.props.armazens,
      tempoViagem: viagem.props.tempoViagem.minutos,
    };
  }

  public static toDTO(viagem: Viagem): IViagemDTO {
    return {
      camiao: viagem.props.camiao,
      data: viagem.props.data,
      armazens: viagem.props.armazens,
      tempoViagem: viagem.props.tempoViagem.minutos,
    } as IViagemDTO;
  }
}
