class Ordenes{
	constructor(){
	   this.dbs=firebase.firestore();
     this.a = new Array(1);  
	}
   //Escribir
  crearOs(fecha,codigo,descripcion,distribuidor,publico,mayoreo,veinte,treinta,existencia){
                                       
                                       var usr = firebase.auth().currentUser;
                                       var usuario=usr.email

                                      return db.collection("articulos").doc(codigo).set({
                                                  fecha:fecha,
                                                  codigo:codigo,
                                                  descripcion: descripcion,
                                                  distribuidor: distribuidor,
                                                  publico: publico,
                                                  mayoreo: mayoreo,
                                                  veinte: veinte,
                                                  treinta:treinta,
                                                  existencia: existencia,
                                                  usuario: usuario
                    })
                    .then(function() {


                      $('#modal001').modal('close');
                       document.getElementById("codigo").value ="";
                            document.getElementById("descripcion").value ="";
                            document.getElementById("mayoreo").value ="";
                             document.getElementById("publico").value ="";
                            document.getElementById("distribuidor").value ="";
                            document.getElementById("existencia").value ="";
                       
            $('#veinte').empty();
                $('#treinta').empty();
                        Materialize.toast('Datos agregados con éxito', 4000)
                            
                           
         		    
                                           
                    })
                    .catch(function(error) {
                        Materialize.toast('Se ha producido un error,porfavor reintenta', 4000)
                    });


                              
       }

crearPedido(fecha,folio,nombre,total){
                                       
                                       var usr = firebase.auth().currentUser;
                                       var usuario=usr.email

                                      return db.collection("pedidos").doc(folio).set({
                                                  fecha:fecha,
                                                  folio:folio,
                                                  cliente:nombre,
                                                  usuario: usuario,
                                                  total: total
                    })
                    .then(function() {


                      $('#modal005').modal('close');
                      const ordenes =new Ordenes()
                      const tabla = document.getElementById('tablaarticulosdospedido');
                          const filas=(document.getElementById("tablaarticulosdospedido").rows.length)-1

                          for (var i = 0; i <= filas; i++) {
                            var row=tabla.rows[i+1]
                             Materialize.toast(row.cells[0].innerHTML, 4000)
                          }
                      
                        Materialize.toast('Pedido guardado con exito', 4000)
                            
                           
                
                                           
                    })
                    .catch(function(error) {
                        Materialize.toast('Se ha producido un error,porfavor reintenta', 4000)
                    });


                              
       }

  
  crearDetalle(folioG,folio,solicitud,noches,adultos,menores,hotel,transportacion,tA,tN,total,tAP,tNP,totalcxp,aerolinea,cambio,provision){
                        this.dbs.collection("aerolinea").where("id", "==",aerolinea)
                                     .get()
                                     .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                                       
                                            if(doc.data().cambio=="USD"){
                                              const ordenes =new Ordenes()
                                                  ordenes.searchcambio(folioG,cambio,provision)
                                             
                                     
                                                      }else{
                                                        const ordenes =new Ordenes()
                                                  ordenes.addprovision(folioG,provision)
                                                      }



                                            });
                                           })
                                        .catch(function(error) {

                                              console.log("Error getting documents: ", error);
                                        });

                        
                        this.dbs.collection('detalle').doc(folio).collection(solicitud).doc(folio).set({
                                                solicitud:solicitud,
                                                noches: noches,
                                                adultos:adultos,
                                                menores:menores,
                                                hotel:hotel,
                                                transportacion:transportacion,
                                                tarifaadulto:tA,
                                                tarifamenor:tN,
                                                total:total,
                                                tarifaadultocxp:tAP,
                                                tarifamenorcxp:tNP,
                                                totalcxp:totalcxp,
                                                cambio:cambio
                                      }).then(refDoc=>{
                                          //console.log('success')
                                          Materialize.toast('Datos agregados con éxito', 4000)
                                          $('.modal-content').css('opacity', '1');
                                          $('#modal1').modal('close');
                                         
                                      }).catch(refDoc=>{
                                        console.log(refDoc)
                                      //  Materialize.toast('Se ha producido un error,porfavor reintenta', 4000)
                                      })
  }


