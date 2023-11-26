using System;
using MasterDataArmazens.Domain.Shared;
using Newtonsoft.Json;


namespace MasterDataArmazens.Domain.Entregas
{
    public class IdentificadorEntrega : EntityId
    {

        public IdentificadorEntrega(Guid value) : base(value)
        {
        }

        public IdentificadorEntrega(String value) : base(value)
        {

        }

        override
        protected Object createFromString(string text)
        {
            return new Guid(text);
        }

        override
        public string AsString()
        {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }

}

