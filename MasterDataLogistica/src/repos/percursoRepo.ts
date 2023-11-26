import { Document, FilterQuery, Model } from "mongoose";
import { Service, Inject } from "typedi";
import { IPercursoPersistence } from "../dataschema/IPercursoPersistence";
import { ArmazemId } from "../domain/armazemId";
import { Percurso } from "../domain/percurso";
import { PercursoId } from "../domain/percursoId";
import { PercursoMap } from "../mappers/PercursoMap";
import IPercursoRepo from "../services/IRepos/IPercursoRepo";

@Service()
export default class PercursoRepo implements IPercursoRepo {
  constructor(
    @Inject("percursoSchema")
    private percursoSchema: Model<IPercursoPersistence & Document>
  ) {}

  public async qtdPaginas(perPage: number): Promise<number> {
    const qtdPercursos = await this.percursoSchema.countDocuments();

    return Math.ceil(qtdPercursos / perPage);
  }

  public async findAll(): Promise<Percurso[]> {
    const percursoRecord = await this.percursoSchema.find();
    var percursos: Percurso[] = [];
    if (percursoRecord != null) {
      percursoRecord.forEach(async (element) => {
        percursos.push(await PercursoMap.toDomain(element));
      });
      return percursos;
    } else return null;
  }

  public async find(
    page: number,
    perPage: number
  ): Promise<{
    qtdPaginas: number;
    percursos: Percurso[];
  }> {
    const percursoRecord = await this.percursoSchema.find({}, "", {
      limit: perPage,
      skip: perPage * (page - 1),
    });

    if (percursoRecord === null) return null;

    const percursos: Percurso[] = [];
    percursoRecord.forEach(async (element) => {
      percursos.push(await PercursoMap.toDomain(element));
    });

    const qtgPages = (await this.qtdPaginas(perPage)).valueOf();

    return {
      qtdPaginas: qtgPages,
      percursos: percursos,
    };
  }

  public async save(percurso: Percurso): Promise<Percurso> {
    const query = { domainId: percurso.id.toString() };

    const percursoDocument = await this.percursoSchema.findOne(query);

    try {
      if (percursoDocument === null) {
        const rawPercurso: any = PercursoMap.toPersistence(percurso);

        const percursoCriado = await this.percursoSchema.create(rawPercurso);

        return PercursoMap.toDomain(percursoCriado);
      } else {
        percursoDocument.id = percurso.id.toString();
        percursoDocument.armazemChegada = percurso.armazemChegada.props.id;
        percursoDocument.armazemPartida = percurso.armazemPartida.props.id;
        percursoDocument.distancia = percurso.distancia.props.km;
        percursoDocument.tempoPercurso = percurso.tempoPercurso.props.minutos;
        percursoDocument.tempoExtra = percurso.tempoExtra.props.minutos;
        percursoDocument.energiaGasta = percurso.energiaGasta.props.kWh;

        await percursoDocument.save();

        return percurso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(
    percursoId: string | PercursoId
  ): Promise<Percurso> {
    const query = { domainId: percursoId };
    const percursoRecord = await this.percursoSchema.findOne(
      query as FilterQuery<IPercursoPersistence & Document>
    );

    if (percursoRecord != null) {
      return PercursoMap.toDomain(percursoRecord);
    } else return null;
  }

  public async findByArmazemPartidaId(idArmazem: string): Promise<Percurso[]> {
    const query = { armazemPartida: idArmazem };
    const percursosRecord = await this.percursoSchema.find(
      query as FilterQuery<IPercursoPersistence & Document>
    );
    if (percursosRecord != null) {
      let array: Percurso[] = [];
      percursosRecord.forEach((percurso) => {
        array.push(PercursoMap.toDomain(percurso));
      });
      return array;
    } else return null;
  }

  public async findByArmazemChegadaId(
    idArmazem: string | ArmazemId
  ): Promise<Percurso[]> {
    const query = { armazemChegada: idArmazem };
    const percursosRecord = await this.percursoSchema.find(
      query as FilterQuery<IPercursoPersistence & Document>
    );
    if (percursosRecord != null) {
      let array: Percurso[] = [];
      percursosRecord.forEach((percurso) => {
        array.push(PercursoMap.toDomain(percurso));
      });
      return array;
    } else return null;
  }

  public async findByArmazens(
    idArmazemP: string,
    idArmazemC: string
  ): Promise<Percurso[]> {
    const query = { armazemPartida: idArmazemP, armazemChegada: idArmazemC };
    const percursoRecord = await this.percursoSchema.findOne(
      query as FilterQuery<IPercursoPersistence & Document>
    );

    if (percursoRecord != null) {
      return [PercursoMap.toDomain(percursoRecord)];
    } else return null;
  }

  public async exists(percurso: Percurso): Promise<boolean> {
    const idX =
      percurso.id instanceof PercursoId
        ? (<PercursoId>percurso.id).id
        : percurso.id;

    const query = { domainId: idX };
    const percursoDocument = await this.percursoSchema.findOne(
      query as FilterQuery<IPercursoPersistence & Document>
    );

    return !!percursoDocument === true;
  }
}
