<template>
  <div>
    vuemapbox ! testar!!!!
    <div class="uperCOORD">{{ center.lon }}, {{ center.lat }}</div>
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
      center: {
        lon: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y,
        lat: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x
      },
      globalMarkers: this.$store.getters["fazenda/GET_GLOBAL_PRAGAS_MARKS"]
    };
  },
  watch: {
    globalMarkers: function() {
      window.console.log("conteudo novo!");
      this.removeMarkersInList();
      this.renderMakersInList();
    }
  },
  mounted() {
    this.gerarMapMaket();
  },
  methods: {
    renderMakersInList() {
      window.console.log("renderLista");
      this.globalMarkers = this.$store.getters[
        "fazenda/GET_GLOBAL_PRAGAS_MARKS"
      ];
      //this.globalMarkers = this.$store.state.fazenda.globalPragasMonitoradas; mesmo esquema...
      var self = this;
      for (var i = self.globalMarkers.length - 1; i >= 0; i--) {
        let item = self.globalMarkers[i];
        var el = document.createElement("div");
        el.className = "marker marker" + item.chave;
        new mapboxgl.Marker(el)
          .setLngLat([item.dados.coord.long, item.dados.coord.lat])
          .addTo(self.map);
      }
    },
    removeMarkersInList() {
      window.console.log("removeItem");
      var self = this;

      if (self.globalMarkers !== null) {
        for (var i = self.globalMarkers.length - 1; i >= 0; i--) {
          //constantes
          var marker = self.globalMarkers[i];
          var classname = "marker marker" + marker.dados.chave;
          //funcao
          const removeElements = elms => elms.forEach(el => el.remove());
          removeElements(document.querySelectorAll(`.${classname}`));

          // old
          // var elemento = document.getElementsByClassName();
          // elemento.remove();
        }
        this.globalMarkers = [];
      }
    },
    markToBox(coord) {
      var self = this;
      var box = document.createElement("div");
      box.className = "marker48g88474gad";
      var imagem = require("@/assets/icons/rurall-05.png");
      //el.style.backgroundImage = `"url(${require("@/assets/icons/rurall-05.png")}")`;
      box.style.backgroundImage = `url(${imagem})`;
      box.style.width = "25px";
      box.style.height = "25px";
      box.style.backgroundSize = "100% 100%";
      new mapboxgl.Marker(box)
        .setLngLat(coord)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML("<h3>blabla</h3><p>car car !</p>")
        )
        .addTo(self.map);

      box.onclick = function() {
        //window.alert("teste");
      };
    },
    gerarBox() {
      var self = this;
      var imagem = require("@/assets/icons/rurall-05.png");
      new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([-44.107994, -12.611511])
        .setHTML(`Contem: ${this.mensagem}  <img src='${imagem}'/> `)
        .addTo(self.map);
    },
    gerarMapMaket() {
      window.console.log("renderMap");
      var estilo;
      var self = this;
      estilo = "mapbox://styles/mapbox/satellite-streets-v11";

      //const x = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x;
      //const y = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y;

      // O CENTER É INVERTIDO PELA API
      // LONGITUDE E LATITUDE
      self.map = new mapboxgl.Map({
        container: "mapa",
        style: estilo,
        //center: [self.center.lon, self.center.lat],
        center: ["-47.82977383", "-21.16680714"],
        zoom: 15
      });

      this.markToBox([self.center.lon, self.center.lat]);

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

      var marker = new mapboxgl.Marker({
        draggable: true,
        color: "green"
      })
        .setLngLat([self.center.lon, self.center.lat])
        .addTo(self.map);

      function onDragEnd() {
        var lngLat = marker.getLngLat();
        self.coordenadas =
          "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
      }
      marker.on("dragend", onDragEnd);
      this.renderMakersInList();
    }
  }
};

//https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
</script>

<style>
.uperCOORD {
  display: inline-block;
  position: absolute;
  z-index: 5;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
#mapa {
  width: 100%;
  height: 100vh;
}

.marker {
  background-image: url("../../../assets/icons/Rurall_ico_café.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

img {
  width: 50px;
}
</style>
