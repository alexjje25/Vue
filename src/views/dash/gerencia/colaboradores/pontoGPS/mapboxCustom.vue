<template>
  <div>
    <div class="zoomOption">
      <button @click="zoomOption = 11" class="btn">Normal</button>
      <button @click="zoomOption = 12" class="btn">12x</button>
      <button @click="zoomOption = 14" class="btn">14x</button>
      <button @click="zoomOption = 16" class="btn">16x</button>
    </div>

    <MglMap
      id="mapa"
      :access-token="mapbox_key"
      :map-style.sync="mapStyle"
      :center="[center.y, center.x]"
      :zoom="zoomOption"
      :attributionControl="false"
    >
      <MglAttributionControl />
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglScaleControl />
      <MglFullscreenControl />

      <!-- custom source talhoes -->
      <MglGeojsonLayer
        minzoom="7"
        :source-id="sourceId[0]"
        :source="source[0]"
        :layer-id="layer[0].id"
        :layer="layer[0]"
      />

      <MglGeojsonLayer
        minzoom="7"
        :source-id="sourceId[1]"
        :source="source[1]"
        :layer-id="layer[1].id"
        :layer="layer[1]"
      />

      <MglMarker
        v-for="(item, index) in lista"
        :key="index"
        :coordinates="[item.dados.coord.long, item.dados.coord.lat]"
        color="red"
        class="marker"
        anchor="top"
      >
        <MglPopup class="boxContainPoint">
          <div>
            <div class="titulo">
              <div>
                <vModoGPS :modo="item.dados.modo" />
              </div>
            </div>
            <div class="conteudo">
              <div class="boxGrid">
                <div>
                  <div>
                    <div class="tt">DATA / HORA</div>
                    <div class="dd">
                      {{ item.chave | formataData }}
                      - {{ item.chave | formatHours }}
                    </div>
                  </div>
                  <div>
                    <div class="tt">Colaborador</div>
                    <div class="dd">
                      <vColaborador :chave="item.dados.idColaborador" />
                    </div>
                  </div>
                  <div>
                    <div class="tt">LAT / LONG</div>
                    <div class="tt">
                      <small>
                        {{ item.dados.coord.long }},
                        {{ item.dados.coord.lat }}
                      </small>
                    </div>
                  </div>
                </div>
                <div>
                  <img :src="item.dados.imgPonto" />
                </div>
              </div>
            </div>
          </div>
        </MglPopup>
        <div slot="marker">
          <div>
            <div v-if="item.dados.modo == '1'">
              <img class="icone" :src="require('./marks/mark1.png')" />
            </div>
            <div v-if="item.dados.modo == '2'">
              <img class="icone" :src="require('./marks/mark2.png')" />
            </div>
            <div v-if="item.dados.modo == '3'">
              <img class="icone" :src="require('./marks/mark3.png')" />
            </div>
            <div v-if="item.dados.modo == '4'">
              <img class="icone" :src="require('./marks/mark4.png')" />
            </div>
          </div>
        </div>
      </MglMarker>

      <MglGeojsonLayer
        minzoom="7"
        :source-id="layer[3].source"
        :source="sourceTalhoesPolygon"
        :layer-id="layer[3].id"
        :layer="layer[3]"
      />

      <MglGeojsonLayer
        minzoom="7"
        :source-id="layer[2].source"
        :source="sourceTalhoesLine"
        :layer-id="layer[2].id"
        :layer="layer[2]"
      />
      <!--
    <MglGeojsonLayer
      :key="index + 2000"
      v-for="(talhaoLine, index) in sourceTalhoesLine"
      minzoom="7"
      :sourceId="sourceId[3]"
      :source="talhaoMult"
      :layerId="layer[2].id"
      :layer="layer[2]"
    />-->
    </MglMap>
    <div class="FooterMap">
      <img src="@/assets/image/imagem-mapa.png" class="FooterMapImage" />
    </div>
  </div>
</template>

<script>
import {
  MglMap,
  MglMarker,
  MglGeojsonLayer,
  MglPopup,
  MglAttributionControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl
} from "vue-mapbox";
import { CHAVE_MAPBOX } from "@/mapbox.js";
import vColaborador from "@/components/idColaboradorPorNome";
import vModoGPS from "@/components/dash/modoPontoGPS";
import { dateFormat, timeFormat } from "@/mixins/time";

