//        Project N 2
// Background Image as a Skybox  DONE
// Use of 2 Lights (SpotLight, AmbientLight) DONE
// 5 Different Objects in the Scene (Search for 3D Models)
// Extern Texture Objects (URL)
// Post Processing Effects (Shaders)

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// Creating the Scene
const scene = new THREE.Scene();

// Camera Position 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 45, 70);

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
scene.add(spotLight, spotLightHelper);

// Plane 
const planeGeometry = new THREE.PlaneGeometry(60, 60, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 'pink', side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Cube
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 'red' });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(0, 4.5, 10);
scene.add(cube)

// Skybox
const skyboxGeometry = new THREE.BoxGeometry(500, 500, 500);
const skyboxMaterial =
[
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://res.cloudinary.com/djsqgd1lq/image/upload/v1685028637/mern/Skybox/front_cxpyb2.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://res.cloudinary.com/djsqgd1lq/image/upload/v1685028637/mern/Skybox/back_zqjskv.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./Skybox/topp.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://res.cloudinary.com/djsqgd1lq/image/upload/v1685028637/mern/Skybox/bottom_d5ubx8.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://res.cloudinary.com/djsqgd1lq/image/upload/v1685028637/mern/Skybox/right_eu4dnf.png'), side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('https://res.cloudinary.com/djsqgd1lq/image/upload/v1685028637/mern/Skybox/left_ldzhrp.png'), side: THREE.DoubleSide }),
];
const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const stats = new Stats()
document.body.appendChild(stats.dom)

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
}

animate();