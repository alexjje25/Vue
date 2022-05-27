<template>
  <div class="grid containReports">
      <div>
          <v-container class="grey lighten-5 rounded-lg">
            <h1 class="h1">NDVI Análise</h1>
              <h1>Dados:</h1>
             <h1>Maximo {{ ndvi }}</h1>             
              <div>
                  <img src="https://api.agromonitoring.com/image/1.0/120586c3b00/627aad3bc686b0652f088c78?appid=d901f4fefcba0b386ce2506f375e39b3" alt="" />
              </div>
          </v-container>
            
              <div>
                <img src="https://api.agromonitoring.com/image/1.0/0205872d280/627aad3bc686b0652f088c78?appid=d901f4fefcba0b386ce2506f375e39b3" alt="" class="width: 100px" />
              </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Ndvi",
    data() {
        return {
            ndvi: null
        }
    },
    props: {

    },
    components: {
        
    },

    mounted: function () {
        axios.get('https://api.agromonitoring.com/stats/1.0/0235872d280/627aad3bc686b0652f088c78?appid=d901f4fefcba0b386ce2506f375e39b3')
            .then((response) =>(this.ndvi = response.data.num))    
    },
}
</script>

<style lang="scss" scoped>
    grid {
        display: grid;
	    grid-template-columns: 1fr 1fr;
    }
    containReports {
        grid-template-rows: 50px 100px 50px 150px;
    } 

    h1 {
        text-align: center;
    }


</style>
