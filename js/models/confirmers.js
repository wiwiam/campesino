class Ordenes{
  constructor(){
     this.dbs=firebase.firestore();
    // this.a = new Array(1);  
  }
  loadOs(aerolinea){
       this.dbs.collection("ordenesdeservicio").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                            var contenido= document.getElementById('ordenescontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 blue lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right blue white-text ' style='padding: 3px; border-radius: 4px;' >Confirmado</h7></strong><strong>Ordenes de Servicio: ";
                            var datos=doc.data().folio+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin="<br><br><div class='col m12 s12 l12 center'><a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsView(`"+doc.data().folioG+"`)'>Ver</a></div></div></div>";
                           
                            var inicio1="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 red lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right red white-text ' style='padding: 3px; border-radius: 4px;' >Sin confirmar</h7></strong> <strong>Ordenes de Servicio: ";
                            var datos1=doc.data().folio+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin1="<br><br><div class='col m12 s12 l12 center'><a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsView(`"+doc.data().folioG+"`)'>Ver</a></div></div></div>";
                                if (doc.data().status==true) {
                                   if (aerolinea==doc.data().aerolinea) {
                                     contenido.insertAdjacentHTML("beforeend",inicio+datos+fin); 
                                   }
                                  
                                }else{
                                   if (aerolinea==doc.data().aerolinea) {
                                     contenido.insertAdjacentHTML("beforeend",inicio1+datos1+fin1); 
                                   }
                                 
                                }
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
  getaerolinea(id){
    this.dbs.collection("usuarios").where("uid", "==",id)
      .get()
      .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                const orden=new Ordenes()
                orden.loadOs(doc.data().aerolinea);
            });
           })
      .catch(function(error) {
            console.log("Error getting documents: ", error);
       });
}
 getidandsavefirma(){
            var user = firebase.auth().currentUser;
            if (user) {
                var id=user.uid
                const ordenes =new Ordenes();
                ordenes.savefirma(id);           
              
            } else {
              // No user is signed in. alert()
              window.location.href="index.html";
            }
 }
 savefirma(id){
             var canvas = document.getElementById('canvas');
           var dataURL = canvas.toDataURL();
    return this.dbs.collection('firma').doc(id).update({
                              firma:dataURL,
                              id_usuario: id
                    }).then(refDoc=>{
                        Materialize.toast('Datos agregados con éxito', 4000)
                          const ordenes =new Ordenes();
                          ordenes.checkfirma();  
                    }).catch(refDoc=>{
                      Materialize.toast('Algo ha salido mal', 4000)
                      console.log(refDoc)
                   //   Materialize.toast('Se ha producido un error,porfavor reintenta', 4000)
                    })
 }
 
 loadOsView(id){
        this.dbs.collection("ordenesdeservicio").where("folioG", "==",id)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                            var user = firebase.auth().currentUser;
                                      if (user) {
                                           var id=user.uid
                                           $('#vfolioG').empty()  
                                           $('#vfolioG').append(doc.data().folioG)
                                           $('#vfecha').empty()  
                                           $('#vfecha').append(doc.data().fecha)
                                           $('#vadultos').empty()  
                                           $('#vadultos').append(doc.data().adultos)
                                           $('#vninos').empty()  
                                           $('#vninos').append(doc.data().ninos)
                                           $('#vtotal').empty()  
                                           $('#vtotal').append(doc.data().pax)
                                           $('#vmotivo').empty()  
                                           $('#vmotivo').append(doc.data().contingencia)
                                           $('#vvuelo').empty()  
                                           $('#vvuelo').append(doc.data().vuelo)
                                            $('#vaerolinea').empty()  
                                           $('#vaerolinea').append(doc.data().aerolinea)
                                           $('#vestatus').empty()  
                                           $('#vestatus').append(`${doc.data().status}`)
                                           $('#referencia').empty()  
                                           $('#referencia').append(`${doc.id}`)
                                           var elmtTable = document.getElementById('tabla'); 
                                           var tableRows = elmtTable.getElementsByTagName('tr'); 
                                           var rowCount = tableRows.length; 
                                          if (rowCount>1) {
                                            for (var x=rowCount-1; x>0; x--) { 
                                              elmtTable.deleteRow(x); 
                                          } 
                                          }
                                          

                                          if (doc.data().status==false) {
                                             $('#contenidofirma').empty()
                                             $('#contenidofirma').append('<div class="col l12 s12"><img  id="canvas" name="canvas" ><br> <h7 class="center"  id="nombre_firma"><br>Sin autorizar </h7>&nbsp;<br><button class="btn waves-effect waves-light center" type="button" onclick="adfirmaOs(`'+id+'`)"> + Adjuntar firma</button> </div> ')
                                              const ordenes =new Ordenes();
                                              ordenes.getdetalle(doc.data().folioG); 
                                              var optos = document.getElementById('confirmaros');
                                              optos.style.display = 'block';
                                          }
                                          else{
                                               
                                               $('#contenidofirma').empty()
                                               $('#contenidofirma').append(`<div class="col l12 s12"> <img  id="canvas" name="canvas" ><br>Autorizado por: <h7 class="center"  id="nombre_firma"></h7></div>`)   
                                                const ordenes =new Ordenes();
                                                ordenes.getfirma(doc.data().firma);
                                                ordenes.getdetalle(doc.data().folioG);
                                                var optos = document.getElementById('confirmaros');
                                                optos.style.display = 'none';
                                              

                                           // alert('autorizado')
                                          }
                                                     
                                        
                                      } else {
                                        // No user is signed in. alert()
                                        window.location.href="index.html";
                                      }
                            
                           


                        });
                       })
                    .catch(function(error) {
                          console.log("Error getting documents: ", error);
                    });  
                    $('.modal-content').css('opacity', '1');
 }
 getdetalle(id){                       
this.dbs.collection("ordenesdeservicio").where("folioG", "==",id)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                  
                       const ordenes =new Ordenes()
                       ordenes.paintdetalle(doc.data().id_detalle,id)                            
                              
 //console.log(id,doc.data().id_detalle)
                        });
                       })
                    .catch(function(error) {
                          console.log("Error getting documents: ", error);
                    });

 

               
                    //7  var tr=tabla.insertRow(-1)
                             //tr.innerHTML =`<td>`+ solicitud+`</td><td>`+noches+`</td><td>`+adultos +`</td><td>`+menores +`</td><td>`+hotel +`</td><td>`+transportacion+`</td> <td></td>`
                             //tr.id=solicitud
 }
 paintdetalle(ids,id_os){
   console.log(id_os)

  for (var i = 0; i<=ids; i++) {
     this.dbs.collection("detalle").doc(id_os).collection((i).toString()).doc(id_os).get().then(function(doc) {
                            if (doc.exists) {

                               const tabla=document.getElementById("tabla")
                               var tr=tabla.insertRow(-1)
          tr.innerHTML =`<td>`+ doc.data().solicitud+`</td><td>`+doc.data().noches+`</td><td>`+doc.data().adultos +`</td><td>`+doc.data().menores +`</td><td>`+doc.data().hotel +`</td><td>`+doc.data().transportacion+`</td>`
        
         console.log("Document data:" ,doc.data().solicitud,doc.data().hotel);
                          var progresbar = document.getElementById('eprogresbar');
                            progresbar.style.display = 'none';
                            } else {
                                console.log("No such document!");
                            }
                       
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });


 }                  
}
 getfirma(id){
  this.dbs.collection("firma").where("id_usuario", "==",id)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                  if (doc.data().firma=="none") {
                          var mensaje = confirm("Aun no cuenta con una firma,desea generar una?");
                           if (mensaje) {
                                       window.location.href="firma.html";
                          }
                  }else{
                            var myCanvas = document.getElementById('canvas');
                            myCanvas.src=doc.data().firma
                            $('#nombre_firma').empty()  
                            $('#nombre_firma').append(`${doc.data().nombre}`)
                  }
                            
                        });
                       })
                    .catch(function(error) {

                          console.log("Error getting documents: ", error);
                    });

 }

  checkfirma(){
    var currentUser;
firebase.auth().onAuthStateChanged(function(user){
         
            if (user) {
                var id=user.uid
                const ordenes =new Ordenes();
                ordenes.searchfirma(id);           
              
            } else {
              // No user is signed in. alert()
              window.location.href="index.html";
            }
});


      
     
 }

 searchfirma(id){
                
            return  this.dbs.collection("firma").where("id_usuario", "==",id)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                            if (doc.data().firma=="none") {
                                   
                                  $('#firmacontainer').empty()
                                  $('#firmacontainer').append(`<br>
                                                               <div id="lienzo" ></div>
                                                               <div class="col s12 l3 center"></div>
                                                              <div class="col s12 l12 center"><h5 class="center">Sin firma actual</h5><canvas   class="z-depth-2 "  width="300" height="300" id="canvas" name="canvas" ></canvas></div>
                                                              <div class="col s12 l12 center"><br><button  class="btn-large waves-effect waves-light center" type="button" onclick="guardarfirma()" >Guardar</button>   <button class="btn-large waves-effect waves-light center" type="button" onclick="limpiar()"> Limpiar</button> </div>
                                                              <div class="col s12 l3 center"></div>
                                                              <div class="col s12 l6 center">
                                                               <br> <div class="card-panel red lighten-2 ">
                                                               <i class="material-icons white-text">report_problem</i><br>
                                                                  <span class="white-text"> Por politicas de seguridad en este tour no se permite el acceso a menores de edad.
                                                                  </span>
                                                                </div>
                                                                </div>`)
                                  initialize()           
                                  var progresbar = document.getElementById('eprogresbar');
                            progresbar.style.display = 'none';        
                            }else{
                              $('#firmacontainer').empty()
                              $('#firmacontainer').append(`<div id="lienzo" ></div><div class="col l12 s12 center"> <h5 class="center">Firma actual</h5><img  id="canvas" name="canvas" ><br>Autorizado por: <h7 class="center"  id="nombre_firma"></h7><br><br><button class="btn-large waves-effect waves-light center" type="button"> Solicitar cambio</button></div>`)
                              var myCanvas = document.getElementById('canvas');
                              myCanvas.src=doc.data().firma
                              $('#nombre_firma').empty()  
                              $('#nombre_firma').append(`${doc.data().nombre}`)
                              var progresbar = document.getElementById('eprogresbar');
                              progresbar.style.display = 'none';
                            }
                            
                        });
                       })
                    .catch(function(error) {

                          console.log("Error getting documents: ", error);
                    });
           
           
 
}
confirmarOs(folio){
 var currentUser;
firebase.auth().onAuthStateChanged(function(user){
         
            if (user) {
                var id=user.uid  
                const ordenes =new Ordenes()
                ordenes.procesconfirmacion(folio,id)
                     } else {
              // No user is signed in. alert()
              window.location.href="index.html";
            }
});


}
procesconfirmacion(folio,id){
   var aerolinea = document.getElementById('vaerolinea').innerHTML;
   this.dbs.collection("aerolinea").where("id", "==",aerolinea)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                   const ordenes =new Ordenes()
                  if(doc.data().cambio=="USD"){

                    ordenes.searchcambio(folio,id,doc.data().cambio)
                  }else{
                    ordenes.confirmar(folio,id,"none")
                  }



                        });
                       })
                    .catch(function(error) {

                          console.log("Error getting documents: ", error);
                    });


}
searchcambio(folio,id,divisa){                          
    return  this.dbs.collection("cambio").where("nombre", "==",divisa)
                   .get()
                   .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                     const ordenes =new Ordenes()
                      ordenes.confirmar(folio,id,doc.data().cambio)
                          });
                         })
                      .catch(function(error) {

                            console.log("Error getting documents: ", error);
                      });

}
 confirmar(folio,id,cambio){
        return this.dbs.collection("ordenesdeservicio").doc(folio).update({
                              firma:id,
                              status: true, 
                              cambio:cambio                       
                        })
                        .then(function() {
                            Materialize.toast('Orden autorizada con éxito', 4000)
                             $('#modal1').modal('close');
                             
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
              
     



         

 }

}
 