searcharticuloforSold(code){         
                 
    return  this.dbs.collection("articulos").where("codigo", "==",code)
                   .get()
                   .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                            var codigo = document.getElementById("codigoarticulo");
                            var descripcion = document.getElementById("descripcionarticulo");
                            var precio = document.getElementById("precioarticulo");
                            var existencia = document.getElementById("existenciaarticulo");
                            
                            codigo.value =doc.data().codigo
                            descripcion.value =doc.data().descripcion
                            precio.value =doc.data().publico
                            existencia.value =doc.data().existencia


                    Materialize.toast(doc.data().descripcion, 4000)
                                                 
                          });
                         })
                      .catch(function(error) {
                         Materialize.toast("No hay", 4000)
                            console.log("Error getting documents: ", error);
                      });

}
searcharticuloforPedido(code){         
                 
    return  this.dbs.collection("articulos").where("codigo", "==",code)
                   .get()
                   .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                            var codigo = document.getElementById("codigoarticulopedido");
                            var descripcion = document.getElementById("descripcionarticulopedido");
                            var precio = document.getElementById("precioarticulopedido");
                            var existencia = document.getElementById("existenciaarticulopedido");
                            
                            codigo.value =doc.data().codigo
                            descripcion.value =doc.data().descripcion
                            precio.value =doc.data().publico
                            existencia.value =doc.data().existencia


                    Materialize.toast(doc.data().descripcion, 4000)
                                                 
                          });
                         })
                      .catch(function(error) {
                         Materialize.toast("No hay", 4000)
                            console.log("Error getting documents: ", error);
                      });

}

