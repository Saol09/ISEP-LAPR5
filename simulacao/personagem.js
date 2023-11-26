import * as THREE from "three";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from './three.js-master/examples/jsm/loaders/OBJLoader.js';


export default class Personagem {
    constructor(parameters) {
        function onLoad(camiao, description) {
            camiao.object = description.scene;
            camiao.animations = description.animations;

            // Turn on shadows for this object
            camiao.setShadow(camiao.object);

            // Get the object's axis-aligned bounding box (AABB) in 3D space
            const box = new THREE.Box3();
            box.setFromObject(camiao.object); // This function may result in a larger box than strictly necessary: https://threejs.org/docs/#api/en/math/Box3.setFromObject

            // Compute the object size
            const size = new THREE.Vector3();
            box.getSize(size);

            camiao.direction = 0.0;
            camiao.currentX = 0.0;
            camiao.currentY = 0.0;
            camiao.currentZ = 0.0;
            // Adjust the object's oversized dimensions (hard-coded; see previous comments)
            // camiao.radius = 1.5 * camiao.scale.x; // Should be: player.radius = size.x * player.scale.x; alternatively: player.radius = size.z * player.scale.z

            // // Set the object's eye height
            // camiao.eyeHeight *= size.y * camiao.scale.y;

            camiao.object.scale.set(0.1, 0.1, 0.1);
            camiao.loaded = true;
        }

        function onProgress(url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        function onError(url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.initialDirection = THREE.MathUtils.degToRad(this.initialDirection);
        this.keyStates = { left: false, right: false, backward: false, forward: false };

        // Create a resource .gltf or .glb file loader
        const loader = new GLTFLoader();

        // Load a model description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => onLoad(this, description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)
        );
    }

    setShadow(object) {
        object.traverseVisible(function (child) { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
            if (child.material) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        });
    }
}