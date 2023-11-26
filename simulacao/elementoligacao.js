import * as THREE from "three";
export default class ElementoLigacao {
    constructor(x1, y1, z1, ri, xC1, xC2, yC1, yC2, flag) {
        const texture = new THREE.TextureLoader().load('../textures/ponteTextura.jpg');

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 8);
        const K_LIGACAO = 1.2;
        this.comprimentoElemento = K_LIGACAO * ri;
        this.orientacaoElemento = Math.atan2((yC2 - yC1), (xC2 - xC1));

        const geometry = new THREE.BoxGeometry(this.comprimentoElemento, 0.1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotateX(Math.PI / 2);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;


        this.x1PrimeiroCirculo = x1;
        this.y1PrimeiroCirculo = y1;
        this.x2SegundoCirculo = xC2;
        this.y2SegundoCirculo = yC2;




        this.mesh.position.set(x1, y1, z1 - 0.1);
        this.mesh.rotation.y = this.orientacaoElemento;

        if (flag == 1)
            this.mesh.translateX(ri / 2);

        else
            this.mesh.translateX(-ri / 2);


        this.mesh.updateMatrix();
        this.mesh.matrixAutoUpdate = false;
    }
}