using System;
using MasterDataArmazens.Domain.Shared;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace MasterDataArmazens.Domain.Armazens
{
    public class ArmazemID : EntityId
    {
        public ArmazemID(String value) : base(value)
        {
            ValidarId(value);
        }

        public void ValidarId(string id)
        {
            var pattern = "[a-zA-Z0-9]{3}";
            if (!Regex.Match(id, pattern).Success)
                throw new BusinessRuleValidationException("O id do armazem é invalido. Insira um id com 3 caracteres alfanumericos.");

        }

        override
        protected Object createFromString(String text)
        {
            return text;
        }

        override
        public String AsString()
        {
            return (String)base.Value;
        }

    }
}