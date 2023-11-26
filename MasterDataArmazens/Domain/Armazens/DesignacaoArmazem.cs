using MasterDataArmazens.Domain.Shared;
using System.Collections.Generic;

namespace MasterDataArmazens.Domain.Armazens;
public class DesignacaoArmazem : ValueObject
{
    public string Designacao { get; set; }

    public DesignacaoArmazem() { }

    public DesignacaoArmazem(string designacao)
    {
        ValidarDesignacao(designacao);
        Designacao = designacao;

    }

    private void ValidarDesignacao(string designacao)
    {
        if (string.IsNullOrEmpty(designacao) || designacao.Length > 50)
            throw new BusinessRuleValidationException("A designacao do armazem tem de ter entre 0 e 50 caracteres");
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Designacao;
    }
}