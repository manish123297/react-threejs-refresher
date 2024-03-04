import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// we have learn:
// 1.how to create number of particles using BUfferGeometry
// 2.to set co-ordinate to all those particles using Float32Array
//4.to add textures to the particles
//5.animating the particle 
//6.using orbitControl attributes to disbale/enable zoom ,rotation eyc.

import "./style.css"
//THREE-all objects and methods of THREE.js
//1.scene
const scene = new THREE.Scene();
//2.to create a object/mesh
const geometry = new THREE.BufferGeometry();//creating the geometry of the obj/mesh.1,1,1 is
const verticesAmount=1000//no of vertices we want for this geometry
const positionArray=new Float32Array(verticesAmount*3)//verticesAmount*3 becz we need 1000*3 values 
// to represent 1000 vertices in #D space
//now we will assign the random values to the all 3000 elemnst of positionArray
for(let i=0;i<positionArray.length;i++){
  positionArray[i]=(Math.random()-0.5)*4//0.5 is subtracted to get points in -ve side of cordinate also
  //4 is multiplied to increase the position range or for wider spread in space
}
geometry.setAttribute("position",new THREE.BufferAttribute(positionArray,3))//telling that make each three
//element of positionArray as co-ordiante in #D space
const material=new THREE.PointsMaterial({color:"white"});
material.size=0.03//size of the point
// material.transparent=true//so that we can see through the black spaces of particles when texture will 
// be added
// material.alphaMap=particleTexture//this way also we can apply texture so that we can see through 
// the black spaces 
// material.depthTest=false
const points=new THREE.Points(geometry,material)//definig here that which kind of geometry we need and 
//which kind of material we will use for creating point
//here we can add texture also for the particle as we have seen for the objects.
scene.add(points)






// ------------creating light in the scene---------------------------------------------------------
// const ambientLight=new THREE.AmbientLight(0Xffffff,0.5)
// const pointLight=new THREE.PointLight(0Xffffff,0.5)
// pointLight.position.set(2,2,2)
// scene.add(ambientLight,pointLight)

// -------------------------------------------------------------------------
// const  axesHelper=new THREE.AxesHelper();
// scene.add(axesHelper);
//--------------------------------------------------------------------------
//  3.to create camera(perspective camera)
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);
camera.position.z=2
camera.position.x=1
scene.add(camera);




//  4.rendere
const canvas = document.querySelector(".drawing");
const renderer = new THREE.WebGLRenderer({ canvas ,alpha:true}); //adding the webGl rendere.alpha true means 
// transparent background
renderer.setSize(window.innerWidth, window.innerHeight); //set the size of rendere
// renderer.render(scene, camera); //draw what the camera has captured 

//----------------------------------------OrbitControls----------------------------------------
//to see the 360 view of background as well as the object /to rotate the camera on orbit keeping 
// center at origin 
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom=true;//so that we can zoom to a particle
orbitControls.enableRotate=true;//to stop rotating by using cursor
// orbitControls.autoRotate=true;//instead of rotating the 1000 particle we can rotate only the camera so that GPU uses reduces.
// orbitControls.autoRotateSpeed=0.2;//to cotrol the orbit rotation speed.



// -------------animation-----------------------------------------------------------------------


//clock class
const clock=new THREE.Clock();
const animate=()=>{
  //elapsed time-this the time since when user entered in website 
  const ElapsedTime=clock.getElapsedTime()
 points.rotation.y=-ElapsedTime/10
 points.rotation.x=2
renderer.render(scene, camera); //draw what the camera has captured 

  console.log(animate)
  window.requestAnimationFrame(animate)
}
animate()//on some devices animate function will be called 60 times per second  for some devices 120 
// times per second called fps(frames per second) 


