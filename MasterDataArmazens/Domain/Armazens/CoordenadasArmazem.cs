using MasterDataArmazens.Domain.Shared;
using System.Collections.Generic;

namespace MasterDataArmazens.Domain.Armazens;
public class CoordenadasArmazem : ValueObject
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Altitude { get; set; }

    public CoordenadasArmazem() { }

    public CoordenadasArmazem(double latitude, double longitude, double altitude)
    {
        ValidarCoordenadas(latitude, longitude, altitude);
        Latitude = latitude;
        Longitude = longitude;
        Altitude = altitude;
    }

    public void ValidarCoordenadas(double latitude, double longitude, double altitude)
    {

        if (latitude < -90 || latitude > 90)
            throw new BusinessRuleValidationException("A latitude tem de ser um valor entre -90 e 90.");
        if (longitude < -180 || longitude > 180)
            throw new BusinessRuleValidationException("A longitude tem de ser um valor entre -90 e 90.");
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Latitude;
        yield return Longitude;
        yield return Altitude;

    }
}