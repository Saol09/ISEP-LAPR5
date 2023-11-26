using System;
using MasterDataArmazens.Domain.Shared;


namespace MasterDataArmazens.Domain.Armazens
{
    public class Armazem : Entity<ArmazemID>, IAggregateRoot
    {

        public DesignacaoArmazem DesignacaoArmazem { get; private set; }
        public EnderecoArmazem EnderecoArmazem { get; private set; }
        public CoordenadasArmazem CoordenadasArmazem { get; private set; }
        public bool Active { get; private set; }

        private Armazem()
        {
            this.Active = true;
        }

        public Armazem(string id, DesignacaoArmazem designacaoArmazem, EnderecoArmazem enderecoArmazem, CoordenadasArmazem coordenadasArmazem)
        {
            this.Id = new ArmazemID(id);
            this.DesignacaoArmazem = new DesignacaoArmazem(designacaoArmazem.Designacao);
            this.EnderecoArmazem = new EnderecoArmazem(enderecoArmazem.Rua, enderecoArmazem.Porta, enderecoArmazem.Cidade, enderecoArmazem.Codigopostal, enderecoArmazem.Pais);
            this.CoordenadasArmazem = new CoordenadasArmazem(coordenadasArmazem.Latitude, coordenadasArmazem.Longitude, coordenadasArmazem.Altitude);
            this.Active = true;
        }

        public void AlterarDesignacaoArmazem(DesignacaoArmazem designacaoArmazem)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possivel alterar a designacao de um armazém inativo.");
            this.DesignacaoArmazem = new DesignacaoArmazem(designacaoArmazem.Designacao);
        }

        public void AlterarEnderecoArmazem(EnderecoArmazem enderecoArmazem)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possivel alterar o endereco de um armazém inativo.");
            this.EnderecoArmazem = new EnderecoArmazem(enderecoArmazem.Rua, enderecoArmazem.Porta, enderecoArmazem.Cidade, enderecoArmazem.Codigopostal, enderecoArmazem.Pais);
        }

        public void AlterarCoordenadasArmazem(CoordenadasArmazem coordenadasArmazem)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possivel alterar as coordenadas de um armazém inativo.");
            this.CoordenadasArmazem = new CoordenadasArmazem(coordenadasArmazem.Latitude, coordenadasArmazem.Longitude, coordenadasArmazem.Altitude);
        }


        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}