import mapboxgl from "mapbox-gl";
// or "const mapboxgl = require('mapbox-gl');"
const _PROCTOK =
  "pk.eyJ1IjoicnVyYWxsc3Ryb25nIiwiYSI6ImNrN3QxdTk0ZjB2b3gzbW12MWc5NXJwa3UifQ.7u0enqBAemPklVziDvpg3Q";

mapboxgl.accessToken = _PROCTOK;

const CHAVE_MAPBOX = _PROCTOK;

//maisnovo:   https://agroavanco.com.br/
// rurallOficial: pk.eyJ1IjoicnVyYWxsc3Ryb25nIiwiYSI6ImNrN3QxdTk0ZjB2b3gzbW12MWc5NXJwa3UifQ.7u0enqBAemPklVziDvpg3Q
// antigo: pk.eyJ1Ijoicm9kcmlnb2FyYXVqb2xpbWE5MiIsImEiOiJjazUxZjR2bXQwOWFiM2VuaGJoa3Y2NXpiIn0.sLe8YypzjUwL-pHhOJYsRA
export function geoCurrent() {
  navigator.geolocation.getCurrentPosition(function(position) {
    return { lat: position.coords.latitude, long: position.coords.longitude };
  });
}

function createMap(databin) {
  new mapboxgl.Map({
    container: databin.id,
    style: databin.style,
    center: [databin.long, databin.lat], // vuex
    zoom: databin.zoom
  });
}

function createMark(mapaID, coord) {
  new mapboxgl.Marker({
    draggable: true,
    color: "green"
  })
    .setLngLat(coord)
    .addTo(mapaID);
}

export { mapboxgl, createMap, createMark, CHAVE_MAPBOX };
