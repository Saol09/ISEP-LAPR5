import mongoose from 'mongoose';
import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';

const Camiao = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true,
		},

		designacao: {
			type: String,
			unique: true,
			index: true,
		},

		tara: {
			type: Number,
			index: true,
		},

		capacidadeCarga: {
			type: Number,
			index: true,
		},

		tempoCarregamentoRapido: {
			type: Number,
			index: true,
		},

		cargaMaximaBaterias: {
			type: Number,
			index: true,
		},

		autonomia: {
			type: Number,
			index: true,
		},

		matricula: {
			type: String,
			unique: true,
			index: true,
		},

		ativo: {
			type: Boolean,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', Camiao);
