 var db=firebase.firestore();
 db.collection("usuarios").onSnapshot(function(doc) {
        var user = firebase.auth().currentUser;
        if (user) {
            uid=user.uid
            email=user.email            
            gettipodeusuario(uid)
        } else {
          // No user is signed in. alert()
          window.location.href="index.html";
        }
    });

function gettipodeusuario(id){
    db.collection("usuarios").where("uid", "==",id)
      .get()
      .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                    var currectusr= document.getElementById('usuario');     
                    currectusr.innerHTML="<i class='medium left material-icons'>account_circle</i><i class='material-icons right'>arrow_drop_down</i>"+doc.data().nombre; 
                    var currectusr1= document.getElementById('usr');
                    currectusr1.innerHTML=doc.data().nombre;
                     var currectusr2= document.getElementById('email');
                    currectusr2.innerHTML=doc.data().correo;
            });
           })
      .catch(function(error) {
            console.log("Error getting documents: ", error);
       });
}


/*
function Usuario(uid,correo) {
  this.uid=uid; 
  this.correo=correo;
};

 Usuario.prototype.validar = function() {
  gettipodeusuario(this.uid)
  console.log(this.uid)
};

Usuario.prototype.cargardatos = function() {
   
};
*/