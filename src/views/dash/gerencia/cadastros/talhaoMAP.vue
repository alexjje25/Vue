<template>
  <div>
    <div id="mapa"></div>
  </div>
</template>

<script>
import { mapboxgl } from "@/mapbox.js";

export default {
  props: ["geo1", "geo2"],
  data() {
    return {
      map: "",
      mensagem: "SUA FAZENDA",
      globalMarkrs: []
    };
  },
  mounted() {
    this.gerarMap();
  },
  methods: {
    drawFazenda() {
      self.map.on("load", function() {
        self.map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-44.112833, -12.613909],
                [-44.110226, -12.616778],
                [-44.106696, -12.61482],
                [-44.107994, -12.611511],
                [-44.112833, -12.613909]
              ]
            }
          }
        });
        self.map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#1C4700",
            "line-width": 2,
            "line-opacity": 1
          }
        });
        self.map.addSource("maine", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-44.112833, -12.613909],
                  [-44.110226, -12.616778],
                  [-44.106696, -12.61482],
                  [-44.107994, -12.611511],
                  [-44.112833, -12.613909]
                ]
              ]
            }
          }
        });
        self.map.addLayer({
          id: "maine",
          type: "fill",
          source: "maine",
          layout: {},
          paint: {
            "fill-color": "#A0BE37",
            "fill-opacity": 0.1
          }
        });
      });
    },
    gerarMap() {
      var estilo;
      var self = this;
      estilo = "mapbox://styles/mapbox/satellite-streets-v11";

      const x = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x;
      const y = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y;

      // O CENTER É INVERTIDO PELA API
      // LONGITUDE E LATITUDE
      self.map = new mapboxgl.Map({
        container: "mapa",
        style: estilo,
        center: [y, x],
        zoom: 15
      });

      this.markToBox([y, x]);
      this.drawFazenda();

      var draw = new mapboxgl.MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
      self.map.addControl(draw);

      self.map.on("draw.create", updateArea);
      self.map.on("draw.delete", updateArea);
      self.map.on("draw.update", updateArea);

      function updateArea(e) {
        var data = draw.getAll();
        var answer = document.getElementById("calculated-area");
        if (data.features.length > 0) {
          var area = data.area(data);
          // restrict to area to 2 decimal points
          var rounded_area = Math.round(area * 100) / 100;
          answer.innerHTML =
            "<p><strong>" + rounded_area + "</strong></p><p>square meters</p>";
        } else {
          answer.innerHTML = "";
          if (e.type !== "draw.delete")
            alert("Use the draw tools to draw a polygon!");
        }
      }
    }
  }
};
//https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
</script>

<style>
#mapa {
  width: 100%;
  height: 100vh;
}
img {
  width: 50px;
}
</style>
