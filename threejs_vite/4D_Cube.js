import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var renderer, sceneA, sceneB, sceneC, camera, controls

function init() {
    //renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.autoClear = false
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    //scenes
    sceneA = new THREE.Scene()
    sceneB = new THREE.Scene()
    sceneC = new THREE.Scene()
    sceneA.background = new THREE.Color('gray')

    //camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 0, 40)

    //controls
    controls = new OrbitControls(camera, renderer.domElement)
    const materialA = new THREE.MeshStandardMaterial({color: 0xff0000})
    const materialB = new THREE.MeshStandardMaterial({color: 0x00ff00, flatShading: true})
    const materialC = new THREE.MeshStandardMaterial({color: 0x00ff00, flatShading: true, transparent: true, opacity: 0.5})
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 30, 30), materialA)

    const box = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), materialB)
    sceneB.add(box)

    const boxC = new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), materialC)
    sceneC.add(boxC)

    //lights
    const lightA = new THREE.DirectionalLight(0xffffff, 1, 100)
    const lightB = new THREE.DirectionalLight(0xffffff, 1, 100)
    const lightC = new THREE.DirectionalLight(0xffffff, 1, 100)
    lightA.position.set(10,5,2)
    lightB.position.set(10,5,2)
    lightC.position.set(10,5,2)
    sceneA.add(sphere, lightA)
    sceneB.add(box, lightB)
    sceneC.add(boxC, lightC)
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(sceneB, camera)
    renderer.clearDepth()
    renderer.render(sceneA, camera)
    renderer.clearDepth()
    renderer.render(sceneC, camera)
}

init()
animate()