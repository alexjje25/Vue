<template>
  <div>
    <div id="mapa"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import { zoomMap, heatmapTalhao } from "@/config/mapbox";

export default {
  props: ["lista", "custom"],
  data() {
    return {
      map: "",
      center: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    }
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
      return featurePolygon;
    },
    createTalhoes() {
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
        id: "rotaPoint",
        type: "Point",
        source: "rotaPoint",
        minzoom: 0
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
        "rotaPoint"
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
        self.createTalhoes();
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
  min-height: 500px;
  height: 700px;
  width: 100%;
  margin: 0 auto;
}
</style>
