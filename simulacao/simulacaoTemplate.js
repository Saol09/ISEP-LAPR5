
import * as THREE from 'three';
import Armazem from './armazem.js';
import ElementoLigacao from './elementoligacao.js';
import Arco from './arco.js';
import Grafo from './grafo.js';
import Percursos from './percursos.js';
import Personagem from './personagem.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from './three.js-master/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './three.js-master/examples/jsm/loaders/MTLLoader.js';
import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
import merge from './merge.js';
import { truckData } from './default_data.js';


export default class SimulacaoTemplate {
    constructor() {
        let renderer;
        let camera;
        let controls;
        let scene;
        let personagem;
        let objLoader;
        let mtlLoader;
        let armazemteste;
        this.armazemList = [];
        this.elementoLigacaoList = [];
        this.arcoList = [];
        this.percursosList = [];
        this.flag = 0;



        this.truckParameters = merge(true, truckData, {});
        console.log(this.truckParameters);
        this.camiao = new Personagem(this.truckParameters);

        this.light = new THREE.SpotLight(0xFFFFFF, 1);
        objLoader = new OBJLoader();
        mtlLoader = new MTLLoader();


        this.light.position.set(50, -80, 70);
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;

        THREE.Object3D.DefaultUp.set(0, 0, 1);


        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x98A8F8);
        this.scene.fog = new THREE.FogExp2(0x98A8F8, 0.002);

        this.scene.add(this.light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);




        const density = 0.02;
        const color = 0xE9E4E3;
        this.scene.fog = new THREE.FogExp2(color, density);




        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.shadowMap.enabled = true;


        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(50, -80, 45);
        this.camera.up.set(0, 0, 1);

        // controls

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.05;

        this.controls.screenSpacePanning = false;

        this.controls.minDistance = 100;
        this.controls.maxDistance = 500;

        this.controls.maxPolarAngle = Math.PI / 2;


        // fetch('http://localhost:3000/api/percurso/listAllPercursos')
        //     .then(response => response.json())
        //     .then(dataPercurso => {
        //         // console.log("percursos");
        //         console.log(dataPercurso);
        //         this.percursosList = dataPercurso;
        //     });




