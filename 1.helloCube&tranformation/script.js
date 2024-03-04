//we learnt about:
//1.basic components of threeJS(like scene,objects,camera,rendere) and how to create it
//2.transformation prperty of camera and mesh like rotation,scale,position
//3.group class to add multiple mesh in single scene.
//THREE-all objects and methods of THREE.js

//1.to create a scene
const scene = new THREE.Scene();
//2.to create a object/mesh--------(1st mesh)--------------------------------------------
const geometry = new THREE.BoxGeometry(1, 1, 1); //creating the geometry of the obj/mesh.1,1,1 is
//  length width and height
const material = new THREE.MeshBasicMaterial({ color: 0x00ff21 }); //adding kind of material for the mesh
const mesh = new THREE.Mesh(geometry, material); //finally creating the mesh/object
//positioning mesh on cordinate axis(that is to move on x,y and z axis)
mesh.scale.x=2 //expending about x-axis
mesh.rotation.x=Math.PI*0.25//to rotate one forth of the PI
mesh.position.x=2;
mesh.rotation.y=Math.PI*1.2
mesh.position.y=2;
// scene.position.z=7
// scene.add(mesh); //adding the mesh in the scene
// -------------------------second mesh---------------------------------------------------------------
const geometryT = new THREE.BoxGeometry(1, 1, 1); //creating the geometry of the obj/mesh.1,1,1 is
//  length width and height
const materialT = new THREE.MeshBasicMaterial({ color: "red" }); //adding kind of material for the mesh
const mesh2 = new THREE.Mesh(geometryT, materialT);
mesh2.position.x=-2
// scene.add(mesh2)
//we can also add the two or more mesh in the scene by using the group like this
  const group=new THREE.Group()
  group.add(mesh,mesh2)//here also we can use all property like we used for mesh like rotation,scale,position etc 
  scene.add(group) 
// helpers to identify the camera poition ,axes etc
const  axesHelper=new THREE.AxesHelper();
scene.add(axesHelper);
//  3.to create camera(perspective camera)
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
//45-field of view-camera frustum vertical field of view(angle)
//width/height-aspect ration-camera frustum aspect ration
//1-near-camera frustum near plane area
//1000-far-camera frustum far plane area
//positioning camera on the coordinate axis.
camera.position.z = 6; //to position camera at z=5 from the origin similarly for the x and y
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);
//  4.rendere
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas }); //adding the webGl rendere
renderer.setSize(window.innerWidth, window.innerHeight); //set the size of rendere
renderer.render(scene, camera); //display what the camera has captured
