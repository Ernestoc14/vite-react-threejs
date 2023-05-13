import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// Creating The Scene
const scene = new THREE.Scene()

// Creating The Light
const spotLight = new THREE.SpotLight(0xc6f2b8, 1, 40, Math.PI / 4, 0.5, 1) 
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLight,spotLightHelper)

// Creating The Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 40
camera.position.y = 10

// Creating The Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Creating The Controls
const controls = new OrbitControls(camera, renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshPhongMaterial({color: 0xF08080, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotateX(-Math.PI / 2)
plane.position.y = -1.75
scene.add(plane)

const torusGeometry = [
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
]

const material = [
    new THREE.MeshBasicMaterial(),
    new THREE.MeshLambertMaterial(),
    new THREE.MeshPhongMaterial(),
    new THREE.MeshPhysicalMaterial({}),
    new THREE.MeshToonMaterial(),
]

const torus = [
    new THREE.Mesh(torusGeometry[0], material[0]),
    new THREE.Mesh(torusGeometry[1], material[1]),
    new THREE.Mesh(torusGeometry[2], material[2]),
    new THREE.Mesh(torusGeometry[3], material[3]),
    new THREE.Mesh(torusGeometry[4], material[4]),
]

const texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/fondos-y-textura-o-fondo-de-madera-del-concepto-texturas-201462012.jpg')
material[0].map = texture
material[1].map = texture
material[2].map = texture
material[3].map = texture
material[4].map = texture

torus[0].position.x = -8
torus[1].position.x = -4
torus[2].position.x = 0
torus[3].position.x = 4
torus[4].position.x = 8

scene.add(torus[0])
scene.add(torus[1])
scene.add(torus[2])
scene.add(torus[3])
scene.add(torus[4])

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const data = {
    color: spotLight.color.getHex(),
    mapsEnabled: true,
}

const gui = new GUI()
const lightFolder = gui.addFolder('THREE.Light')
lightFolder.addColor(data, 'color').onChange(() => {
    light.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
lightFolder.add(spotLight, 'intensity', 0, 1, 0.01)
lightFolder.open()
const spotLightFolder = gui.addFolder('THREE.SpotLight')
spotLightFolder.add(spotLight, 'distance', 0, 100, 0.01)
spotLightFolder.add(spotLight, 'decay', 0, 4, 0.1)
spotLightFolder.add(spotLight, 'angle', 0, 1, 0.1)
spotLightFolder.add(spotLight, 'penumbra', 0, 1, 0.1)
spotLightFolder.add(spotLight.position, 'x', -50, 50, 0.01)
spotLightFolder.add(spotLight.position, 'y', -50, 50, 0.01)
spotLightFolder.add(spotLight.position, 'z', -50, 50, 0.01)
spotLightFolder.open()
const meshesFolder = gui.addFolder('Meshes')
meshesFolder.add(data, 'mapsEnabled').onChange(() => {
    material.forEach((m) => {
        if (data.mapsEnabled) {
            m.map = texture
        } else {
            m.map = null
        }
        m.needsUpdate = true
    })
})

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    spotLightHelper.update()
    torus.forEach((t) => {
        t.rotation.y += 0.01
    })
    renderer.render(scene, camera)
    stats.update()
}

animate()