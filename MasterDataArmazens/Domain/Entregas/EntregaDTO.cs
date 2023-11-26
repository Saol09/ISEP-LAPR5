using System;
using MasterDataArmazens.Domain.Armazens;


namespace MasterDataArmazens.Domain.Entregas
{
    public class EntregaDTO
    {
        //gerar id automaticamenteÇ
        public Guid IdentificadorEntrega { get; set; }
        public MassaEntrega MassaEntrega { get; set; }

        public TempoEntrega TempoCarga { get; set; }

        public TempoEntrega TempoDescarga { get; set; }

        public string Data { get; set; }

        public ArmazemID ArmazemID { get; private set; }


        public EntregaDTO(Guid id, TempoEntrega tempoCarga, TempoEntrega tempoDescarga, MassaEntrega massaEntrega, string data, ArmazemID armazemID)
        {
            this.IdentificadorEntrega = id;
            this.TempoCarga = tempoCarga;
            this.TempoDescarga = tempoDescarga;
            this.MassaEntrega = massaEntrega;
            this.Data = data;
            this.ArmazemID = armazemID;
        }

    }
}