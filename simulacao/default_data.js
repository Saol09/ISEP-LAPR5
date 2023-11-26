import * as THREE from "three";

export const playerData = {
    url: "./shed.glb",
    credits: "Model created by <a href='https://www.patreon.com/quaternius' target='_blank' rel='noopener'>Tomás Laulhé</a>. CC0 1.0. Modified by <a href='https://donmccurdy.com/' target='_blank' rel='noopener'>Don McCurdy</a>.",
    eyeHeight: 0.8, // % of character height
    scale: new THREE.Vector3(0.1, 0.1, 0.1),
    walkingSpeed: 0.75,
    initialDirection: 0.0, // Expressed in degrees
    turningSpeed: 75.0, // Expressed in degrees / second
    runningFactor: 2.0, // Affects walking speed and turning speed
    keyCodes: { fixedView: "Digit1", firstPersonView: "Digit2", thirdPersonView: "Digit3", topView: "Digit4", viewMode: "KeyV", userInterface: "KeyU", miniMap: "KeyM", help: "KeyH", statistics: "KeyS", run: "KeyR", left: "ArrowLeft", right: "ArrowRight", backward: "ArrowDown", forward: "ArrowUp", jump: "KeyJ", yes: "KeyY", no: "KeyN", wave: "KeyW", punch: "KeyP", thumbsUp: "KeyT" }
}

export const truckData = {

    altura: 0.1,
    localizacao: new THREE.Vector3(37.40798140255724, -22.839409176618904, 22.875),
    velocidade: 0.01,
    url: "../truck.glb",
    keyCodes: { left: "ArrowLeft", right: "ArrowRight", backward: "ArrowDown", forward: "ArrowUp" }
}