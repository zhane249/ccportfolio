//THREE.js Library and code modified from Gabriel Molter youtube https://www.youtube.com/watch?v=lGokKxJ8D2c&t=1s
import * as THREE from "http://cdn.skypack.dev/three@0.129.0/build/three.modules.js";
//camera
import { OrbitControls } from "http://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//gltf file
import { GLTFLoader } from "http://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//initialize gloabl variable for circuit thingie
let object;
//camera move around
let controls;
//object for rendering
let objToRender = 'circuit';
//loader
const loader= new GLTFLoader();
loader.load{
'
