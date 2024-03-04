//THREE-all objects and methods of THREE.js
//Learnt here:
//1.learnt about how to create animation how to move camera and mesh and clock class to control the 
//frames per second on any device
//2.helpers like axes helper to see the coordinate system
//scene
const scene = new THREE.Scene();
//2.to create a object/mesh
const geometry = new THREE.BoxGeometry(3, 3, 3); //creating the geometry of the obj/mesh.1,1,1 is
//  length width and height
const material = new THREE.MeshBasicMaterial({ color: 0x00ff21 }); //adding kind of material for the mesh
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
//as we know that rendere will show what camera has captured now if we will start moving(transformation of
//mesh in each render) then rendere will capture that and display .now since animate method will run for 
//60 times in a second so 60 times rendere will also render (if we will put rendere in animate method) and
//it capture transformation of mesh which will create the animation/video effect
//to solve the above issue of varying fps in different devices three.js has class clock using that
//we will have same fps value in every device.

//clock class
const clock=new THREE.Clock();
const animate=()=>{
  //elapsed time-this the time since when user entered in website 
  const ElapsedTime=clock.getElapsedTime()
  // console.log(ElapsedTime)
  // mesh.rotation.x+=0.09//to rotate about x axis .in terms of elapsed time we can write it like this
  mesh.rotation.x=ElapsedTime;
  mesh.position.x+=0.01//to move in x axix
  // camera.position.x=-ElapsedTime;
 
  // mesh.position.y+=0.01//to move on y axis
renderer.render(scene, camera); //draw what the camera has captured 

  console.log(animate)
  window.requestAnimationFrame(animate)
}
animate()//on some devices animate function will be called 60 times per second  for some devices 120 
// times per second called fps(frames per second) 
