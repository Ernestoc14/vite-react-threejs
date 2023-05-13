import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene()
//Add Spot Light
const light = new THREE.SpotLight()
scene.add(light)
const helper = new THREE.SpotLightHelper(light)
scene.add(helper)

//Camera Position
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 40
camera.position.y = 10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshPhongMaterial({color: 0xF08080, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotateX(-Math.PI / 2)
plane.position.y = -1.75
scene.add(plane)

// Array of Geometries
const boxTorusGeometry = [
    new THREE.BoxGeometry(),
    new THREE.TorusGeometry(),
    new THREE.BoxGeometry(),
    new THREE.TorusGeometry(),
    new THREE.BoxGeometry(),
]

const material = [
    new THREE.MeshBasicMaterial(),
    new THREE.MeshLambertMaterial(),
    new THREE.MeshPhongMaterial(),
    new THREE.MeshPhysicalMaterial({}),
    new THREE.MeshToonMaterial(),
]

const torus = [
    new THREE.Mesh(boxTorusGeometry[0], material[0]),
    new THREE.Mesh(boxTorusGeometry[1], material[1]),
    new THREE.Mesh(boxTorusGeometry[2], material[2]),
    new THREE.Mesh(boxTorusGeometry[3], material[3]),
    new THREE.Mesh(boxTorusGeometry[4], material[4]),
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
    // render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const data = {
    color: light.color.getHex(),
    mapsEnabled: true,
}

//Set up Spot Light 1 + Helper
const spotLight = new THREE.SpotLight('blue', 1, 20, Math.PI / 8, 0.5, 1)
spotLight.position.set(0, 10, 0)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLight, spotLightHelper)

//Set up Spot Light 2 + Helper2
const spotLight2 = new THREE.SpotLight(0xf2c638, 1, 40, Math.PI / 8, 0.5, 1)
spotLight2.position.set(20, 15, 0)
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2)
scene.add(spotLight2, spotLightHelper2)


const gui = new GUI()
const lightFolder = gui.addFolder('THREE.Light')
lightFolder.addColor(data, 'color').onChange(() => {
    light.color.setHex(Number(data.color.toString().replace('#', '0x')))
})

lightFolder.add(light, 'intensity', 0, 1, 0.01)
lightFolder.open()

const spotLightFolder = gui.addFolder('THREE.SpotLight')
spotLightFolder.add(light, 'distance', 0, 100, 0.01)
spotLightFolder.add(light, 'decay', 0, 4, 0.1)
spotLightFolder.add(light, 'angle', 0, 1, 0.1)
spotLightFolder.add(light, 'penumbra', 0, 1, 0.1)
spotLightFolder.add(light.position, 'x', -50, 50, 0.01)
spotLightFolder.add(light.position, 'y', -50, 50, 0.01)
spotLightFolder.add(light.position, 'z', -50, 50, 0.01)
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
    helper.update()
    controls.update()
    torus.forEach((t) => {
        t.rotation.y += 0.008
    })

    renderer.render(scene, camera)
    stats.update()
}

animate()