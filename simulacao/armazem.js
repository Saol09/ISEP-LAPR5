import * as THREE from "three";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from './three.js-master/examples/jsm/loaders/OBJLoader.js';



export default class Armazem {
    constructor(xi, yi, zi, wi) {

        this.currentX = xi;
        this.currentY = yi;
        this.currentZ = zi;
        this.largura = wi;
        const texture = new THREE.TextureLoader().load('../textures/circuloTextura.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        const K_CIRCULO = 2.1;
        this.raio = K_CIRCULO * wi / 2;
        const geometry = new THREE.CylinderGeometry(this.raio, this.raio, .1, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        material.map = texture;
        material.flatShading = true;

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(xi, yi, zi);
        this.mesh.rotateX(Math.PI / 2);
        this.mesh.updateMatrix();
        this.mesh.matrixAutoUpdate = false;
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }


}
