import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const group = new THREE.Group()
// scene.add(group)
// group.position.y = 0
// group.rotation.y = Math.PI

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false }),
// )
// group.add(cube1)

// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)

// const geometry = new THREE.BufferGeometry()

// const count = 5000
// const positionsArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = Math.random() - 0.5
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute("position", positionsAttribute)

const geometry = new THREE.SphereGeometry(1)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true  })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position
// mesh.position.set(0.7, - 0.6, 1)

// Scale
// mesh.scale.set(2, 0.5, 0.5)

// Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25

//  Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


/**
 * Sizes
 */
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update render
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("dblclick", (event) => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

/**
 * Camera
 */
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2, 0.1, 100)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock()

// Animation
// gsap.to(mesh.position, {
//   duration: 1,
//   delay: 1,
//   x: 2
// })


// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime()

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)

  // Update objects
  // mesh.rotation.reorder('YXZ')
  // mesh.position.y = Math.sin(elapsedTime / 2)
  // mesh.rotation.y = elapsedTime
  // mesh.rotation.y = Math.cos(elapsedTime)
  // mesh.rotation.y += 0.01

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()