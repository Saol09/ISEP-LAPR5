import * as THREE from "three";

export default class Arco {
  constructor(x1, y1, z1, x2, y2, z2, largura) {

    this.comprimentoPlanoOXY = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)) - (2.1 * 2 / 2 * 1.1) - (2.1 * 2 / 2 * 1.1);
    this.desnivelArco = z2 - z1;
    this.comprimentoArco = Math.sqrt(Math.pow(this.comprimentoPlanoOXY, 2) + Math.pow(this.desnivelArco, 2));
    this.orientacao = Math.atan2((y2 - y1), (x2 - x1));
    this.inclinacao = Math.atan(this.desnivelArco / this.comprimentoPlanoOXY);

    // Basicamente o arco tem de ir de x1, y1, z1 a x2, y2, z2


    const texture = new THREE.TextureLoader().load('../textures/estradaTextura.jpg');
    texture.rotation = Math.PI / 2;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 20);

    const geometry = new THREE.BoxGeometry(this.comprimentoArco, largura, .1);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.mesh = new THREE.Mesh(geometry, material);
    /* 
     this.mesh.rotateX(Math.PI / 2);
 
     this.mesh.rotation.z = inclinacao;
     this.mesh.rotation.y = orientacao;*/


    let euler = new THREE.Euler(0, -this.inclinacao, this.orientacao, 'ZYX');
    this.mesh.rotation.copy(euler);
    this.mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    /*  const axesHelper = new THREE.AxesHelper(5);
      this.mesh.add(axesHelper);*/


    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = false;



  }
}