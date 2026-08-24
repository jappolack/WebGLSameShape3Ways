import * as THREE from 'https://unpkg.com/three@0.167.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.167.1/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0, 8);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

// =====================================================
// 1. Square using TWO TRIANGLES
// =====================================================

const geometry1 = new THREE.BufferGeometry();

const vertices1 = new Float32Array([
    -1,-1,0,
     1,-1,0,
     1, 1,0,

    -1,-1,0,
     1, 1,0,
    -1, 1,0
]);

const colors1 = new Float32Array([
    1,0,0,
    1,0,0,
    1,0,0,

    0,0,1,
    0,0,1,
    0,0,1
]);

geometry1.setAttribute(
    'position',
    new THREE.BufferAttribute(vertices1,3)
);

geometry1.setAttribute(
    'color',
    new THREE.BufferAttribute(colors1,3)
);

const square1 = new THREE.Mesh(
    geometry1,
    new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide
    })
);

square1.position.x = -3;
scene.add(square1);

// =====================================================
// 2. Square using INDEXED GEOMETRY
// =====================================================

const geometry2 = new THREE.BufferGeometry();

const vertices2 = new Float32Array([
    -1,-1,0,
     1,-1,0,
     1, 1,0,
    -1, 1,0
]);

const colors2 = new Float32Array([
    1,0,0,
    0,1,0,
    0,0,1,
    1,1,0
]);

geometry2.setAttribute(
    'position',
    new THREE.BufferAttribute(vertices2,3)
);

geometry2.setAttribute(
    'color',
    new THREE.BufferAttribute(colors2,3)
);

geometry2.setIndex([
    0,1,2,
    0,2,3
]);

const square2 = new THREE.Mesh(
    geometry2,
    new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide
    })
);

scene.add(square2);

// =====================================================
// 3. Square using PLANE GEOMETRY
// =====================================================

const geometry3 = new THREE.PlaneGeometry(2,2);

const square3 = new THREE.Mesh(
    geometry3,
    new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide,
        wireframe: false
    })
);

square3.position.x = 3;
scene.add(square3);

// Add outlines
function addOutline(mesh) {

    const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry),
        new THREE.LineBasicMaterial({
            color: 0xffffff
        })
    );

    mesh.add(edges);
}

addOutline(square1);
addOutline(square2);
addOutline(square3);

// Animation Loop
function animate() {

    requestAnimationFrame(animate);

    square1.rotation.y += 0.01;
    square2.rotation.y += 0.01;
    square3.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});