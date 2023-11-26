using MasterDataArmazens.Domain.Shared;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System;

namespace MasterDataArmazens.Domain.Armazens;
public class EnderecoArmazem : ValueObject
{
    public string Rua { get; set; }
    public string Porta { get; set; }
    public string Cidade { get; set; }
    public string Codigopostal { get; set; }
    public string Pais { get; set; }


    public EnderecoArmazem() { }

    public EnderecoArmazem(string rua, string porta, string cidade, string codigopostal, string pais)
    {
        ValidarEndereco(rua, porta, cidade, codigopostal, pais);
        Rua = rua;
        Porta = porta;
        Cidade = cidade;
        Codigopostal = codigopostal;
        Pais = pais;

    }

    private bool ValidarEndereco(string rua, string porta, string cidade, string codigopostal, string pais)
    {

        var patternCodigoPostal = "[0-9]{4}-[0-9]{3}";
        string codigoTemp = string.Concat(codigopostal);  //Sem esta linha considerava o regex.Match como null

        if (string.IsNullOrEmpty(rua) || string.IsNullOrWhiteSpace(rua))
            throw new BusinessRuleValidationException("É obrigatório inserir a rua.");

        if (string.IsNullOrEmpty(porta))
            throw new BusinessRuleValidationException("É obrigatorio inserir o numero da porta.");

        int portaVal = int.Parse(porta);

        if (portaVal < 0)
            throw new BusinessRuleValidationException("O número da porta tem de ser superior a zero.");

        if (string.IsNullOrEmpty(cidade) || string.IsNullOrWhiteSpace(cidade))
            throw new BusinessRuleValidationException("É obrigatório inserir a cidade.");

        if (string.IsNullOrEmpty(codigoTemp) || !Regex.Match(codigoTemp, patternCodigoPostal).Success)
            throw new BusinessRuleValidationException("O codigo postal não segue o formato necessário (xxxx-xxx).");

        if (string.IsNullOrEmpty(pais) || string.IsNullOrWhiteSpace(pais))
            throw new BusinessRuleValidationException("É obrigatório inserir o País.");

        return true;

    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Rua;
        yield return Porta;
        yield return Cidade;
        yield return Pais;
        yield return Codigopostal;
    }
}