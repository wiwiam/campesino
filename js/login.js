var db=firebase.firestore();
//Inicio de sesion
function abrir(){
	var usuario	= document.getElementById('usuario').value;
	var contrasenia = document.getElementById('contrasenia').value;
	var iniciarbtn = document.getElementById('inic');
	var progresbar = document.getElementById('progresbar');
	iniciarbtn.disabled=true;
	progresbar.style.display = 'block';
     
    if (usuario==null || usuario =="" || contrasenia==null ||contrasenia=="") {
    	Materialize.toast('Rellene todos los campos por favor', 4000)
    	iniciarbtn.disabled=false;
	progresbar.style.display = 'none';
    }else{
	firebase.auth().signInWithEmailAndPassword(usuario,contrasenia).then(function(result){
	    firebase.auth().onAuthStateChanged(user=> { if (user) { 
	   	var uid = user.uid;  
        gettipodeusuario(uid)
	   } else {}
  
	    })
	}).catch(function(error) {	

  var errorCode=error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/user-not-found') {
  	Materialize.toast('Usuario incorrecto', 4000)
  	iniciarbtn.disabled=false;
	progresbar.style.display = 'none';
  }
  if (errorCode === 'auth/wrong-password') {
  	Materialize.toast('Contraseña incorrecta', 4000)
  	iniciarbtn.disabled=false;
	progresbar.style.display = 'none';
  }

});
}
}
//Inicio de sesion

//Valiadar tipo de usuario
function gettipodeusuario(id){window.location.href="admin.html";
		
}
//Validar tipo de usuario

	  /* 	db.collection('usuarios').doc(uid).set({
	   		uid :uid,
	   		nombre:"wiwi",
	   		tipo:"admin"
	   		
	   	}).then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
*/
 




