<template>
  <div class="vcontent">
    <router-view />
    {{ coordenadas }}
    <!--
    <div id="mapa"></div>-->
  </div>
</template>

<style lang="scss" scoped>
#mapa {
  width: 600px;
  height: 400px;
}
.vcontent {
  background-color: #eef2f7;
}
</style>

<script>
import { mapboxgl } from "@/mapbox.js";
export default {
  data() {
    return {
      coordenadas: ""
    };
  },
  mounted() {
    //this.creatMarket();
    //this.fill();
  },
  methods: {
    creatMarket() {
      const self = this;
      var c1 = -46.61849244604204;
      var c2 = -23.459790403571716;

      const map = new mapboxgl.Map({
        container: "mapa",
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [c1, c2],
        zoom: 16
      });
      var marker = new mapboxgl.Marker({
        draggable: true,
        color: "green"
      })
        .setLngLat([c1, c2])
        .addTo(map);

      new mapboxgl.Marker({
        draggable: false,
        color: "red"
      })
        .setLngLat([c1 + 0.05, c2 + 0.05])
        .addTo(map);

      function onDragEnd() {
        var lngLat = marker.getLngLat();
        self.coordenadas =
          "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
      }

      marker.on("dragend", onDragEnd);
    },
    fill() {
      const map = new mapboxgl.Map({
        container: "mapa",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [-47.809120558576495, 21.19004087855673],
        minZoom: 3,
        zoom: 3
      });
      var size = 50;

      // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
      // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function() {
          var canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        // called once before every frame where the icon will be used
        render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;

          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(255, 100, 100, 1)";
          context.strokeStyle = "white";
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
        }
      };

      map.on("load", function() {
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [0, 0]
                }
              }
            ]
          }
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "pulsing-dot"
          }
        });
      });
    }
  }
};
</script>
