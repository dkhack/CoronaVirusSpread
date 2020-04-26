 let dataSet;
 let mappa = new Mappa('Leaflet');
 let myMap;
 let canvas;
 let data = [];
 let currentColor;
 let dataSource;
 let liveData;
 let liveDataArr;
 const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

 function preload() {
     dataSet = loadTable('coronaDataSet.csv','header');
     let request = new XMLHttpRequest();
     request.open("GET","https://www.trackcorona.live/api/countries");
     request.responseType = "json";
     request.send();
     request.onload = () =>{
        if(request.status===200) {
          liveData = request.response.data;
        }
       

     }
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
  data = [];  //for static data stored on csv file
  liveDataArr = [];  //for live data from json of api call
  let type = dataSource.value();
  switch (type) {
    case 'confirmed' :
      currentColor = color(64, 250, 200, 100);
      break;
    case 'dead' :
      currentColor = color(200, 10, 100, 100);
      break;
  }


  let maxValue = 0;
  let minValue = Infinity;
 if(liveData!=null) {
var i;
 for(i= 0;i<liveData.length;i++){
   let latitude = liveData[i].latitude;
   let longitude = liveData[i].longitude;
   
   let confirmed =Number(liveData[i][type]);
   liveDataArr.push({latitude,longitude,confirmed});

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
 for(let country of liveDataArr) {
   country.diameter = map(sqrt(country.confirmed),minD,maxD,1,10);
  // console.log(country.diameter);
 }

 }
 maxValue = 0;
 minValue = Infinity;

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

   
    minD = sqrt(minValue);
    maxD = sqrt(maxValue);
   //console.log(minD +' maxd'+maxD)
   for(let country of data) {
     country.diameter = map(sqrt(country.confirmed),minD,maxD,1,10);
    // console.log(country.diameter);
   }
  }


 

 function draw() {
   //  background(0);
clear();

for(let country of liveDataArr) {
  const pix = myMap.latLngToPixel(country.latitude,country.longitude);
  fill(64,250,200,100);
  const zoom = myMap.zoom();
  const scal = pow(2,zoom);
  ellipse(pix.x,pix.y,country.diameter*scal);
 
}


 }

