import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// we have learn:
// 1.different types of materials and property associated with it
// 2.creating light in the scene(we see this in details later)
// 3.setting texture to the environment(about positive and negative x,y and z axes) by CubeTextureLoader()
//4.orbit control-to see the env in all direction by moving mouse
import "./style.css"
//THREE-all objects and methods of THREE.js
//scene
const scene = new THREE.Scene();
//2.to create a object/mesh
const geometry = new THREE.SphereGeometry(0.5,32,32);//creating the geometry of the obj/mesh.1,1,1 is


// ---------------texture loader------------------------------------------------------------------------
  const texture=new THREE.TextureLoader();// to create texture from an 
  // image(its same as image ).u can print texture u will get texture object/
  const colorTexture=texture.load("/texture/color.jpg")//like this we can create more textures  as 
  // much  we want
  const bumpTexture=texture.load("/texture/bump.jpg")//to create a bump texture
// ----------------------------------------------------------------------------------------------------
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff21 }); //adding kind of material for the mesh
// const material = new THREE.MeshBasicMaterial({ map:colorTexture}); //this is how we add texture to a mesh
 const material=new THREE.MeshStandardMaterial()

//-------------different types of material------------------------------------------------------
// similar to MeshBasicMaterial we have more type of materials like this
// const material = new THREE.MeshDepthMaterial({ map:colorTexhture}); //seems brighter when close to camera
// const material=new THREE.MeshNormalMaterial({map:colorTexture})//the area which is ecposed to light will be 
//brighter. we see about lights in coming lectures
// const material=new THREE.MeshMatcapMaterial()
// material.matcap=colorTexture//this is how we can apply matcap texture.
// const material=new THREE.MeshLambertMaterial()//the face of mesh facing light we will brighter


// ------------------------------------------------------------------------------------------------

// ------------creating light in the scene---------------------------------------------------------
const ambientLight=new THREE.AmbientLight(0Xffffff,0.5)
const pointLight=new THREE.PointLight(0Xffffff,0.5)
pointLight.position.set(2,2,2)
scene.add(ambientLight,pointLight)

// -------------------------------------------------------------------------------------------------
//properties of material(all the property which we see below u can find that in each type of materials 
// documentation in THree js website).hence all type of material has its own properties.
// material.map=colorTexture//in this way also we can apply texture to the mesh
// material.wireframe=true
// material.color=new THREE.Color("red")
// material.opacity=0.1
// material.side=THREE.FrontSide //to see the frot side only in case of plane heomtry we have also 
// backside ,doubleside etc
// material.visible=false//to show or hide the mesh
// material.metalness=0.65;
// material.roughness=0.5
// material.shininess=200//to shine the material comes under the MeshPhongMaterial
// material.specular=new THREE.Color("green")//color of shine
// material.bumpMap=bumpTexture
// material.envMap=envTexture
const mesh = new THREE.Mesh(geometry, material); //finally creating the mesh/object

scene.add(mesh); //adding the mesh in the scene

// const  axesHelper=new THREE.AxesHelper();
// scene.add(axesHelper);
//  3.to create camera(perspective camera)
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z=4
camera.position.x=1
scene.add(camera);



// ---cubeTextureLoader(used to set texture to the env(image) to +ve and -ve x,yand z axis )---
const cubeTextureLoader=new THREE.CubeTextureLoader()
const envTexture=cubeTextureLoader.load([
  "/texture/env/px.png","/texture/env/nx.png","/texture/env/py.png","/texture/env/ny.png","/texture/env/pz.png","/texture/env/nz.png"])
//px-means image of +ve x axis ,nx-negative x axis. 
  scene.background=envTexture
  //the below three property is to make  sphere reflexive
  material.metalness=0.9;
material.roughness=0.1
material.envMap=envTexture
// ----------------------------------------------------------------------------------------------
//  4.rendere
const canvas = document.querySelector(".drawing");
const renderer = new THREE.WebGLRenderer({ canvas }); //adding the webGl rendere
renderer.setSize(window.innerWidth, window.innerHeight); //set the size of rendere
// renderer.render(scene, camera); //draw what the camera has captured 

//----------------------------------------OrbitControls----------------------------------------
//to see the 360 view of background as well as the object /to rotate the camera on orbit keeping 
// center at origin 
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;



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


