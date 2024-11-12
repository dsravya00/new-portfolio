

// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// Import Three.js and add-ons
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

// Declare global variables
// Declare global variables
let scene, camera, renderer, squareballs, mixer; // Add 'mixer' for animation
let scrollAmount = 0;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.
	Color(0xFFFFFF);  // White background

    // Camera setup
    camera = new THREE.PerspectiveCamera(20, 15 / 10, 0.1, 1000);
	// PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100,150,100);  // Adjusted camera position to view the model
	// camera.position.set(100,150,100);  // Adjusted camera position to view the model

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("scene-container").appendChild(renderer.domElement);

    // Lighting setup
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 5);  // Position light to properly illuminate the model
    scene.add(light);

    // OrbitControls for rotating the scene
    const controls = new OrbitControls(camera, renderer.domElement);

    // GLTFLoader to load 3D model
    const loader = new GLTFLoader();

    // Load the 3D model and its animation
    loader.load('assets/sqaureballs/sqaureballs.gltf', function(gltf) {
        squareballs = gltf.scene;  // Store the loaded model
        scene.add(squareballs);    // Add the model to the scene
        squareballs.scale.set(5, 5, 5);  // Scale the model to fit the view

        // Initialize the AnimationMixer
        mixer = new THREE.AnimationMixer(squareballs);

        // Loop through all animations in the GLTF file and add them to the mixer
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();  // Play the first animation found
        });

    }, undefined, function(error) {
        console.error('Error loading model:', error);
    });

    // Window resize event
    window.addEventListener('resize', onWindowResize, false);

    // Scroll event to move model with scroll
    window.addEventListener('wheel', function(event) {
        scrollAmount = event.deltaY * 0.01;  // Adjust scroll speed multiplier
    });

    // Start the animation loop //given animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Update the animation mixer to play the loaded animations
    if (mixer) {
        mixer.update(0.01); // The value passed to update controls the speed of the animation
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Resize event to adjust camera and renderer on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the scene and start the animation
init();


// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// squareballs = new THREE.Mesh(geometry, material);
// scene.add(squareballs);

