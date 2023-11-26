using MasterDataArmazens.Domain.Shared;
using System.Collections.Generic;
using MasterDataArmazens.Domain.Entregas;


namespace MasterDataArmazens.Domain.Entregas;
public class TempoEntrega : ValueObject
{
    public double Minutos { get;  set; }

    public TempoEntrega(){ }

    public TempoEntrega(double minutos)
    {
        Minutos = minutos;
        
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Minutos;
        
    }
}