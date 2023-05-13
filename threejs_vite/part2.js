import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// Creating The Scene
const scene = new THREE.Scene()

// Creating The Light
const spotLight = new THREE.SpotLight('orange', 1, 40, Math.PI / 4, 0.5, 1) 
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLight.castShadow = true
spotLight.position.set(0, 30, 0)
scene.add(spotLight,spotLightHelper)

// Creating The Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 40
camera.position.y = 10

// Creating The Renderer
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Creating The Controls
const controls = new OrbitControls(camera, renderer.domElement)

// Creating The Plane
const cheesPlaneTexture = new THREE.TextureLoader().load('data:image/png;base64,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')
const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: cheesPlaneTexture});
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
plane.rotateX(-Math.PI / 2)
plane.position.y = -1.75
scene.add(plane)

// Creating The Texture
const texture = new THREE.TextureLoader().load('https://media.istockphoto.com/id/1252844065/es/foto/fondo-abstracto-de-textura-de-pared-de-hormig%C3%B3n-marino-azul-oscuro-superficie-grunge-de-suelo.jpg?s=612x612&w=0&k=20&c=5Vx5rdCs3JkyDO8TstAAMy8sZttxw_Ak7T_NF4P-ZYY=')
const texture2 = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqfobuiuvwBfDy7Pmk25l63xfSfH9MZGph2A&usqp=CAU', function(texture2){
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping
    texture2.offset.set(0, 0)
    texture2.repeat.set(5, 5)
})


// Array of Boxes
const boxGeometry = [
    new THREE.BoxGeometry(2,2,2),
    new THREE.BoxGeometry(3,3,3),
]

// Array of Spheres
const sphereGeometry = [
    new THREE.SphereGeometry(1.5),
    new THREE.SphereGeometry(1.3),
    new THREE.SphereGeometry(1.78),
]

const material = [
    new THREE.MeshBasicMaterial(),
    new THREE.MeshLambertMaterial(),
    new THREE.MeshBasicMaterial({color: 0x6b32f3}),
]

// Boxes
const box = [
    new THREE.Mesh(boxGeometry[0], material[1]),
    new THREE.Mesh(boxGeometry[1], material[0]),
]

box[0].castShadow = true
box[1].castShadow = true

// Spheres
const sphere = [
    new THREE.Mesh(sphereGeometry[0], material[0]),
    new THREE.Mesh(sphereGeometry[1], material[1]),
    new THREE.Mesh(sphereGeometry[2], material[2]),
]

sphere[0].castShadow = true
sphere[1].castShadow = true
sphere[2].castShadow = true

material[0].map = texture
material[1].map = texture2


// Box Positions
box[0].position.x = 4
box[0].position.z = -4
box[1].position.x = -4
box[1].position.z = -4

// Sphere Positions
sphere[0].position.x = 4
sphere[0].position.z = 4
sphere[1].position.x = -4
sphere[1].position.z = 4
sphere[2].position.y = 4

scene.add(box[0], box[1], sphere[0], sphere[1], sphere[2])

const ambientLight = new THREE.AmbientLight(0x444444, 0.5)
scene.add(ambientLight)

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
    box.forEach((t) => {
        t.rotation.y += 0.01
    })
    renderer.render(scene, camera)
    stats.update()
}

animate()