import moment from "moment";

const realFilter = {
  filters: {
    real: function(val) {
      let treat = Number(val).toFixed(2);
      return "R$ " + treat;
    }
  }
};

const zeroNaFrente = {
  filters: {
    zeroNaFrente: function(val) {
      let micro = Number(val);
      if (micro == 0 || micro == "0") {
        return micro;
      }
      let tratamento = micro > 9 ? micro : "0" + micro;
      return tratamento;
    }
  }
};

const dataMomentFormate = {
  filters: {
    dataFormate: function(val) {
      return moment(val).format("DD/MM/YYYY");
    }
  }
};

export { realFilter, zeroNaFrente, dataMomentFormate };
