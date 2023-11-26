using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using System.Linq;
using Moq;
using MasterDataArmazens.Controllers;
using MasterDataArmazens.Domain.Armazens;


using MasterDataArmazens.Domain.Shared;


namespace tests.ArmazemControllerTest
{
    [Collection("Sequential")]
    public class ArmazemControllerTest
    {
        private ArmazemService mockService;
        private readonly IUnitOfWork mockiunitofWork;
        private readonly IArmazemRepository mockrepository;


        List<Armazem> testList;


        public ArmazemControllerTest()
        {
            testList = new List<Armazem>();
            Armazem armazem = new Armazem("001", new DesignacaoArmazem("Porto"), new EnderecoArmazem("Rua fixe do porto", "18", "Porto", "4512-123", "Portugal"),
              new CoordenadasArmazem(40, 40, 0));
            Armazem armazem1 = new Armazem("002", new DesignacaoArmazem("Cucujaes"), new EnderecoArmazem("Rua fixe de cucujaes", "20", "Cucujaes", "4552-124", "Portugal"),
            new CoordenadasArmazem(30, 30, 0));

            testList.Add(armazem);
            testList.Add(armazem1);

            var repository1 = new Mock<IArmazemRepository>();
            repository1.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testList));
            repository1.Setup(x => x.GetByIdAsync(testList[0].Id)).Returns(Task.FromResult(testList[0]));

            mockrepository = repository1.Object;
            var uw = new Mock<IUnitOfWork>();
            uw.Setup(z => z.CommitAsync()).Returns(Task.FromResult(1));
            mockiunitofWork = uw.Object;
            mockService = new ArmazemService(mockiunitofWork, mockrepository);

        }

        [Fact]
        public async Task GetAllAsyncArmazens()
        {
            //Arrange
            var theController = new ArmazensController(mockService);
            //Act
            var result = await theController.GetAll();
            //Assert
            var tags = Assert.IsType<List<ArmazemDTO>>(result.Value);
            Assert.Equal(2, tags.Count());
        }
        [Fact]
        public async Task GetByIDArmazens()
        {

            var theController = new ArmazensController(mockService);

            string id = "001";
            var result = await theController.GetGetById(id);

            Assert.IsType<ArmazemDTO>(result.Value);
        }
    }
}
