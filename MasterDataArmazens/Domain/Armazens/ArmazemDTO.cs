using System;

namespace MasterDataArmazens.Domain.Armazens
{
    public class ArmazemDTO
    {
        //public ArmazemIdManual ArmazemIdManual {get; set;}
        public string Id { get; set; }
        public DesignacaoArmazem DesignacaoArmazem { get; set; }

        public EnderecoArmazem EnderecoArmazem { get; set; }

        public CoordenadasArmazem CoordenadasArmazem { get; set; }

        public bool Active { get; set; }
        public ArmazemDTO(string id, DesignacaoArmazem designacaoArmazem, EnderecoArmazem enderecoArmazem, CoordenadasArmazem coordenadasArmazem, bool active)
        {
            this.Id = id;
            this.DesignacaoArmazem = designacaoArmazem;
            this.EnderecoArmazem = enderecoArmazem;
            this.CoordenadasArmazem = coordenadasArmazem;
            this.Active = active;
        }

    }
}