        fetch('http://localhost:5000/api/Armazens/')
            .then(res => res.json())
            .then(data => {

                console.log(data);


                //ler o json com os percursos
                fetch("../dataPercurso.json")
                    .then(res => res.json())
                    .then(percurso => {





                        let count = 0;
                        let verticeGrafos = [];

                        for (let i = 0; i < data.length; i++) {


                            //adicionar +1 a count
                            count++;

                            //verticeGrafos tem todos os data id
                            verticeGrafos.push(data[i].id);
                            let latitudeConvertida = this.converteLatitude(data[i].coordenadasArmazem.latitude);
                            let longitudeConvertida = this.converteLongitude(data[i].coordenadasArmazem.longitude);
                            let altitudeConvertida = this.converteAltitude(data[i].coordenadasArmazem.altitude);
                            let armazem = new Armazem(longitudeConvertida, latitudeConvertida, altitudeConvertida, 2);
                            this.armazemList.push(armazem);


                            // Matosinhos

                            this.scene.add(armazem.mesh);

                            // add blender object

                            let scene = this.scene;
                            objLoader.load('../shed.obj', function (object) {
                                object.position.set(longitudeConvertida, latitudeConvertida, altitudeConvertida);
                                object.scale.set(0.1, 0.1, 0.1);
                                object.rotation.set(Math.PI / 2, 0, 0);
                                object.castShadow = true;
                                object.receiveShadow = true;

                                // change color of the object
                                object.traverse(function (child) {
                                    if (child instanceof THREE.Mesh) {
                                        child.material = new THREE.MeshPhongMaterial({ color: 0xF3EFE0 });
                                        child.castShadow = true;
                                    }
                                });

                                scene.add(object);


                            });

                            const fontLoader = new FontLoader();
                            fontLoader.load(
                                '../three.js-master/examples/fonts/helvetiker_bold.typeface.json',
                                (droidFont) => {


                                    const textGeometry2 = new TextGeometry(data[i].id, {
                                        size: 0.5,
                                        height: 0.1,
                                        font: droidFont,
                                    });

                                    const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
                                    let textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
                                    textMesh2.position.set(longitudeConvertida, latitudeConvertida, altitudeConvertida + 4);


                                    textMesh2.rotation.set(Math.PI / 2, 0, 0);
                                    this.scene.add(textMesh2);


                                }
                            );

                            if (i == 4) {
                                this.camiao.object.position.set(longitudeConvertida, latitudeConvertida, altitudeConvertida + 0.125);
                                console.log(longitudeConvertida);
                                console.log(latitudeConvertida);
                                console.log(altitudeConvertida);
                                this.camiao.object.rotation.x = Math.PI / 2;
                            }
                        }


                        let grafo = new Grafo(count);

                        //adicionar vertices ao grafo
                        for (let i = 0; i < data.length; i++) {
                            grafo.addVertice(verticeGrafos[i]);
                        }

                        //adicionar arestas ao grafo com percurso.idPartida e percurso.idChegada
                        for (let j = 0; j < percurso.length; j++) {
                            grafo.addAresta(percurso[j].idPartida, percurso[j].idChegada);
                        }
                        let AdjList = grafo.AdjList;
                        let chaves = AdjList.keys();
                        for (let k = 0; k < count; k++) {

                            //chaves está a esvaziar ao fim de cada iteração
                            let chaves = AdjList.keys();

                            let key = Array.from(chaves)[k];
                            // console.log(key);
                            let val1 = AdjList.get(key);

                            //  console.log(val1);

                            //get 1 value of key
                            //console.log(key);
                            if (key == data[k].id) {

                                let longitudeArmOrigem = this.converteLongitude(data[k].coordenadasArmazem.longitude);
                                let latitudeArmOrigem = this.converteLatitude(data[k].coordenadasArmazem.latitude);
                                let altitudeArmOrigem = this.converteAltitude(data[k].coordenadasArmazem.altitude);

                                for (let l = 0; l < val1.length; l++) {
                                    //console.log(val1.length);
                                    let z = 0;
                                    while (val1[l] != data[z].id) {
                                        z++;
                                    }
                                    // console.log(z);
                                    if (val1[l] == data[z].id) {

                                        let longitudeArmDestino = this.converteLongitude(data[z].coordenadasArmazem.longitude);
                                        let latitudeArmDestino = this.converteLatitude(data[z].coordenadasArmazem.latitude);
                                        let altitudeArmDestino = this.converteAltitude(data[z].coordenadasArmazem.altitude);

                                        let arco = new Arco(longitudeArmOrigem, latitudeArmOrigem, altitudeArmOrigem - 0.1, longitudeArmDestino, latitudeArmDestino, altitudeArmDestino - 0.1, 1);
                                        // console.log(arco);

                                        let elementoligacao = new ElementoLigacao(longitudeArmOrigem, latitudeArmOrigem, altitudeArmOrigem, (2.1 * 2 / 2), longitudeArmOrigem, longitudeArmDestino, latitudeArmOrigem, latitudeArmDestino, 1);
                                        this.scene.add(elementoligacao.mesh);
                                        this.elementoLigacaoList.push(elementoligacao);
                                        // console.log(elementoligacao.mesh);
                                        // console.log(arco.mesh);
                                        this.scene.add(arco.mesh);
                                        this.arcoList.push(arco);

                                    }

                                }
                            };
                        }

                    }
                    );

            });


        document.addEventListener("keydown", event => this.keyChange(event, true));

