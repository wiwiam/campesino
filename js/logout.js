//Cerrado de sesion
function cerrar(){
	firebase.auth().signOut().then(()=>{
          window.location.href="index.html";
	}).catch(error=>{
		 Materialize.toast('error', 4000)
	})
}
//Cerrado de sesion