  const ordenes = new Ordenes()	
//Load OS
db.collection("usuarios").onSnapshot(function(doc) {
 db.collection("ordenesdeservicio").onSnapshot(function(doc) {
		  contenido= document.getElementById('ordenescontenido');    
		  contenido.innerHTML="";
		    var user = firebase.auth().currentUser;
		        if (user) {
		            uid=user.uid           
		            ordenes.getaerolinea(uid)
		        } else {
		          // No user is signed in. alert()
		          window.location.href="index.html";
		        }
		 
		      });
      });
function adfirmaOs(usuario){
  // var mensaje = confirm("Desea eliminar la Orden de servicio de forma permanente?");
	//Detectamos si el usuario acepto el mensaje
//	if (mensaje) {
	 	 const ordenes = new Ordenes();
         ordenes.getfirma(usuario);
//	}
}
 function confirmarOs(){
 	        var folio= $('#referencia').text()
  	        const ordenes = new Ordenes();
            ordenes.confirmarOs(folio);
 }
function loadOsView(id){
   			const ordenes = new Ordenes();
            ordenes.loadOsView(id);
}
