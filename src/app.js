import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import './style.css'

//Loading Manager 
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart =()=>{}

//Textures
const textureLoader = new THREE.TextureLoader()

//Fonts
const fontsLoader = new FontLoader()

fontsLoader.load(
    '/fonts/gentilis_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            "Alone",
            {
                font: font,
                size: 9,
                depth: 0.002,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshStandardMaterial()
        
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(-16,0,-5)
        scene.add(text)
        
    }
)


//DAT.GUI Console
const gui = new dat.GUI({ closed : true, width: 400})
gui.hide()
const debugObjects ={ 
    color: 0xffff00
    } 


gui
    .addColor(debugObjects, 'color')
    .onChange(() => {
    donutMaterial.color.set(debugObjects.color)
    })
    .name('Donut Color')

// Cursor
const cursor = { x: 0, y:0}
window.addEventListener("mousemove",(event) => {
    cursor.x=event.clientX/sizes.width -0.5
    cursor.y=-(event.clientY/sizes.height -0.5)
    // console.log(cursor.x, cursor.y)
})
// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Lights
const ambientLight = new THREE.AmbientLight({
    color: 0xffff00,
    intensity: 1
})

scene.add(ambientLight)
// Objects
const donuts = new THREE.Group()
donuts.position.set(0, 0, 0)

// Object Properties
const donutGeometry = new THREE.TorusGeometry(1,0.65,16,48,50)
const donutMaterial = new THREE.MeshStandardMaterial({
    color: '#ffff00'
})

const cubeGeometry = new THREE.BoxGeometry(1, 6, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: debugObjects.color
})

const floorGeometry = new THREE.PlaneGeometry(100,100)
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x999999,
})

//Object Instances
const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)
donutMesh.position.set(2.5, 0, 0)
const donut1Mesh = new THREE.Mesh(donutGeometry, donutMaterial)
donut1Mesh.position.set(-2.5, 0, 0)
const floorMesh = new THREE.Mesh(floorGeometry,floorMaterial)
floorMesh.rotation.x = Math.PI * -0.5
floorMesh.position.y = -10
scene.add(floorMesh)
donuts.add(donutMesh)
donuts.add(donut1Mesh)

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.position.set(0, -2, 0)
scene.add(cubeMesh)

scene.add(donuts)

//donuts Debug
gui
    .add(cubeMesh, 'visible')
    .name('Cube')

// Camera
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height,0.1 ,250)
camera.position.set(2, 2, 50)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Time
const clock = new THREE.Clock()

// Animation
const animate = () => {
    // Frames
    const deltaTime = clock.getElapsedTime()

    donuts.rotation.y= 0.2 * deltaTime
    // donuts.rotation.x=0.2 * deltaTime
      window.requestAnimationFrame(animate)
    controls.update()    
    renderer.render(scene, camera)
}

animate()