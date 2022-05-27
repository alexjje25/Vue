<template>
  <div>
    <div class="zoomOption">
      <button class="title">MAPA TÉRMICO - THERMAL MAP</button>
      <button  class="btn">Normal</button>
      <button class="btn">13x</button>
      <button class="btn">14x</button>
      <button  class="btn">16x</button>
      </div>
    <div id="mapa">
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { zoomMap, heatmapTalhao } from "@/config/mapbox";

export default {
  name: "mapaDoZero",
  props: ["lista"],
  data() {
    return {
      map: "",
      center: {
        x: 0,
        y: 0
      }
    };
  },
  watch: {
    lista: function(newval) {
      //window.console.log("UpdateMap ? ");
      this.updateMap();
    }
  },
  methods: {
    verificarPontosHeat() {
      let payload = {
        type: "FeatureCollection",
        features: []
      };
      //tedte
      this.lista.forEach(element => {
        payload.features.push({
          type: "Feature",
          properties: {
            mag: 1.3,
            felt: null,
            chave: element.chave
          },
          geometry: {
            type: "Point",
            coordinates: [
              element.dados.coord.long,
              element.dados.coord.lat,
              0.0
            ]
          }
        });
      });

      return payload;
    },
    mountPolygon(area) {
      let featurePolygon = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [area]
        }
      };
      //window.console.log("area", featurePolygon.geometry.coordinates);
      return featurePolygon;
    },
    createPolygons() {
      let self = this;
      let listaTalhoes = this.$store.getters["fazenda/GET_TALHOES"]; //TALHOES
      let listaForMap = [];
      //CRIADOR DE FEATURE
      listaTalhoes.forEach(element => {
        if (element.dados.area) {
          let payload = self.mountPolygon(element.dados.area);
          listaForMap.push(payload);
        } else {
          return;
        }
      });
      self.map.addSource("talhaoFazenda", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: listaForMap
        }
      });
    },
    createLayouts() {
      let self = this;
      self.map.addLayer({
        id: "earthquakes-heat",
        type: "heatmap",
        source: "earthquakes",
        maxzoom: 24,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            0,
            0,
            1,
            1
          ],
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            1,
            1
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(55,175,255,0)",
            0.8,
            "rgba(200,204,43,0.7)",
            //0.8,
            //"rgba(178,24,43,0.4)",
            1,
            "rgba(255,0,0,0.3)"
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            40,
            40,
            40
          ],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 0, 3, 3, 3]
        }
      });
      self.map.addLayer({
        id: "earthquakes-point",
        type: "circle",
        source: "earthquakes",
        minzoom: 0,
        paint: {
          "circle-radius": 2,
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1,
            "rgba(33,102,172,0)",
            2,
            "rgb(103,169,207)",
            3,
            "rgb(209,229,240)",
            4,
            "rgb(253,219,199)",
            5,
            "rgb(239,138,98)",
            6,
            "rgb(178,24,43)"
          ],
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 0, 1, 2, 3]
        }
      });
      self.map.addLayer(
        {
          id: "talhoes",
          type: "fill",
          source: "talhaoFazenda",
          paint: {
            "fill-color": "rgb(35,125,50)",
            "fill-opacity": 0.8
          }
        },
        "earthquakes-heat"
      );
    },
    updateMap() {
      let self = this;
      let delivery = self.verificarPontosHeat();
      self.map.getSource("earthquakes").setData(delivery);
    },
    drawMap() {
      let self = this;
      self.map = new mapboxgl.Map({
        container: "mapa",
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [self.center.y, self.center.x],
        zoom: zoomMap,
        maxZoom: zoomMap,
        minZoom: zoomMap
      });
      self.map.addControl(new mapboxgl.NavigationControl());
      self.map.on("load", function() {
        self.createPolygons();
        self.map.addSource("earthquakes", {
          type: "geojson",
          data: self.verificarPontosHeat()
        });

        self.createLayouts();
      });
    }
  },
  beforeMount() {
    let self = this;
    self.center = {
      y: self.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y,
      x: self.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x
    };
    mapboxgl.accessToken =
      "pk.eyJ1IjoicnVyYWxsc3Ryb25nIiwiYSI6ImNrN3QxdTk0ZjB2b3gzbW12MWc5NXJwa3UifQ.7u0enqBAemPklVziDvpg3Q";
    this.verificarPontosHeat();
  },
  mounted() {
    this.drawMap();
  }
};
</script>

<style lang="scss" scoped>
#mapa {
  width: 100%;
  height: 600px;
}

.zoomOption {
  button.btn {
    padding: 10px 14px;
    background-color: #353;
    color: white;
    display: inline-block;
    margin: 4px;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
}
  .title {
    padding: 10px 14px;
    background-color: #380;
    color: white;
    font-size: small;
    display: inline-block;
    margin: 4px;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }



@media (max-width: 1400px) {
  #mapa {
    width: 1000px;
    height: 1000px;
  }
}
</style>
