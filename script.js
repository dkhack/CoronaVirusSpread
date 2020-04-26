 let dataSet;
 let mappa = new Mappa('Leaflet');
 let myMap;
 let canvas;
 let data = [];
 let currentColor;
 let dataSource;
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
     

     myMap = mappa.tileMap(options);
     
     myMap.overlay(canvas);
     dataSource = select('#dataSource');
     dataSource.changed(processData);
     currentColor = color(255, 0, 200, 100); 

     processData();

 }

 function processData() {
  data = [];

  let type = dataSource.value();
  switch (type) {
    case 'Confirmed' :
      currentColor = color(64, 250, 200, 100);
      break;
    case 'Deaths' :
      currentColor = color(200, 0, 100, 100);
      break;
  }


  let maxValue = 0;
  let minValue = Infinity;
  for (let row of dataSet.rows) {
    let latitude = (row.get('Latitude'));
    let longitude = row.get('Longitude');
    let confirmed = Number(row.get(type));
    //console.log(confirmed + row.get('Country'));
    
    data.push({latitude,longitude,confirmed});
    if(confirmed>maxValue) {
      maxValue= confirmed;
    }
    if(confirmed<minValue) {
      minValue = confirmed;
    }
   }
   
   let minD = sqrt(minValue);
   let maxD = sqrt(maxValue);
   //console.log(minD +' maxd'+maxD)
   for(let country of data) {
     country.diameter = map(sqrt(country.confirmed),minD,maxD,1,10);
    // console.log(country.diameter);
   }


 }

 function draw() {
   //  background(0);
clear();
for(let country of data) {
  const pix = myMap.latLngToPixel(country.latitude,country.longitude);
  fill(64,250,200,100);
  const zoom = myMap.zoom();
  const scal = pow(2,zoom);
  ellipse(pix.x,pix.y,country.diameter*scal);
 
}

 }