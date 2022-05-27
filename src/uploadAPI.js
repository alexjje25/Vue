import { Storage } from "@/database";

function uploadImagem(file, baseURL, callCHANGED, callERROR, callFINISH) {
  // file - processado $event.target.files[0]
  // baseURL - deve ser montada no component conforme o desejado.
  //var self = this;
  const storageRef = Storage.child(baseURL);

  const metadata = {
    cacheControl: "public,max-age=300"
  };

  const uploadTask = storageRef.put(file, metadata);

  uploadTask.on(
    "state_changed",
    callCHANGED(),
    callERROR(),
    callFINISH()
    /*function(snapshot) {
      self.inUpload = true;
      self.progress.total = snapshot.bytesTransferred;
      self.progress.atual = snapshot.totalBytes;
      self.progress.porcente =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          window.console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          window.console.log("Upload is running");
          break;
      }
    }
    callERROR(error) {
      
      self.inUpload = false;
      window.console.log(error);
      window.alert(error.code);
    },
    function() {
      self.inUpload = false;
      self.include.imagemURL = localImage;
      self.uploadCompleto();
    }*/
  );
}

export { uploadImagem };
