//THREE.js Library and code modified from Gabriel Molter youtube https://www.youtube.com/watch?v=lGokKxJ8D2c&t=1s
import * as THREE from "http://cdn.skypack.dev/three@0.129.0/build/three.module.js";
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

let mouseX =0;
let mouseY = 0;

window.addEventListener("mousemove", (event) =>{
  mouseX = event.clientX;
  mouseY = event.clientY;
});

//loader
const loader= new GLTFLoader();
loader.load("./models/PCB_Modern_06_GLTF/SM_PCB_Modern_06_Med.gltf",
  function (gltf){
    object = gltf.scene;
    scene.add(object);
  },
          function (xhr){
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
  function (error){
    console.error(error);
  }
            );
  //renderer and size
            const renderer = new THREE.WebGLRenderer({ alpha: true }); 
            renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("circuit3D").appendChild(renderer.domElement);
//camera from 3d model
            camera.position.z = objToRender === "dino"? 25 : 500;
            controls = new OrbitControls(camera, renderer.domElement);
//lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
            topLight.position.set(500, 500, 500);
            topLight.castShadow = true;
            scene.add(topLight);
            const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5:1);
            scene.add(ambientLight);

//render
            function animate(){
              requestAnimationFrame(animate);
              
              if(object && objToRender === 'circuit'){
                object.rotation.y =-3 +( mouseX / window.innerWidth)* 3;
              object.rotation.x = 1.2 + (mouseY * 2.5) / window.innerHeight;
            }
              controls.update();
            renderer.render(scene, camera);
            }        
            window.addEventListener("resize", function (){
              camera.aspect = window.innerWidth/ window.innerHeight;
              
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
            });
            animate();
