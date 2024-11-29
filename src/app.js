import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import './style.css'

//Loading Manager 
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart =()=>{}

//Textures
const textureLoader = new THREE.TextureLoader()

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

// Objects
const donuts = new THREE.Group()
donuts.position.set(0, 0, 0)

// Object Properties
const donutGeometry = new THREE.TorusGeometry(1,0.65,16,48,50)
const donutMaterial = new THREE.MeshBasicMaterial({
    color: '#ffff00'
})

const cubeGeometry = new THREE.BoxGeometry(1, 6, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: debugObjects.color
})

//Object Instances
const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)
donutMesh.position.set(2.5, 0, 0)
const donut1Mesh = new THREE.Mesh(donutGeometry, donutMaterial)
donut1Mesh.position.set(-2.5, 0, 0)
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
camera.position.set(2, 2, 3)
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