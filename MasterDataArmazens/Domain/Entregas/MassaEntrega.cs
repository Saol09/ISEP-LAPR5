using MasterDataArmazens.Domain.Shared;
using System.Collections.Generic;

namespace MasterDataArmazens.Domain.Entregas;
public class MassaEntrega : ValueObject
{
    public double Valor { get;  set; }
    
    public MassaEntrega(){ }

    public MassaEntrega(double valor)
    {
        Valor = valor;
        
    }

    protected override IEnumerable<object> GetEqualityComponents()  
    {
        // Using a yield return statement to return each element one at a time
        yield return Valor;
        
    }
}