var db=firebase.firestore();
//Inicio de sesion
function crear(){
	var nombre	= document.getElementById('nombre').value;
	var usuario	= document.getElementById('usuario').value;
	var contrasenia1 = document.getElementById('contrasenia1').value;
	var contrasenia2 = document.getElementById('contrasenia2').value;
	var iniciarbtn = document.getElementById('inic');
	var progresbar = document.getElementById('progresbar');
	iniciarbtn.disabled=true;
	progresbar.style.display = 'block';
     
    if (contrasenia1 != contrasenia2 || nombre==null || nombre =="" || usuario==null || usuario =="" || contrasenia1==null ||contrasenia1=="" || contrasenia2==null ||contrasenia2=="") {
    	Materialize.toast('Rellene todos los campos por favor', 4000)
    	iniciarbtn.disabled=false;
	progresbar.style.display = 'none';
    }else{
    	var sign = prompt("Ingrese la contraseña de administrador");

if (sign.toLowerCase() == "olakace1") {
    firebase.auth().createUserWithEmailAndPassword(usuario, contrasenia1)
  .then((user) => {
    Materialize.toast('Usuario creado correctamente', 4000)
    crearusuario(nombre,usuario,contrasenia1)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Materialize.toast(errorMessage, 4000)
    // ..
  });



}else{Materialize.toast('contraseña incorrecta contacte al administrador del sistema :)', 4000)}

	
}
}

function crearusuario(nombre,email,pass){
 firebase.auth().onAuthStateChanged(user=> { if (user) { 
	   	var uid = user.uid;  
        

          return db.collection("usuarios").doc(uid).set({
                                                  correo:email,
                                                  nombre:nombre,
                                                  uid: uid,
                                                  pass: pass
                    })
                    .then(function() {

 
                        Materialize.toast('Datos agregados con éxito', 4000)
                           cerrar()
         		    
                                           
                    })
                    .catch(function(error) {
                        Materialize.toast('Se ha producido un error,porfavor reintenta', 4000)
                    });



	  } else {}
  
	    })
}