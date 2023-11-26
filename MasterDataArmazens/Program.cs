using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using MasterDataArmazens.Domain.Entregas;

namespace MasterDataArmazens
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
             //  builder.Services.AddScoped<EntregaController, EntregaService>();
    }
}
