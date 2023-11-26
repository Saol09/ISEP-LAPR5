export default interface ICamiaoDTO {
	id: string;
	designacao: string;
	tara: number;
	capacidadeCarga: number;
	tempoCarregamentoRapido: number;
	cargaMaximaBaterias: number;
	autonomia: number;
	matricula: string;
	ativo: boolean;
}
