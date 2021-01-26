var db=firebase.firestore();
//Inicio de sesion
function cambiar(){
  var contrasenia1 = document.getElementById('contrasenia1').value;
  var contrasenia2 = document.getElementById('contrasenia2').value;
  var iniciarbtn = document.getElementById('inic');
  var progresbar = document.getElementById('progresbar');
  iniciarbtn.disabled=true;

 

    if (contrasenia1 != contrasenia2 || contrasenia1==null ||contrasenia1=="" || contrasenia2==null ||contrasenia2=="") {
      Materialize.toast('Rellene correctamente campos por favor', 4000)
      iniciarbtn.disabled=false;
       progresbar.style.display = 'none';
    }else{

        var mensaje;
    var opcion = confirm("Está seguro de cambiar su contraseña?,al hacerlo tendrá que volver a iniciar sesion");
    if (opcion == true) {
       
             var user = firebase.auth().currentUser;
var newPassword = contrasenia1;

user.updatePassword(newPassword).then(function() {
   cambiarpassusuario(newPassword)
}).catch(function(error) {
  Materialize.toast(error, 4000)
});


  } else {
      
     iniciarbtn.disabled=false;
  }

 

  
}
     
 
}

function cambiarpassusuario(pass){
var usr = firebase.auth().currentUser;
                              var usuario=usr.email
                               var uid=usr.uid
          return this.db.collection("usuarios").doc(uid).update({
                              pass:pass
               
          })
          .then(function() {
           
               cerrar()
             

          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
}