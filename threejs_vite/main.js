import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);

const geometry =  new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 'green' , wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(5, 5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({color: 'gray', side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotateX( - Math.PI / 2);
plane.position.y = -0.55;

window.addEventListener('resize', 
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer()
    },  false
);  

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.scale, 'x', -5, -5);
cubeFolder.add(cube.scale, 'y', -5, -5);
cubeFolder.add(cube.scale, 'z', -5, -5);
cubeFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.0001;
    // cube.rotation.y += 0.4;
    controls.update();
    render()
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();