searchcambio(folioG,divisa,provision){                          
    return  this.dbs.collection("cambio").where("nombre", "==",divisa)
                   .get()
                   .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                                                const ordenes =new Ordenes()
                                                 provision=provision*doc.data().cambio
                                               
                                                ordenes.addprovision(folioG,provision)
                          });
                         })
                      .catch(function(error) {

                            console.log("Error getting documents: ", error);
                      });

}



  addprovision(folioG,provision){
    
  this.dbs.collection("ordenesdeservicio").doc(folioG).update({
                                                     provision:provision
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
  //Escribir
  //Leer
  loadOs(){
    
       this.dbs.collection("articulos").get().then(function(querySnapshot) {

              querySnapshot.forEach(function(doc) {
                      if (doc.exists) {
                    var jota= document.getElementById('tablaarticulos');
                          var trd=jota.insertRow(-1)
var cadena =  parseFloat(doc.data().veinte);
var conDecimal = cadena.toFixed(2);
          trd.innerHTML =`<td>`+ doc.data().codigo+`</td>`+`<td>`+ doc.data().descripcion+`</td>`+`<td style=" font-size: 20px;">`+ doc.data().publico+`</td>`+`<td>`+ conDecimal+`</td>`  +`<td><a class='btn  halfway-fab waves-effect waves-light red modal-trigger' href="#modal004" onclick="editararticulo(this);" ><i class='material-icons'>edit</i></a> </td>`+`<td><a class='btn  halfway-fab waves-effect waves-light blue modal-trigger' href="#modal006" onclick="verarticulo(this);" ><i class='material-icons'>remove_red_eye</i></a> </td>`;
         
        var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';

                                              }else{ var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';
                        Materialize.toast('Sin articulos para mostrar', 4000)
                      }
               });
       });

 

  }
  
   loadPedidos(){
    
       this.dbs.collection("pedidos").get().then(function(querySnapshot) {

              querySnapshot.forEach(function(doc) {
                      if (doc.exists) {
                    var jota= document.getElementById('tablapedidos');
                          var trd=jota.insertRow(-1)

          trd.innerHTML =`<td>`+ doc.data().fecha+`</td>`+`<td>`+ doc.data().folio+`</td>`+`<td>`+ doc.data().cliente+`</td>`+`<td>`+ doc.data().usuario+`</td>`+`<td>`+ doc.data().total+`</td>` +`<td><a class='btn  halfway-fab waves-effect waves-light red modal-trigger' href="#modal005" onclick="editararticulo(this);" ><i class='material-icons'>edit</i></a> <a class='btn  halfway-fab waves-effect waves-light blue  ' href="impresion.html" onclick="pasarpedido();" ><i class='material-icons'>edit</i></a> </td>`;
         
        var progresbar = document.getElementById('progre');
                            progresbar.style.display = 'none';

                                              }else{ var progresbar = document.getElementById('progre');
                            progresbar.style.display = 'none';
                        Materialize.toast('Sin articulos para mostrar', 4000)
                      }
               });
       });

  }
  loadtablaPedidos(){
    
     this.dbs.collection("articulos").get().then(function(querySnapshot) {

              querySnapshot.forEach(function(doc) {
                      if (doc.exists) {
                    var jota= document.getElementById('tablaarticulospedido');
                          var trd=jota.insertRow(-1)

          trd.innerHTML =`<td>`+ doc.data().fecha+`</td>`+`<td>`+ doc.data().codigo+`</td>`+`<td>`+ doc.data().descripcion+`</td>`+`<td style=" font-size: 20px;">`+ doc.data().publico+`</td>`+`<td><a class='btn  halfway-fab waves-effect waves-light blue modal-action modal-close '   onclick=" buscaraarticulo(this);" >Seleccionar</a> </td>`;
         
        var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';

                                              }else{ var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';
                        Materialize.toast('Sin articulos para mostrar', 4000)
                      }
               });
       });

  }
   
    loadOsforsearch(){
    
       this.dbs.collection("articulos").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                    var jota= document.getElementById('tablaarticulosdos');
                          var trd=jota.insertRow(-1)

          trd.innerHTML =`<td>`+ doc.data().codigo+`</td>`+`<td>`+ doc.data().descripcion+`</td>`+`<td>`+ doc.data().distribuidor+`</td>`+`<td>`+ doc.data().publico+`</td>`+`<td>`+ doc.data().mayoreo+`</td>`+`<td>`+ doc.data().veinte+`</td>`+`<td>`+ doc.data().treinta+`</td>`+`<td>`+ doc.data().existencia+`</td>`;
         
        var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';

                                              }else{ var progresbar = document.getElementById('progr');
                            progresbar.style.display = 'none';
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
  
     loadClientes(){
    
       this.dbs.collection("clientes").get().then(function(querySnapshot) {

              querySnapshot.forEach(function(doc) {
                      if (doc.exists) {
                    var jota= document.getElementById('tablaclientes');
                          var trd=jota.insertRow(-1)

          trd.innerHTML = `<td>`+ doc.data().uid+`</td>`+`<td>`+ doc.data().nombre+`</td>`+`<td>`+ doc.data().visita+`</td>` +`<td><a class='btn  halfway-fab waves-effect waves-light red modal-trigger' href="#modal24" onclick="editarcliente(this);" ><i class='material-icons'>edit</i></a> </td>`+`<td><a class='btn  halfway-fab waves-effect waves-light blue modal-trigger' href="#modal23" onclick="vercliente(this);" ><i class='material-icons'>remove_red_eye</i></a> </td>`;
         
        var progresbar = document.getElementById('progrs');
                            progresbar.style.display = 'none';

                                              }else{ var progresbar = document.getElementById('progrs');
                            progresbar.style.display = 'none';
                        Materialize.toast('Sin articulos para mostrar', 4000)
                      }
               });
       });

       }
   loadUsers(){
       this.dbs.collection("usuarios").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                            var contenido= document.getElementById('usuarioscontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2  white'  style='padding:25px; border-radius:12px;'><strong>Usuario: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Correo: "+doc.data().correo+ "<br> Tipo: "+doc.data().tipo+"<br> Id: "+doc.data().uid;
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
   loadAero(){
       this.dbs.collection("aerolinea").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                       
                            var contenido= document.getElementById('aerolineascontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 white'  style='padding:25px; border-radius:12px;'><strong>Aerolinea: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Id: "+doc.data().id+ "<br> Estatus: "+doc.data().status;
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
 loadHotel(){
       this.dbs.collection("hotel").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                       
                            var contenido= document.getElementById('hotelescontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 white'  style='padding:25px; border-radius:12px;'><strong>Hotel: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Id: "+doc.data().id+ "<br> Correo: "+doc.data().correo;
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
   loadMotive(){
       this.dbs.collection("motivo").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                       
                            var contenido= document.getElementById('motivoscontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 white'  style='padding:25px; border-radius:12px;'><strong>Aerolinea: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Id: "+doc.data().id+ "";
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
   loadSucursal(){
       this.dbs.collection("sucursal").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {      
                            var contenido= document.getElementById('sucursalescontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 white'  style='padding:25px; border-radius:12px;'><strong>Aerolinea: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Id: "+doc.data().id+ "";
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }
   loadTransp(){
       this.dbs.collection("transportacion").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                      if (doc.data()!=null) {
                       
                            var contenido= document.getElementById('transportacionescontenido');    
                            var inicio="<div class='col s12 m6 l4' style='padding:10px;' ><div class='z-depth-2 white'  style='padding:25px; border-radius:12px;'><strong>Aerolinea: ";
                            var datos="<br></strong>Nombre: "+doc.data().nombre+"<br> Id: "+doc.data().id+ "";
                            var fin="<br><br><div class='col m12 s12 l12'> <div class='col l6 s6'> <a class='btn waves-effect waves-red white black-text' style='border-radius: 6px;'    onclick='delOs(`"+doc.id+"`)'>eliminar</a></div><div class='col l6 s6'><a class='btn waves-effect waves-orange white black-text '  style='border-radius: 6px;' >Editar </a></div></div></div></div>";
                           contenido.insertAdjacentHTML("beforeend",inicio+datos+fin);
                                 
                      }else{
                        Materialize.toast('Sin ordenes de Servicio para mostrar', 4000)
                      }
               });
       });

  }

  loadforeditOs(codigo){   
       
     this.dbs.collection("articulos").where("codigo", "==",codigo)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {

                                                        
                            
                            var codigo = document.getElementById("ecodigo");
                            codigo.value =doc.data().codigo

                            var descripcion = document.getElementById("edescripcion");
                            descripcion.value=doc.data().descripcion

                            var distribuidor = document.getElementById("edistribuidor");
                            distribuidor.value=doc.data().distribuidor

                             var publico = document.getElementById("epublico");
                            publico.value=doc.data().publico

                             var mayoreo = document.getElementById("emayoreo");
                            mayoreo.value=doc.data().mayoreo



                             var existencia = document.getElementById("eexistencia");
                            existencia.value=doc.data().existencia

                             $('#eveinte').empty()  
                            $('#eveinte').append(`${doc.data().veinte}`)

                             $('#etreinta').empty()  
                            $('#etreinta').append(`${doc.data().treinta}`)
                             
                         
                      
                            var progresbar = document.getElementById('eprogresbar');
                            progresbar.style.display = 'none';

                        $('.modal-content').css('opacity', '1');
                        });

                       })
                    .catch(function(error) {
                          console.log("Error getting documents: ", error);
                    }); 
                 

  }
   loadforverOs(codigo){   
       
     this.dbs.collection("articulos").where("codigo", "==",codigo)
                 .get()
                 .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {

                                                        
                            
                        

                            $('#vercodigoarticulo').empty()  
                            $('#vercodigoarticulo').append(`${doc.data().codigo}`)

                            $('#verdescripcionarticulo').empty()  
                            $('#verdescripcionarticulo').append(`${doc.data().descripcion}`)

                            $('#verdistribuidorarticulo').empty()  
                            $('#verdistribuidorarticulo').append(`${doc.data().distribuidor}`)
 
                            $('#verpublicoarticulo').empty()  
                            $('#verpublicoarticulo').append(`${doc.data().publico}`)
 
                            $('#vermayoreoarticulo').empty()  
                            $('#vermayoreoarticulo').append(`${doc.data().mayoreo}`)

                            $('#verexistenciaarticulo').empty()  
                            $('#verexistenciaarticulo').append(`${doc.data().existencia}`)

                            $('#vertreintaarticulo').empty()  
                            $('#vertreintaarticulo').append(`${doc.data().veinte}`)

                            $('#vercuarentaarticulo').empty()  
                            $('#vercuarentaarticulo').append(`${doc.data().treinta}`)
                            
                            $('#verfechaarticulo').empty()  
                            $('#verfechaarticulo').append(`${doc.data().fecha}`)

                             $('#vermodificoarticulo').empty()  
                            $('#vermodificoarticulo').append(`${doc.data().usuario}`)
                              

                        $('.modal-content').css('opacity', '1');
                        });

                       })
                    .catch(function(error) {
                          console.log("Error getting documents: ", error);
                    }); 
                 

  }

  getsucursal(){
    $('#sucursal').append($("<option></option>").attr("value","").text("Selec"));
        this.dbs.collection("sucursal").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {

                if (doc.data()!=null) {

                         $('#sucursal').append($("<option></option>").attr("value",doc.data().id  ).text(doc.data().id));
                             console.log("<option value='foo' >"+doc.data().id+"</option>")
                         $('#sucursal').material_select();
                }

           });
       });
  }

  getaerolinea(){
    $('#aerolinea').append($("<option></option>").attr("value","").text("Selec"));
    this.dbs.collection("aerolinea").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
                if (doc.data()!=null) {
                         $('#aerolinea').append($("<option></option>").attr("value",doc.data().id).text(doc.data().id));
                             console.log("<option value='foo' >"+doc.data().id+"</option>")
                         $('#aerolinea').material_select();
                }

       });
   });
  }

  getcontingencia(){
    $('#contingencia').append($("<option></option>").attr("value","").text("Selec"));
    this.dbs.collection("contingencia").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

                if (doc.data()!=null) {
                         $('#contingencia').append($("<option></option>").attr("value",doc.data().id  ).text(doc.data().id));
                              console.log("<option value='foo' >"+doc.data().id+"</option>")
                         $('#contingencia').material_select();
                }

       });
   });
  }
  gethotel(){
    $('#hotel').append($("<option></option>").attr("value","").text("Selec"));
    this.dbs.collection("hotel").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

                if (doc.data()!=null) {
                         $('#hotel').append($("<option></option>").attr("value",doc.data().nombre).text(doc.data().nombre));
                             console.log("<option value='foo' >"+doc.data().id+"</option>")
                         $('#hotel').material_select();
                }

        });
   });
  }

  gettransportacion(){         
    $('#transportacion').append($("<option></option>").attr("value","").text("Selec"));
    this.dbs.collection("transportacion").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
              
                if (doc.data()!=null) { 
                         $('#transportacion').append($("<option></option>").attr("value",doc.data().nombre).text(doc.data().nombre));
                              console.log("<option value='foo' >"+doc.data().id+"</option>")
                         $('#transportacion').material_select();
                }

       });
   });
  }
  getstatus(aerolinea){
    this.dbs.collection("aerolinea").where("id", "==",aerolinea)
      .get()
      .then(function(querySnapshot) {querySnapshot.forEach(function(doc) {
                 if (doc.data()!=null) {
                              var status= document.getElementById('status');  

                              if (doc.data().status==true) {
                                 status.style.background = 'green';
                                 status.innerHTML="<p>Aprobado</p>"; 
                              }else{
                                 status.style.background = 'red';
                                 status.innerHTML="<p>Denegado</p>"; 
                              }

                    }
            });
       })
      .catch(function(error) {
            console.log("Error getting documents: ", error);
       });
  }
  
