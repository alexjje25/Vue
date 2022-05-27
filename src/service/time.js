function timelocal() {
  var data = new Date();
  var d = data.getDate();
  var m = data.getMonth() + 1;
  var a = data.getFullYear();
  var resultado = d + "/" + m + "/" + a;
  return resultado;
}

export { timelocal };
