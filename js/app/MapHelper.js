var L = require('leaflet');
var Polyline = require('@mapbox/polyline');
var BeautifyMarker = require('beautifymarker');

function init(id, center, zoom = 13, zoomControl = true) {

  if (!center && window.AppData && window.AppData.MapHelper && window.AppData.MapHelper.center) {
    let [ latitude, longitude ] = window.AppData.MapHelper.center.split(',')
    if (latitude && longitude) {
      center = [ parseFloat(latitude), parseFloat(longitude) ]
    }
  }

  var map = L.map(id, { scrollWheelZoom: false, zoomControl })

  if (center && zoom) {
    map.setView(center, zoom)
  }

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map);

  return map;
}

function createMarkerIcon(icon, iconShape, color) {
  return L.BeautifyIcon.icon({
    icon: icon,
    iconShape: iconShape,
    borderColor: color,
    textColor: color,
    backgroundColor: 'transparent'
  });
}

function createMarker(position, icon, iconShape, color) {
  var marker = L.marker(position, {
    icon: createMarkerIcon(icon, iconShape, color)
  });

  return marker;
}

function fitToLayers(map, layers, pad = 0) {
  var group = new L.featureGroup(layers)
  if (group.getLayers().length > 0) {
    map.fitBounds(group.getBounds().pad(pad))
  }
}

function decodePolyline(polyline) {
  var steps = Polyline.decode(polyline);
  var polylineCoords = [];

  for (var i = 0; i < steps.length; i++) {
    var tempLocation = new L.LatLng(
      steps[i][0],
      steps[i][1]
    );
    polylineCoords.push(tempLocation);
  }

  return polylineCoords;
}

function route(coordinates) {
  const markersAsString = coordinates
    .map(coordinate => coordinate[0] + ',' + coordinate[1])
    .join(';')
  return $.getJSON(window.AppData.MapHelper.routeURL.replace('__COORDINATES__', markersAsString))
    .then(response => {
      const { routes } = response
      return routes[0]
    })
}

function getPolyline(origin, destination) {

  var originLatLng = origin.getLatLng();
  var destinationLatLng = destination.getLatLng();

  var coordinates = [
    [originLatLng.lat, originLatLng.lng],
    [destinationLatLng.lat, destinationLatLng.lng]
  ]

  return route(coordinates)
    .then(route => decodePolyline(route.geometry))
}

module.exports = {
  init: init,
  createMarker: createMarker,
  fitToLayers: fitToLayers,
  decodePolyline: decodePolyline,
  getPolyline: getPolyline,
  route
};