//Leer
//Editar
editarOs(fecha,codigo,descripcion,distribuidor,publico,mayoreo,veinte,treinta,existencia){
                              var usr = firebase.auth().currentUser;
                              var usuario=usr.email
          return this.dbs.collection("articulos").doc(codigo).update({
                              fecha:fecha,
                              codigo:codigo,
                              descripcion: descripcion,
                              distribuidor: distribuidor,
                              publico: publico,
                              mayoreo: mayoreo,
                              veinte: veinte,
                              treinta:treinta,
                              existencia: existencia,
                              usuario: usuario
               
          })
          .then(function() {
              
              $('#modal004').modal('close');
              Materialize.toast('Datos  actualizados con éxito', 4000)
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });

  }
//Editar
//Eliminar
  eliminarOs(id){
     this.dbs.collection("ordenesdeservicio").doc(id).delete().then(function() {
                 Materialize.toast('Datos eliminados correctamente', 4000)
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
     this.dbs.collection("detalle").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

  }

//Eliminar
//View
  adddetalle(solicitud,noches,adultos,menores,hotel,transportacion){
          $('#tabla').css('opacity', '1');
          $('#pasajeros').css('opacity', '1');

          var tr=tabla.insertRow(-1)
          tr.innerHTML =`<td>`+ solicitud+`</td><td>`+noches+`</td><td>`+adultos +`</td><td>`+menores +`</td><td>`+hotel +`</td><td>`+transportacion+`</td> <td><a onclick="deldetalle(`+solicitud+`);" class="waves-effect red btn " >
          <i class="material-icons ">remove</i></a></td>`
          tr.id=solicitud


          this.a[solicitud]=[solicitud,noches,adultos,menores,hotel,transportacion]

          const filas=(document.getElementById("tabla").rows.length)-1
          var solicitud= document.getElementById("solicitud");
          solicitud.value=filas

          $('#dadultos').empty();
          $('#dmenores').empty();
          $('#dtotal').empty();

          var adu=0;
          var men=0;
          this.a.forEach(function(elemento, indice) {
        //  console.log("pos=", indice, "valor=", elemento[2]);
          adu=adu+parseInt(elemento[2]);
          men=men+parseInt(elemento[3]);
          });
          $('#dadultos').append(`${adu}`)
          $('#dmenores').append(`${men}`)
          $('#dtotal').append(`${adu+men}`)
          console.log(this.a)
          if ($('#paxrestantes').text()==adu+men) {
               var ok= document.getElementById('tt'); 
               ok.style.background = '#d8d8d8';
               ok.style.color = 'white';
              } 
  }
  deldetalle(index){     
          //console.log(this.a)
          $("#" + index).remove();
          // this.a.splice(index)
          // console.log(this.a)

  }
  refilldetalle(){
          this.a.forEach(function(elemento, indice) {
           // console.log("pos=", indice, "valor=", elemento[2]);
            adu=adu+parseInt(elemento[2]);
            men=men+parseInt(elemento[3]);

            });
  }

//View
}


/*function Ordenes(nombre, edad){ 
   	this.nombre = nombre 
   	this.edad = edad 
   	this.numMatricula = null 
}*/

/*function loadordenes(){ 
	db.collection("ordenesdeservicio").doc("#TASCUN25-04-2019")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });

    
}*/
