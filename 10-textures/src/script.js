import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import colorImage from "../static/textures/door/color.jpg"
import alphaImage from "../static/textures/door/alpha.jpg"
import heightImage from "../static/textures/door/height.jpg"
import normalImage from "../static/textures/door/normal.jpg"
import ambientOcclusionImage from "../static/textures/door/ambientOcclusion.jpg"
import metalnessImage from "../static/textures/door/metalness.jpg"
import roughnessImage from "../static/textures/door/roughness.jpg"
import color2Image from "../static/textures/checkerboard-1024x1024.png"
import color3Image from "../static/textures/minecraft.png"

import guImage from "../static/textures/door/gu.png"

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log("on start")
// }
// loadingManager.onProgress = () => {
//     console.log("on Progress")
// }
// loadingManager.onLoad = () => {
//     console.log("on Load")
// }
// loadingManager.onError = () => {
//     console.log("on Error")
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(colorImage)
const color2Texture = textureLoader.load(color2Image)
const color3Texture = textureLoader.load(color3Image)
const alphaTexture = textureLoader.load(alphaImage)
const heightTexture = textureLoader.load(heightImage)
const normalTexture = textureLoader.load(normalImage)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImage)
const metalnessTexture = textureLoader.load(metalnessImage)
const roughnessTexture = textureLoader.load(roughnessImage)

const guTexture = textureLoader.load(guImage)

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.Y = 0.5

// colorTexture.rotation = - Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

color3Texture.generateMipmaps = false
color3Texture.minFilter = THREE.NearestFilter
color3Texture.magFilter = THREE.NearestFilter

// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () => {
//     texture.needsUpdate = true
// }

// image.src = imageSource

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
const material = new THREE.MeshBasicMaterial({ map: color3Texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()