class Perfiles{
  constructor(){
     this.dbs=firebase.firestore();
    // this.a = new Array(1);  
  }
  getdatosdeusuario(){
         var user = firebase.auth().currentUser;
            if (user) {
                var id=user.uid
                this.dbs.collection("usuarios").where("uid", "==",id)
                      .get()
                      .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                    if (doc.data().datos==true) {
                                     $("#perfilcontainer").empty()
                                     $("#perfilcontainer").append(`<div class="col s12 m12 l12 center" ><h5><strong>Perfil de usuario</strong> </h5><br>
                                                                   <div class="col l4 m12 s12"  > 
                                                                   <div class="col s12 m12 l12"><h6><strong>Foto </strong> </h6></div>
                                                                   <div class="row">
                                                                   <div class="col s12 m10 l12">
                                                                   <div class="card">
                                                                   <div class="card-image">
                                                                   <img class="rounded"   id="profileimg" style="height: 330px;">
                                                                   <span class="card-title"></span>
                                                                   <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="editarform()"><i class="material-icons">edit</i></a>
                                                                   </div>     
                                                                   </div>
                                                                   </div>
                                                                   </div>      
                                                                   </div>
                                                                   <div class="col l8 center"><h6 class="center"><strong class="center">Datos </strong> </h6> </div>
                                                                   <div class="col l8 m12 s12 card" style="padding-bottom: 22px; padding-top:20px; " >
                                                                   <div class="input-field col l6 s12">
                                                                   <div class="input-field col l12 s12">
                                                                   <i class="material-icons prefix">account_box</i>
                                                                   <input   type="text" id="uid" class="validate" value="Uid" readonly disabled>
                                                                   </div>
                                                                   <div class="input-field col l12 s12">
                                                                   <i class="material-icons prefix">account_circle</i>
                                                                   <input   type="text" id="nombre" value="Nombre" readonly disabled>
                                                                   </div>
                                                                   <div class="input-field col l12 s12">
                                                                   <i class="material-icons prefix">work</i>
                                                                   <input   type="text" id="puesto" value="Puesto" class="validate" readonly disabled>
                                                                   </div>
                                                                   </div> 
                                                                   <div class="input-field col l6 s12">
                                                                   <div class="input-field col l12 s12">
                                                                   <i class="material-icons prefix">mail</i>
                                                                   <input  type="text" class="validate" id="correo" value="Email" readonly disabled>
                                                                   </div>
                                                                   <div class="input-field col l12 s12">
                                                                   <i class="material-icons prefix">phone</i>
                                                                   <input   type="text" value="Teléfono" id="telefono" class="validate" readonly disabled>
                                                                   </div>
                                                                   <div class="input-field col l12 s12">
                                                                   <button class="btn-large waves-effect waves-light center" type="button" id="editar" onclick="editarform()" style="width: 100%;"   >Editar
                                                                   </button>
                                                                   </div>
                                                                   </div>   
                                                                   </div>`);                                
                                     var uids = document.getElementById("uid");
                                     uids.value =uid
                                     var nombre = document.getElementById("nombre");
                                     nombre.value = doc.data().nombre
                                     var puesto = document.getElementById("puesto");
                                     puesto.value = doc.data().puesto
                                     var correo = document.getElementById("correo");
                                     correo.value =doc.data().correo 
                                     var telefono = document.getElementById("telefono");
                                     telefono.value =doc.data().telefono

                                     if (doc.data().profileimg==true) {
                                      var myCanvas = document.getElementById('profileimg');
                                      myCanvas.src='img/users/'+uid+'.jpeg'
                                       
                                     }else{
                                       var myCanvas = document.getElementById('profileimg');
                                      myCanvas.src='img/users/profil.png'
                                     }
                                     var progresbar = document.getElementById('eprogresbar');
                                     progresbar.style.display = 'none';
                                    

                               }else{
                                $("#perfilcontainer").empty();
                                  $("#perfilcontainer").append('Contacte al administrador para activar sus datos');
                                      var progresbar = document.getElementById('eprogresbar');
                                    progresbar.style.display = 'none';

                               }

                            });
                           })
                      .catch(function(error) {
                            console.log("Error getting documents: ", error);
                      });
               //alert(index)
               // const perfiles =new Perfiles();
            } else {
              window.location.href="index.html";
            }
  }

