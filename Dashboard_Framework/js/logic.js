// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

//Create the Earthquake layer for our map
let locations = new L.layerGroup()
let stories = new L.layerGroup()
let density = new L.layerGroup() // need to set off over the map

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Locations: locations,  
  HumanStories: stories,
  FundingDetails: density
  };


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [26.3, 17.2],
	zoom: 3,
    layers: [streets],  
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://github.com/emmysobieski/TeamPySpark/blob/master/Data/kiva_locations.csv").then(function(data) {

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
// We turn each feature into a circleMarker on the map.
pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },  //ends anonymous function
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(earthquakes);

    //Then we add the earthquake layer to our map.
    earthquakes.addTo(map); //ends pointToLayer
//});
// Create a legend control object.
let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend.
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};
legend.addTo(map);
}); 


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.

function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    }
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
    }; //ends function styleInfo

    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
        return "#ea2c2c";
        }
        if (magnitude > 4) {
        return "#ea822c";
        }
        if (magnitude > 3) {
        return "#ee9c00";
        }
        if (magnitude > 2) {
        return "#eecc00";
        }
        if (magnitude > 1) {
        return "#d4ee00";
        }
        return "#98ee00";
    }


  }

//CHALLENGE CODE

// Retrieve the tectonic plate GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {   //access data

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {  //loads program
// We turn each feature into a circleMarker on the map.
pointToLayer: function(feature, latlng) { 
            console.log(data);
            return L.lineString(latlng);
        },  //ends anonymous function
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfoP,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Name of Bounding Plates: Plate A: " + feature.properties.PlateA + "   Plate B: " + feature.properties.PlateB + "<br /> Type of Plate Boundary: " + feature.properties.type);
    }
    }).addTo(boundaries);

    //Then we add the earthquake layer to our map.
    boundaries.addTo(map); //ends pointToLayer

    function styleInfoP(feature) {
      return {
        opacity: 1,
        color: "#922B21",
        stroke: true,
        weight: 5.0
      }
  
    }  
  });

// Retrieve the tectonic plate GeoJSON data.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json").then(function(data) {
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.Polygon(latlng);
            },  //ends anonymous function
        // We set the style for each circleMarker using our styleInfo function.
        style: styleInfopl,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Plate Name: " + feature.properties.PlateName);
        }
        }).addTo(plates);

        function styleInfopl(feature) {
          switch(feature.properties.PlateName) {
            case 'Africa': return {color:"#117A65"};
            case 'Antarctica': return {color:"#512E5F"};
            case 'Somalia': return {color:"#6C3483"};
            case 'India': return {color:"#F4D03F"};
            case 'Australia': return {color:"#CB4335"}; 
            case 'Eurasia': return {color:"#117A65"};
            case 'North America': return {color:"#512E5F"};
            case 'South America': return {color:"#6C3483"};
            case 'Nazca': return {color:"#F4D03F"};
            case 'Pacific': return {color:"#CB4335"}; 
            case 'Arabia': return {color:"#117A65"};
            case 'Sunda': return {color:"#512E5F"};
            case 'Timor': return {color:"#6C3483"};
            case 'Kermadec': return {color:"#F4D03F"};
            case 'Tonga': return {color:"#CB4335"};    
            case 'Woodlark': return {color:"#117A65"};
            case 'Caribbean': return {color:"#512E5F"};
            case 'Cocos': return {color:"#6C3483"};
            case 'Juan de Fuca': return {color:"#F4D03F"};
            case 'North Andes': return {color:"#CB4335"};    
            }
          } 
        function togglePoints() {
          if(!toggle) {
            map.removeLayer(plates);
          } else {
            plates.addTo(map); 
          }
          toggle = !toggle;
        }  
      });
      
