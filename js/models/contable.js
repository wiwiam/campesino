class Contable{
	constructor(){
	   this.dbs=firebase.firestore();
	}
	  loadOs(){
       this.dbs.collection("ordenesdeservicio").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                            var contenido= document.getElementById('ordenescontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 blue lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right blue white-text ' style='padding: 3px; border-radius: 4px;' >Confirmado</h7></strong><strong>Folio: ";
                            var datos=doc.data().folioG+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin="<br><br><div class='col m12 s12 l12 center'> <a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsView(`"+doc.data().folioG+"`)'><i class='large material-icons'>visibility</i></a></div></div></div></div>";
                           
                            var inicio1="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 red lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right red white-text ' style='padding: 3px; border-radius: 4px;' >Sin confirmar</h7></strong><strong>Folio: ";
                            var datos1=doc.data().folioG+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin1="<br><br><div class='col m12 s12 l12 center'> <a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsView(`"+doc.data().folioG+"`)'><i class='large material-icons'>visibility</i></a></div></div></div></div>";
                           
                                if (doc.data().status==true) {
                                   contenido.insertAdjacentHTML("beforeend",inicio+datos+fin); 
                                }else{
                                  contenido.insertAdjacentHTML("beforeend",inicio1+datos1+fin1); 
                                }
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
  loadOscxp(){
       this.dbs.collection("ordenesdeservicio").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                            var contenido= document.getElementById('ordenescontenidocxp');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 blue lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right blue white-text ' style='padding: 3px; border-radius: 4px;' >Confirmado</h7></strong><strong>Folio: ";
                            var datos=doc.data().folioG+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin="<br><br><div class='col m12 s12 l12 center'> <a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsViewcxp(`"+doc.data().folioG+"`)'><i class='large material-icons'>visibility</i></a></div></div></div></div>";
                           
                            var inicio1="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 red lighten-5'  style='padding:25px; border-radius:12px;'><strong><h7 class='right red white-text ' style='padding: 3px; border-radius: 4px;' >Sin confirmar</h7></strong><strong>Folio: ";
                            var datos1=doc.data().folioG+"<br></strong>Fecha: "+doc.data().fecha+"<br> Empleado: "+doc.data().usuario+ "<br> Sucursal: "+doc.data().sucursal+"<br> Representante: "+doc.data().representante+"<br> Aerolinea: "+doc.data().aerolinea+"<br> Vuelo: "+doc.data().vuelo+"<br> Contingencia: "+doc.data().contingencia+"<br> Pax: "+doc.data().pax;
                            var fin1="<br><br><div class='col m12 s12 l12 center'> <a class='btn waves-effect waves-orange white black-text modal-trigger ' href='#modal1'  style='border-radius: 6px; ' onclick='loadOsViewcxp(`"+doc.data().folioG+"`)'><i class='large material-icons'>visibility</i></a></div></div></div></div>";
                           
                                if (doc.data().status==true) {
                                   contenido.insertAdjacentHTML("beforeend",inicio+datos+fin); 
                                }else{
                                  contenido.insertAdjacentHTML("beforeend",inicio1+datos1+fin1); 
                                }
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

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
                                            $('#cambio').empty()  
                                           $('#cambio').append(doc.data().cambio)
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
                                          

                                             
                                               $('#contenidofirma').empty()
                                               $('#contenidofirma').append(`<img  id="canvas" name="canvas" class="responsive-img"><br>Autorizado por: <h7 class="center"  id="nombre_firma"></h7> `)   
                                                const contable =new Contable();
                                                contable.getfirma(doc.data().firma);
                                                contable.getdetalle(doc.data().folioG);
                                             
                                                     
                                        
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
    loadOsViewcxp(id){
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
                                            $('#cambio').empty()  
                                           $('#cambio').append(doc.data().cambio)
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
                                          

                                             
                                               $('#contenidofirma').empty()
                                               $('#contenidofirma').append(`<img  id="canvas" name="canvas" class="responsive-img"><br>Autorizado por: <h7 class="center"  id="nombre_firma"></h7> `)   
                                                const contable =new Contable();
                                                contable.getfirma(doc.data().firma);
                                                contable.getdetallecxp(doc.data().folioG);
                                             
                                                     
                                        
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
                  
                       const contable =new Contable();
                       contable.paintdetalle(doc.data().id_detalle,id)                            
                              
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

  getdetallecxp(id){                       
this.dbs.collection("ordenesdeservicio").where("folioG", "==",id)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                  
                       const contable =new Contable();
                       contable.paintdetallecxp(doc.data().id_detalle,id)                            
                              
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
 //  console.log(id_os)
  $('#pingresos').empty() 
   $('#pingresos').append('0') 
 var cont=0;
  for (var i = 0; i<=ids; i++) {

     this.dbs.collection("detalle").doc(id_os).collection((i).toString()).doc(id_os).get().then(function(doc) {
                            if (doc.exists) {

                               const tabla=document.getElementById("tabla")
                               var tr=tabla.insertRow(-1)
          tr.innerHTML =`<td>`+ doc.data().solicitud+`</td><td>`+doc.data().noches+`</td><td>`+doc.data().adultos +`</td><td>`+doc.data().menores +`</td><td>`+doc.data().hotel +`</td><td>`+doc.data().transportacion+`</td><td>`+doc.data().tarifaadulto+`</td><td>`+doc.data().tarifamenor+`</td><td>`+doc.data().total+`</td>`
            	
            //alert((parseInt(cont))+(parseInt(doc.data().total)))
       //  console.log("Document data:" ,doc.data().solicitud,doc.data().hotel);  
                                           var pingresos = document.getElementById("pingresos").innerHTML;
                                          if (doc.data().cambio=="USD") {
                                                var cambio = document.getElementById("cambio").innerHTML;
                                                var total =parseFloat(pingresos)+parseFloat(doc.data().total*parseInt(cambio));
                                          }else{
                                               var total =parseFloat(pingresos)+parseFloat(doc.data().total);
                                          }
                                           
                                          
                                           console.log(pingresos,parseInt(doc.data().total))
                                           var iva=total*.16
                                           var t=parseFloat(iva)+parseFloat(total)
                                           $('#pingresos').empty() 
                                           $('#iva').empty() 
                                           $('#total').empty() 
                                           $('#pingresos').append(`${total}`) 
                                           $('#iva').append(iva) 
                                           $('#total').append(t) 
                                      
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

 paintdetallecxp(ids,id_os){
 //  console.log(id_os)
  $('#pingresos').empty() 
   $('#pingresos').append('0') 
    $('#total').empty() 
   $('#total').append('0') 
 var cont=0;
  for (var i = 0; i<=ids; i++) {

     this.dbs.collection("detalle").doc(id_os).collection((i).toString()).doc(id_os).get().then(function(doc) {
                            if (doc.exists) {

                               const tabla=document.getElementById("tabla")
                               var tr=tabla.insertRow(-1)
          tr.innerHTML =`<td>`+ doc.data().solicitud+`</td><td>`+doc.data().noches+`</td><td>`+doc.data().adultos +`</td><td>`+doc.data().menores +`</td><td>`+doc.data().hotel +`</td><td>`+doc.data().transportacion+`</td><td>`+doc.data().tarifaadultocxp+`</td><td>`+doc.data().tarifamenorcxp+`</td><td>`+doc.data().totalcxp+`</td>`
              
            //alert((parseInt(cont))+(parseInt(doc.data().total)))
       //  console.log("Document data:" ,doc.data().solicitud,doc.data().hotel);  
                                           var pingresos = document.getElementById("pingresos").innerHTML;
                                          if (doc.data().cambio=="USD") {
                                                var cambio = document.getElementById("cambio").innerHTML;
                                                var total =parseFloat(pingresos)+parseFloat(doc.data().totalcxp*parseInt(cambio));
                                          }else{
                                               var total =parseFloat(pingresos)+parseFloat(doc.data().totalcxp);
                                          }
                                           
                                          
                                           console.log(pingresos,parseInt(doc.data().total))
                                           var iva=total*.16
                                           var t=parseFloat(iva)+parseFloat(total)
                                           $('#pingresos').empty() 
                                           $('#iva').empty() 
                                           $('#total').empty() 
                                           $('#pingresos').append(`${total}`) 
                                           $('#iva').append(iva) 
                                           $('#total').append(t) 
                                      
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


}