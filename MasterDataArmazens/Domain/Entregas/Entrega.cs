using System;
using MasterDataArmazens.Domain.Shared;
using MasterDataArmazens.Domain.Armazens;

namespace MasterDataArmazens.Domain.Entregas
{
    public class Entrega : Entity<IdentificadorEntrega>, IAggregateRoot
    {
        public IdentificadorEntrega IdentificadorEntrega { get; private set; }
        public MassaEntrega MassaEntrega { get; private set; }
        public TempoEntrega TempoCarga { get; private set; }
        public TempoEntrega TempoDescarga { get; private set; }

        public ArmazemID Armazem_ID { get; private set; }

        public string DataEntrega { get; private set; }

        public bool Active { get; private set; }

        private Entrega()
        {
            this.Active = true;
        }

        public Entrega(TempoEntrega tempoCarga, TempoEntrega tempoDescarga, MassaEntrega massaEntrega, string dataEntrega, ArmazemID armazemID)
        {

            ValidarArmazem(armazemID);
            ValidarData(dataEntrega);
            ValidarDataFutura(dataEntrega);
            ValidarMassa(massaEntrega);
            ValidarTempoCarregamento(tempoCarga);
            ValidarTempoDescarga(tempoDescarga);
            this.IdentificadorEntrega = new IdentificadorEntrega(Guid.NewGuid());
            this.TempoCarga = tempoCarga;
            this.TempoDescarga = tempoDescarga;
            this.MassaEntrega = new MassaEntrega(massaEntrega.Valor);
            this.DataEntrega = dataEntrega;
            this.Armazem_ID = armazemID;
        }
        public void MudarActive()
        {
            this.Active = true;
        }

        public void AlterarTempoCarga(TempoEntrega tempoCarga)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo de carga uma entrega inativa.");
            this.TempoCarga = tempoCarga;
        }


        public void AlterarTempoDescarga(TempoEntrega tempoDescarga)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo de descarga de uma entrega inativa.");
            this.TempoDescarga = tempoDescarga;
        }

        public void AlterarMassaEntrega(MassaEntrega massaEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a massa de uma entrega inativa.");
            this.MassaEntrega = massaEntrega;
        }

        public void AlterarDataEntrega(string dataEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data de uma entrega inativa.");
            this.DataEntrega = dataEntrega;
        }

        public void AlterarArmazemEntrega(ArmazemID armazemID)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o armazem de uma entrega inativa.");
            this.Armazem_ID = armazemID;
        }


        public void ValidarArmazem(ArmazemID armazemId)
        {
            if (armazemId.Value.Length <= 0 || armazemId.Value.Length > 3)
                throw new BusinessRuleValidationException(" A Entrega precisa de um ID Armazém válido");
        }


        public void ValidarData(string dataEntrega)
        {
            int n;
            if (!int.TryParse(dataEntrega, out n))
                throw new BusinessRuleValidationException(" A Data Entrega precisa de um formato yyyyMMDD");

        }


        public void ValidarDataFutura(string dataEntrega)
        {
            Int32 date = Int32.Parse(dataEntrega);
            Int32 currentDate = Int32.Parse(DateTime.Now.ToString("yyyyMMdd"));
            if (date < currentDate)
                throw new BusinessRuleValidationException(" A Data Entrega precisa de ser futura");
        }

        public void ValidarTempoCarregamento(TempoEntrega tempoCarga)
        {
            if (Convert.ToInt32(tempoCarga.Minutos) < 0)
                throw new BusinessRuleValidationException(" O Tempo de Carga Entrega não deve ser negativo");
        }

        public void ValidarTempoDescarga(TempoEntrega tempoDescarga)
        {
            if (Convert.ToInt32(tempoDescarga.Minutos) < 0)
                throw new BusinessRuleValidationException(" O Tempo de Descarga Entrega não deve ser negativo");
        }

        public void ValidarMassa(MassaEntrega massaEntrega)
        {
            if (Convert.ToInt32(massaEntrega.Valor) < 0)
                throw new BusinessRuleValidationException(" A Massa Entrega não deve ser negativo");
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }


    }
}