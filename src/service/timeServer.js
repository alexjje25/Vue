import firebase from "@/database";

function timeServer() {
  firebase
    .database()
    .ref("/.info/serverTimeOffset")
    .on("value", function(offset) {
      var offsetVal = offset.val() || 0;
      var serverTime = Date.now() + offsetVal;
      return serverTime;
    });
}

export { timeServer };
