 let dataSet;
 let mappa = new Mappa('Leaflet');
 let myMap;
 let canvas;
 const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

 function preload() {
     dataSet = loadTable('coronaDataSet.csv','header');
 }

 function setup() {
     canvas = createCanvas(900,600);
     for (let row of dataSet.rows) {
            console.log(row.get('Country'));
     }

     myMap = mappa.tileMap(options);
     myMap.overlay(canvas);

 }

 function draw() {
   //  background(0);
clear();
const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
// Using that position, draw an ellipse
ellipse(nigeria.x, nigeria.y, 20, 20);
 }
// let myMap;
// let canvas;
// const mappa = new Mappa('Leaflet');

// // Lets put all our map options in a single object
// const options = {
//   lat: 0,
//   lng: 0,
//   zoom: 4,
//   style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
// }

// function setup(){
//   canvas = createCanvas(640,640); 
//   // background(100); let's uncomment this, we don't need it for now

//   // Create a tile map with the options declared
//   myMap = mappa.tileMap(options); 
//   myMap.overlay(canvas);
// }

// function draw(){

// }