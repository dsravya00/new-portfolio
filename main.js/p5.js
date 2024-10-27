

// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



let scene, camera, renderer, cube; 

function init() {

// ~~~~~~~~~~~~~~~~Set up scene, camera, + renderer~~~~~~~~~~~~~~~~

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize(window.innerWidth, window.innerHeight);

document.querySelector("#three-container").appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~

const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader(); // to load 3d models



// ~~~~~~~~~~~~~~~~ Create Geometry ~~~~~~~~~~~~~~~~
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const texture = new THREE.textureLoader().load(texture/);
// const material = new THREE.MeshBasicMaterial({ map: texture}); 
cube = new THREE.Mesh(geometry, material);
scene.add(cube);



// ~~~~~~~~~~~~~~~~Position Camera~~~~~~~~~~~~~~~~
camera.position.z = 5;  

}



// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    camera.position.z += .03;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;



    // always end animation loop with renderer
    renderer.render(scene, camera);
}

function onWindowResize() {
camera.aspect = window.innerWidth / window/innerHeight; 
camera.updateProjectionMatrix(); 
renderer.setSize(window.innerWidth, window.innerHeight);

}


window.addEventListener( 'resize', onWindowResize, false);

init();
animate(); // execute animation function





///////


