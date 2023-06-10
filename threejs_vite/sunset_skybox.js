//        Project N 2
// Background Image as a Skybox  DONE
// Use of 2 Lights (SpotLight, AmbientLight) DONE
// 8 Different Objects in the Scene (Search for 3D Models) DONE
// Extern Texture Objects (URL) DONE
// Post Processing Effects (Shaders) 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';

// Creating the Scene
const scene = new THREE.Scene();

const stats = new Stats()
document.body.appendChild(stats.dom)

// Camera Position 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 70, 400);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x505050, 0.5);
scene.add(ambientLight);

// Spot Light
const spotLight = new THREE.SpotLight('blue', 1, 70, Math.PI / 8, 0.5, 1);
spotLight.position.set(-14, 12, 50);
spotLight.target.position.set(-68, -14, 80);

//Spot Light 2
const spotLight2 = new THREE.SpotLight('red', 1, 70, Math.PI / 8, 0.5, 1);
spotLight2.position.set(-14, 12, 50);
// spotLight.rotateX(-Math.PI / 4);
// Add a Helper to see the Light Position
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight, spotLightHelper);

// Plane 
const planeGeometry = new THREE.BoxGeometry(500, 400, 5);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 'pink', side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2;
plane.position.y = -1.5;
// scene.add(plane);

// Loading 3D Models
// Map - 1
const nuketown = new GLTFLoader();
nuketown.load('./3D_Models/nuketown.glb', function (gltf) {
    const nuketown = gltf.scene;
    nuketown.scale.set(0.09, 0.09, 0.09)
    scene.add(nuketown);
    animate()
});

// House -2
const house = new GLTFLoader();
house.load('./3D_Models/tower_house_design.glb', function (gltf) {
    const house = gltf.scene;
    house.position.y = 1
    house.position.x = 105
    house.position.z = 95
    house.scale.set(50,60,50)
    scene.add(house);
    animate()
});

// Tent - 3
const tent = new GLTFLoader();
tent.load('./3D_Models/tent.gltf', function (gltf) {
    const tent = gltf.scene;
    tent.position.y = 11
    tent.position.x = -240
    tent.position.z = -200
    tent.scale.set(18,18,18)
    scene.add(tent);
    animate()
});

//Truck - 4
const truck = new GLTFLoader();
truck.load('./3D_Models/cybertruck.gltf', function (gltf) {
    const truck = gltf.scene;
    truck.position.y = 1
    truck.position.x = 125
    truck.rotateY(.29)
    truck.position.z = -45
    truck.scale.set(5,5,5)
    scene.add(truck);
    animate()
});

// Bus - 5
const bus = new GLTFLoader();
bus.load('./3D_Models/destroyed_bus_01.glb', function (gltf) {
    const bus = gltf.scene;
    bus.position.y = 1
    bus.position.x = 45
    bus.rotateY(.6)
    bus.position.z = 10
    bus.scale.set(5,5,5)
    scene.add(bus);
    animate()
});

// Car - 6
const car = new GLTFLoader();
car.load('./3D_Models/cardest.glb', function (gltf) {
    const car = gltf.scene;
    car.position.y = 1
    car.position.x = -140
    car.rotateY(.6)
    car.position.z = 50
    car.scale.set(11,11,11)
    scene.add(car);
    animate()
});

// Truck2 - 7
const truck2 = new GLTFLoader();
truck2.load('./3D_Models/schoolar.glb', function (gltf) {
    const truck2 = gltf.scene;
    truck2.position.y = 8
    truck2.rotateY(5.29)
    truck2.position.x = -45
    truck2.position.z = -4
    truck2.scale.set(7,7,7)
    scene.add(truck2);
    animate()
});

// Light Post - 8
const lightpost = new GLTFLoader();
lightpost.load('./3D_Models/light_post.glb', function (gltf) {
    const lightpost = gltf.scene;
    lightpost.position.y = -2
    lightpost.position.x = -14
    lightpost.position.z = 50
    lightpost.scale.set(.01,.01,.01)
    scene.add(lightpost);
    animate()
});

// Post Processing Effects
// const composer = new EffectComposer(renderer);
// const glitchPass = new GlitchPass();
// composer.addPass(glitchPass);

// const luminosityPass = new ShaderPass(LuminosityShader);
// composer.addPass(luminosityPass);

// Skybox
// blosunrise_z6urem.hdr or sunrise_zu4fai.hdr
const skybox = new RGBELoader().load('https://res.cloudinary.com/djsqgd1lq/raw/upload/v1685080720/mern/Skybox/blosunrise_z6urem.hdr', function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.background = envMap;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
});
scene.background = skybox;
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}



// GUI Controls
const gui = new GUI()
const spotLightFolder = gui.addFolder('THREE.SpotLight')
spotLightFolder.add(spotLight, 'distance', 0, 100, 0.01)
spotLightFolder.add(spotLight, 'decay', 0, 4, 0.1)
spotLightFolder.add(spotLight, 'angle', 0, 1, 0.1)
spotLightFolder.add(spotLight, 'penumbra', 0, 1, 0.1)
spotLightFolder.add(spotLight.position, 'x', -50, 50, 0.01)
spotLightFolder.add(spotLight.position, 'y', -50, 50, 0.01)
spotLightFolder.add(spotLight.position, 'z', -50, 50, 0.01)
spotLightFolder.open()

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    stats.update()
    spotLightHelper.update()
    renderer.render(scene, camera);
    composer.render();
}

animate();