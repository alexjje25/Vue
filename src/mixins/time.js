import moment from "moment-timezone";

const formatZone = "America/Sao_Paulo";

const dataBR = {
  filters: {
    dataBR: function(val) {
      let toZone = moment.tz(val, formatZone);
      return toZone.format("DD/MM/YYYY");
    }
  }
};

const dateFormat = {
  methods: {
    funcFormatData: function(newval) {
      let response = moment.tz(newval, formatZone).format("DD/MM/YYYY");
      if (response == "Invalid date") {
        let toNumber = Number(newval);
        let response2 = moment.tz(toNumber, formatZone).format("DD/MM/YYYY");
        if (response2 == "Invalid date") {
          window.console.log("invalid", newval, response);
          return "erro";
        } else {
          return response2;
        }
      } else {
        return response;
      }
    }
  },
  filters: {
    formataData: function(newval) {
      let response = moment.tz(newval, formatZone).format("DD/MM/YYYY");
      if (response == "Invalid date") {
        let toNumber = Number(newval);
        let response2 = moment.tz(toNumber, formatZone).format("DD/MM/YYYY");
        if (response2 == "Invalid date") {
          window.console.log("invalid", newval, response);
          return "erro";
        } else {
          return response2;
        }
      } else {
        return response;
      }
    }
  }
};

const timeFormat = {
  filters: {
    formatHours: function(newval) {
      let treat = Number(newval);
      let response = moment.tz(treat, formatZone).format("hh:mm:ss");
      return response;
    }
  }
};

const zoneSP = {
  methods: {
    zoneSP(data) {
      let response = moment.tz(data, formatZone);
      return response;
    }
  }
};

export { dataBR, zoneSP, timeFormat, dateFormat };