export default {
  mixins: [dateFormat, timeFormat],
  components: {
    vModoGPS,
    MglMap,
    MglMarker,
    MglGeojsonLayer,
    MglPopup,
    vColaborador,
    MglAttributionControl,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglScaleControl
  },
  props: ["lista"],
  data() {
    return {
      zoomOption: 11,
      talhoesActived: false,
      sourceTalhoesPolygon: {},
      sourceTalhoesLine: {},
      layer: [
        {
          //em uso
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 2,
            "line-opacity": 1
          }
        },
        {
          //em uso
          id: "maine",
          type: "fill",
          source: "maine",
          layout: {},
          paint: {
            "fill-color": "#ffffff",
            "fill-opacity": 0.1
          }
        },
        {
          id: "talhoesLine",
          type: "line",
          source: "talhoesLine",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "rgb(255,255,255)",
            "line-width": 2,
            "line-opacity": 1
          }
        },
        {
          id: "TalhoesPolygon",
          type: "fill",
          source: "TalhoesPolygon",
          layout: {},
          paint: {
            "fill-color": "rgb(255,255,255)",
            "fill-opacity": 0.2
          }
        }
      ],
      sourceId: ["route", "maine", "talhoes", "talhoesLine"],
      source: [],
      mensagem: "SUA FAZENDA",
      mapStyle: "mapbox://styles/mapbox/satellite-streets-v11",
      coordinates: [
        this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y,
        this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x
      ],
      rangeFazenda: []
    };
  },
  computed: {
    GET_TALHOES() {
      return this.$store.getters["fazenda/GET_TALHOES"].filter(item => {
        if (item.dados.area) {
          return true;
        } else {
          return false;
        }
      });
    },
    colors() {
      return this.$store.getters["fazenda/GET_COLORS"];
    },
    mapbox_key() {
      return CHAVE_MAPBOX;
    },
    centerMap() {
      return [
        this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y,
        this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x
      ];
    }
  },
  beforeMount() {
    //var self = this;
    this.center = {
      y: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y,
      x: this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x
    };
    this.includeArea();
    this.includeRect();
    this.includeTalhoes();
  },
  methods: {
    //LINE UTILIZA ARRAY COMUM, Polygon usar array dentro de array
    mountFeatureLine(dados) {
      const rest = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: dados
        }
      };

      return rest;
    },
    includeTalhoes() {
      let self = this;
      let lista = this.GET_TALHOES;

      var multiLine = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      };

      var multiPoly = {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: []
          }
        }
      };

      lista.forEach(element => {
        multiPoly.data.geometry.coordinates.push([element.dados.area]);
        let response2 = self.mountFeatureLine(
          element.dados.area,
          element.dados.name
        );
        multiLine.data.features.push(response2);
      });
      self.sourceTalhoesPolygon = multiPoly;
      self.sourceTalhoesLine = multiLine;
    },

    modelStruct(rootType, type, subtype, dados) {
      let estrutura = {
        type: rootType,
        data: {
          type: type,
          geometry: {
            type: subtype,
            coordinates: dados
          }
        }
      };
      return estrutura;
    },
    includeArea() {
      let dados = this.$store.getters["fazenda/GET_AREA_FAZENDA"];
      let response = this.modelStruct(
        "geojson",
        "Feature",
        "LineString",
        dados
      );
      this.source.push(response);
    },
    includeRect() {
      let dados = this.$store.getters["fazenda/GET_AREA_FAZENDA"];
      let response = this.modelStruct("geojson", "Feature", "Polygon", [dados]);
      this.source.push(response);
    }
  }
};
</script>

<style lang="css">
.mapboxgl-popup-content {
  padding: 0px;
}
</style>

<style lang="scss" scoped>
.designBtn {
  padding: 6px 8px;
  font-size: 12px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 1);
  border-left: 5px solid #336633;
  color: rgb(57, 57, 57);
  font-weight: 500;
}
.mapboxgl-popup {
  max-width: 500px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  .boxGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 100px;
  }
}
.mapboxgl-popup {
  .mapboxgl-popup-content {
    padding: 0px !important;
    .titulo {
      padding: 6px;
      background-color: #e5e5e5;
      text-transform: uppercase;
      color: #336535;
      font-weight: 900;
      text-align: center;
    }
    .conteudo {
      padding: 10px;
      font-size: 10px;
    }
  }
}

.icone {
  width: 30px;
}
.uiMap {
  position: absolute;
  z-index: 5;
  .listafloat {
    //padding: 5px;
    //background-color: rgba(255, 255, 255, 0.5);
    color: black;
    overflow: auto;
    max-height: 600px;
    .item {
      padding: 5px;
      margin: 5px;
      background-color: rgba(255, 255, 255, 0.5);
      max-width: 40vw;
    }
  }
}
.uperCOORD {
  display: inline-block;
  position: absolute;
  z-index: 5;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
#mapa {
  width: 100%;
  height: 600px;
}
.marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

img {
  width: 50px;
}
@import "@/style/dash/gerencia/mapa";
</style>
