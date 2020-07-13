$(document).ready(function () {  
	 db.collection("usuarios").onSnapshot(function(doc) {
		            getdatosdeusuario()
		      });
 
 
  });	

function getdatosdeusuario(){
	const perfiles = new Perfiles();
    perfiles.getdatosdeusuario()  
}

function savedatosuser(){
			const uid=$('#uid').val()		    
		    const nombre=$('#nombre').val()
			const passactual=$('#passactual').val()
			const newpass=$('#newpass').val()
			const newpass1=$('#newpass1').val()
			const puesto=$('#puesto').val()
			const telefono=$('#telefono').val()

			if (nombre=="" ||  puesto =="" || telefono=="" ) {

				Materialize.toast('Porfavor revisa los campos', 4000)
			 

			}else{
				 
					if (passactual!="" || newpass!="" || newpass!="") {
						            var cambiante=true
								  const perfiles = new Perfiles();
                                  perfiles.savedatosuser(uid,nombre,passactual,newpass,newpass1,puesto,telefono,cambiante) 
					}else{
                                  const perfiles = new Perfiles();
                                   var cambiante=false;
  								  perfiles.savedatosuser(uid,nombre,passactual,newpass,newpass1,puesto,telefono,cambiante) 
					}

			}

  
}
function editarform(){
	 $("#perfilcontainer").empty()
	 $("#perfilcontainer").load('addperfil.html')
	 const perfiles = new Perfiles();
     perfiles.getdatosdeusuarioforedit() 
}