import * as THREE from 'three';
//we have learnt:
// 1.we created this webpack bundler project 
// 2.how to create custom geometry and different types  of attributes(like position,uv etc)
//3.creating wireframe and  adding texture to the geometry using TextureLoader
//4.LoadingManager(it keeps track of the process of loading the texture to the mesh by the events like
// Onstart,onProgress,loaded,error) so that we can add custom style when texture will take time to load
//5.controling the texture size(like it will cover the whole mesh or part of it) by UV
import "./style.css"
//THREE-all objects and methods of THREE.js
//scene
const scene = new THREE.Scene();
//2.to create a object/mesh
const geometry = new THREE.BoxGeometry(3,3,3,2,4,5);//creating the geometry of the obj/mesh.1,1,1 is
//  length width and height
//2-width segment,3-height segment,4-depth segment
//instead of using BoxGeometry we can use BoxBufferGeometry which is same but taks less GPU.this we can
//do with all the geometry
// ----------to create a custom geometry(creating triangle by providing the coordinaste)-------------
// const geometry=new THREE.BufferGeometry()
// const verticesArray=new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0
// ])//this is java script array
// const positionAttribute=new THREE.BufferAttribute(verticesArray,3)//here basically we are dividing the 
// //verticesArray in 3-3 pair so that three js can treat it as 3D coordinate
// geometry.setAttribute('position',positionAttribute)//here we are saying that the attribute 
// // positionAttribute is actually position attribute 
//we have many more attributes like normal,position,uv etc ,all these we can see by 
// printing the THREE object -> attribute object. 

// --------------------------------------------------------------------------------------------------
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff21 ,wireframe:true}); //wireframe to tell that we want
//to see wire frame of the geometry

// ---------------texture loader------------------------------------------------------------------------
  const texture=new THREE.TextureLoader();// to create texture from an 
  // image(its same as image ).u can print texture u will get texture object/
  const colorTexture=texture.load("/texture/color.jpg")//like this we can create more textures  as 
  // much  we want
// -----------------------------------------------------------------------------------------------------
//--------------loadingManager --------------------------------------------------------------------------
  const loadingManager=new THREE.LoadingManager();
  loadingManager.onStart=()=>{
    console.log("started")
  }
  loadingManager.onProgress=()=>{
    console.log("onProgress")
  }
  loadingManager.onLoad=()=>{
    console.log("onLoad")
  }
  loadingManager.onError=()=>{
    console.log("onError")
  }


// ----------------------------------------------------------------------------------------------------

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff21 }); //adding kind of material for the mesh
const material = new THREE.MeshBasicMaterial({ map:colorTexture}); //this is how we add texture to a mesh

const mesh = new THREE.Mesh(geometry, material); //finally creating the mesh/object

scene.add(mesh); //adding the mesh in the scene

const  axesHelper=new THREE.AxesHelper();
scene.add(axesHelper);
//  3.to create camera(perspective camera)
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z=7
camera.position.x=4
scene.add(camera);
//  4.rendere
const canvas = document.querySelector(".drawing");
const renderer = new THREE.WebGLRenderer({ canvas }); //adding the webGl rendere
renderer.setSize(window.innerWidth, window.innerHeight); //set the size of rendere
// renderer.render(scene, camera); //draw what the camera has captured 



// -------------animation-----------------------------------------------------------------------


//clock class
const clock=new THREE.Clock();
const animate=()=>{
  //elapsed time-this the time since when user entered in website 
  const ElapsedTime=clock.getElapsedTime()
  // console.log(ElapsedTime)
  // mesh.rotation.x+=0.09//to rotate about x axis .in terms of elapsed time we can write it like this
  mesh.rotation.x=ElapsedTime;
  mesh.position.x+=0.01//to move in x axix
//   camera.position.y=ElapsedTime;
 
  // mesh.position.y+=0.01//to move on y axis
renderer.render(scene, camera); //draw what the camera has captured 

  console.log(animate)
  window.requestAnimationFrame(animate)
}
animate()//on some devices animate function will be called 60 times per second  for some devices 120 
// times per second called fps(frames per second) 


