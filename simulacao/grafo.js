export default class Grafo {

  //consturctor recebe numero de vertices
  constructor(nVertices) {
    this.nVertices = nVertices;
    this.AdjList = new Map();
  }

  //funcao para adicionar arestas
  addAresta(vertice, aresta) {
    //obtem o array para o vertice e adiciona a aresta
    this.AdjList.get(vertice).push(aresta);
    this.AdjList.get(aresta).push(vertice);
  }

  //funcao para adicionar vertices
  addVertice(vertice) {
    //inicializa o vertice com um array vazio
    this.AdjList.set(vertice, []);
  }

  //funcao para imprimir o grafo
  printGrafo() {
    //obtem todos os vertices
    var nVertices = this.AdjList.keys();

    //para cada vertice
    for (var n of nVertices) {

      //obtem o array de arestas para o vertice	
      var getValues = this.AdjList.get(n);

      //imprime o vertice e suas arestas
      var conc = "";
      for (var j of getValues)
        conc += j + " ";
      console.log(n + " -> " + conc);
    }
  }
}