        // Register the event handler to be called on key release
        document.addEventListener("keyup", event => this.keyChange(event, false));
        window.addEventListener('resize', this.onWindowResize);
        this.isRunning = false;
        this.flag = 1;


    }



    converteLongitude(longitude) {
        return (((50 + 50)) / (8.7613 - 8.2451)) * (longitude - 8.2451) + (-50);
    }

    converteLatitude(latitude) {
        return (((50 + 50)) / (42.1115 - 40.8387)) * (latitude - 40.8387) + (-50);
    }

    converteAltitude(altitude) {
        return (50 - 0) / (800 - 0) * (altitude - 0) + 0;
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }

    keyChange(event, state) {

        if (document.activeElement == document.body) {
            if (event.code == "Space" || event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "ArrowLeft" || event.code == "ArrowUp") {
                event.preventDefault();
            }
            if (event.code == this.camiao.keyCodes.left) {
                this.camiao.keyStates.left = state;
            }
            else if (event.code == this.camiao.keyCodes.right) {
                this.camiao.keyStates.right = state;
            }
            if (event.code == this.camiao.keyCodes.backward) {
                this.camiao.keyStates.backward = state;
            }
            else if (event.code == this.camiao.keyCodes.forward) {
                this.camiao.keyStates.forward = state;
            }
        }
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    update() {
        const direction = THREE.MathUtils.degToRad(this.camiao.direction);
        if (!this.isRunning) {
            if (this.camiao.loaded) {


                this.clock = new THREE.Clock();
                this.scene.add(this.camiao.object);
                this.isRunning = true;
            }
        }

        else {
            const deltaT = this.clock.getDelta();
            //this.animations.update(deltaT);
            let directionIncrement = 75 * deltaT;

            if (this.armazemList.length != 0 && this.arcoList.length != 0 && this.elementoLigacaoList.length != 0) {

                if (this.camiao.keyStates.left) {
                    this.camiao.direction += directionIncrement;
                }
                else if (this.camiao.keyStates.right) {
                    this.camiao.direction -= directionIncrement;
                }

                else if (this.camiao.keyStates.forward) {

                    let newX, newY, newZ, newX2, newY2, newX3, newY3;


                    this.armazemList.forEach(armazem => {
                        newX = this.camiao.localizacao.x + this.camiao.velocidade * Math.cos(direction - Math.PI / 2 - .1);
                        newY = this.camiao.localizacao.y + this.camiao.velocidade * Math.sin(direction - Math.PI / 2 - .1);
                        if ((Math.pow(newX - armazem.currentX, 2) + Math.pow(newY - armazem.currentY, 2)) <= Math.pow(armazem.raio, 2)) {
                            this.camiao.localizacao.x = newX;
                            this.camiao.localizacao.y = newY;
                            // falta relacionar o Z com  altura da personagem sendo que o novo z vai ser zi + ALTURA_PERSONAGEM / 2.0.
                            this.camiao.object.position.set(newX, newY, this.camiao.object.position.z);
                            console.log("entered armazem");
                        }

                    });
                    this.elementoLigacaoList.forEach(elementoLigacao => {

                        newX2 = (newX - elementoLigacao.mesh.position.x) * Math.cos(elementoLigacao.orientacaoElemento) + (newY - elementoLigacao.mesh.position.y) * Math.sin(elementoLigacao.orientacaoElemento);
                        newY2 = (newY - elementoLigacao.mesh.position.y) * Math.cos(elementoLigacao.orientacaoElemento) - (newX - elementoLigacao.mesh.position.x) * Math.sin(elementoLigacao.orientacaoElemento);
                        if ((0 <= newX2 && newX2 <= 1.275)
                            && (-1 / 2 <= newY2 && newY2 <= 1 / 2)) {

                            console.log("entered elementoligacao");
                            this.camiao.localizacao.x = newX;
                            this.camiao.localizacao.y = newY;
                            // falta relacionar o Z com  altura da personagem sendo que o novo z vai ser zi + ALTURA_PERSONAGEM / 2.0.
                            this.camiao.object.position.set(newX, newY, this.camiao.object.position.z);
                        }

                        else {
                            this.arcoList.forEach(arco => {

                                newX3 = (newX - elementoLigacao.mesh.position.x) * Math.cos(elementoLigacao.orientacaoElemento) + (newY - elementoLigacao.mesh.position.y) * Math.sin(elementoLigacao.orientacaoElemento);
                                newY3 = (newY - elementoLigacao.mesh.position.y) * Math.cos(elementoLigacao.orientacaoElemento) - (newX - elementoLigacao.mesh.position.x) * Math.sin(elementoLigacao.orientacaoElemento);

                            });
                            // this.arcoList.forEach(arco => {
                            //     newX3 = (newX - elementoLigacao.mesh.position.x) * Math.cos(elementoLigacao.orientacaoElemento) + (newY - elementoLigacao.mesh.position.y) * Math.sin(elementoLigacao.orientacaoElemento);
                            //     newY3 = (newY - elementoLigacao.mesh.position.y) * Math.cos(elementoLigacao.orientacaoElemento) - (newX - elementoLigacao.mesh.position.x) * Math.sin(elementoLigacao.orientacaoElemento);
                            //     newZ = this.camiao.object.position.z + this.camiao.velocidade * Math.sin(direction - Math.PI / 2 - .1);

                            //     if ((newX3 >= arco.comprimentoArco)) {

                            //         console.log("entered arco");
                            //         this.camiao.localizacao.x = newX;
                            //         this.camiao.localizacao.y = newY;
                            //         this.camiao.localizacao.z = newZ;
                            //         this.camiao.object.position.set(newX, newY, newZ);
                            //     }
                            // });
                        }
                    });


                }
                else if (this.camiao.keyStates.backward) {

                }

            }

            // colocar aqui forward 
        }





        this.camiao.object.rotation.y = direction;
    }
}
