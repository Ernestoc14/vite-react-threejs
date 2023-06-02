//        Project N 2
// Background Image as a Skybox  DONE
// Use of 2 Lights (SpotLight, AmbientLight) DONE
// 8 Different Objects in the Scene (Search for 3D Models)
// Extern Texture Objects (URL) DONE
// Post Processing Effects (Shaders) 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Creating the Scene
const scene = new THREE.Scene();

// Camera Position 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 45, 270);

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
const spotLight = new THREE.SpotLight('blue', 1, 40, Math.PI / 8, 0.5, 1);
spotLight.position.set(0, 30, 13);
// Add a Helper to see the Light Position
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLight, spotLightHelper);

// Plane 
const planeGeometry = new THREE.PlaneGeometry(320, 260, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 'green', side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Loading 3D Models
// House
const house = new GLTFLoader();
house.load('./3D_Models/tower_house_design.glb', function (gltf) {
    const house = gltf.scene;
    house.position.y = 1
    house.position.x = 130
    house.position.z = 100
    house.scale.set(50,60,50)
    scene.add(house);
    animate()
});

// Tent
const tent = new GLTFLoader();
tent.load('./3D_Models/tent.gltf', function (gltf) {
    const tent = gltf.scene;
    tent.position.y = 11
    tent.position.x = -140
    tent.position.z = -100
    tent.scale.set(18,18,18)
    scene.add(tent);
    animate()
});

// Need to Add Other 3D Models


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

const stats = new Stats()
document.body.appendChild(stats.dom)

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
}

animate();