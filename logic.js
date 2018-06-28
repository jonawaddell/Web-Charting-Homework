// Store our API endpoint inside queryUrl
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

renderMap(earthquakeURL);

function renderMap(earthquakeURL){
  d3.json(earthquakeURL, function(data){
    console.log(earthquakeURL)

    var earthquakeData = data;

    createFeatures(earthquakeData);
  })
}

function createFeatures(earthquakeData){
  function onEachQuakeLayer(feature, layer){
    return new L.circleMarker([feature.geometry.coordinates[1]], [feature.geometry.coordinates[0]],{
      fillOpacity: 1,
      color: chooseColor(feature.properties.mag),
      fillColor: chooseColor(feature.properties.mag),
      radius: markerSize(feature.properties.mag)
    });
  }
}

// Function to create map
  function createMap(earthquakes,) {
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiZGF2aXNjYXJkd2VsbCIsImEiOiJjamViam4yMHEwZHJ4MnJvN3kweGhkeXViIn0." +
      "A3IKm_S6COZzvBMTqLvukQ");

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiZGF2aXNjYXJkd2VsbCIsImEiOiJjamViam4yMHEwZHJ4MnJvN3kweGhkeXViIn0." +
      "A3IKm_S6COZzvBMTqLvukQ");

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiZGF2aXNjYXJkd2VsbCIsImEiOiJjamViam4yMHEwZHJ4MnJvN3kweGhkeXViIn0." +
      "A3IKm_S6COZzvBMTqLvukQ");

    var baseMaps = {
        "Outdoors": outdoors,
        "Satellite": satellite,
        "Dark Map": darkmap,
      };

      var overlayMaps = {
          "Earthquakes": earthquakes
      };

      // Create map, default settings: outdoors and faultLines layers display on load
      var map = L.map("map", {
          center: [39.8283, -98.5785],
          zoom: 3,
          layers: [outdoors],
          scrollWheelZoom: false
      });

      // Create a layer control
   
      L.control.layers(baseMaps, overlayMaps, {
          collapsed: true
      }).addTo(map);

      var legend = L.control({position: 'bottomright'});
      legend.onAdd = function(map) {
          var div = L.DomUtil.create('div', 'info legend'),
                      grades = [0, 1, 2, 3, 4, 5],
                      labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];

          for (var i = 0; i < grades.length; i++) {
              div.innerHTML += '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          };

          return div;
      };
      legend.addTo(map);
          }