getdatosdeusuarioforedit(){
               var progresbar = document.getElementById('eprogresbar');
                                    progresbar.style.display = 'block';
var user = firebase.auth().currentUser;
            if (user) {
                var id=user.uid
                this.dbs.collection("usuarios").where("uid", "==",id)
                      .get()
                      .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                    if (doc.data().datos==true) {
                                     var uids = document.getElementById("uid");
                                     uids.value =uid
                                     var nombre = document.getElementById("nombre");
                                     nombre.value = doc.data().nombre
                                     var puesto = document.getElementById("puesto");
                                     puesto.value = doc.data().puesto
                                     var correo = document.getElementById("correo");
                                     correo.value =doc.data().correo 
                                     var telefono = document.getElementById("telefono");
                                     telefono.value =doc.data().telefono
                                     var ref = document.getElementById("referencia");
                                     referencia.value =doc.id
                                      if (doc.data().profileimg==true) {
                                      var myCanvas = document.getElementById('profileimg');
                                      myCanvas.src='img/users/'+uid+'.jpeg'
                                       
                                     }else{
                                       var myCanvas = document.getElementById('profileimg');
                                      myCanvas.src='img/users/profil.png'
                                     }
                                     var progresbar = document.getElementById('eprogresbar');
                                     progresbar.style.display = 'none';
                               }else{
                                  $("#perfilcontainer").load('addperfil.html');
                                      var progresbar = document.getElementById('eprogresbar');
                                    progresbar.style.display = 'none';

                               }

                            });
                           })
                      .catch(function(error) {
                            console.log("Error getting documents: ", error);
                      });
               //alert(index)
               // const perfiles =new Perfiles();
            } else {
              window.location.href="index.html";
            }
} 
savedatosuser(uid,nombre,passactual,newpass,newpass1,puesto,telefono,cambiante){
                                   if (cambiante==true) {
                                           var user = firebase.auth().currentUser;
                                                 if (user) {
                                                      var id=user.uid 

                                                       this.dbs.collection("usuarios").where("uid", "==",id)
                        .get()
                        .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                      if (doc.data().datos==true) {
                                        if (passactual==doc.data().contrasenia) {
                                                      if (newpass==newpass1) {
                                                             const perfiles=new Perfiles();
                                                               perfiles.savedatoswithpass(nombre,puesto,telefono,newpass);
                                                      }else{
                                                        alert('las nuevas contraseñas no coinciden verifica que sean la misma contraseña en los dos campos')
                                                      }
                                        }else{
                                          alert('la contraseña no es la misma que la del usuario actual')
                                        }
                                 }else{
                                     

                                 }

                              });
                             })
                        .catch(function(error) {
                              console.log("Error getting documents: ", error);
                        });



                                                     } else {
                                                           window.location.href="index.html";
                                                        }
                                           
                                   }else{
                                      var mensaje = confirm("No ha realizado un cambio de contraseña desea continuar?");
  //Detectamos si el usuario acepto el mensaje
                                   if (mensaje) {
                                         
                                    const perfiles=new Perfiles();
                                    perfiles.savedatos(nombre,puesto,telefono,newpass);
                                        }
                                   
                                   }
                                     //alert(cambiante)
                                   


}
savedatos(nombre,telefono,puesto){
                             var usr = firebase.auth().currentUser;
                                           var id=usr.uid
                           return this.dbs.collection("usuarios").doc(id).update({
                                            nombre: nombre,
                                            puesto:puesto,
                                            telefono:telefono,
                                            datos:true
                 
                                        })
                       .then(function() {
                               Materialize.toast('Datos guardados con éxito', 4000)
                            $('#modal2').modal('close');
                            })
                           .catch(function(error) {
                // The document probably doesn't exist.
                                   console.error("Error updating document: ", error);
                               });
}
savedatoswithpass(nombre,telefono,puesto,contrasenia){
                             var usr = firebase.auth().currentUser;
                                           var id=usr.uid
                           return this.dbs.collection("usuarios").doc(id).update({
                                            nombre: nombre,
                                            puesto:puesto,
                                            telefono:telefono,
                                            contrasenia:contrasenia,
                                            datos:true
                 
                                        })
                       .then(function() {
                                   
                                      
firebase.auth().onAuthStateChanged(function(user){
           var user = firebase.auth().currentUser;
                                          
            if (user) {
                
                
                                             user.updatePassword(contrasenia).then(function() {
                                        Materialize.toast('Datos guardados con éxito y contraseña cambiada correctamente', 4000)
                            
                                      
                                          }).catch(function(error) {
                                            // An error happened.
                                          });        
              
            } else {
              // No user is signed in. alert()
              window.location.href="index.html";
            }
});

                                        

                                          // Prompt the user to re-provide their sign-in credentials


                                  
                             
                            })
                           .catch(function(error) {
                // The document probably doesn't exist.
                                   console.error("Error updating document: ", error);
                               });
}

}