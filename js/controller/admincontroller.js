$(document).ready(function(){
  const ordenes = new Ordenes()	
//Load OS
 db.collection("articulos").onSnapshot(function(doc) {
 
$('#tablaarticulos tr:not(:first-child)').remove();

ordenes.loadOs()
 


		  
		      });

 db.collection("pedidos").onSnapshot(function(doc) {
 
$('#tablapedidos tr:not(:first-child)').remove();

 
ordenes.loadPedidos()


		  
		      });
  db.collection("articulos").onSnapshot(function(doc) {
 
$('#tablaarticulospedido tr:not(:first-child)').remove();

 
ordenes.loadtablaPedidos()


		  
		      });

//Load OS


$(document).on('click', '#eliminar', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
    sumar()
});

 $(document).on('click', '#eliminarpedido', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
    sumarpedido()
});

 

$('#tabla').css('opacity', '.5');
$('#pasajeros').css('opacity', '.5');

$("#adddetalle").click(function() {
            const solicitud=$('#solicitud').val()
            const noches=$('#noches').val()
			const adultos=$('#adulto').val()
			const menores=$('#menor').val()
			const hotel=$('#hotel').val()
			const transportacion=$('#transportacion').val()

		        if(noches <1||  adultos < 1 || menores==""|| hotel=="Selec" || transportacion=="Selec"){
		                 Materialize.toast('Porfavor revisa los campos', 4000)
		        }else{
	        	             const adulto=$('#adultos').val()
	        	             if(adulto!=0) {
					                      const tad= parseInt($('#adultos').val())
					                      const tni=parseInt($('#ninos').val())
					                      const dtad=parseInt($('#dadultos').text())
					                      const dtni=parseInt($('#dmenores').text())
					                      const totalacumuladoadulto=parseInt(adultos)+dtad
					                      const totalacumuladonino=parseInt(menores)+dtni

						                      if(tad<totalacumuladoadulto || tni<totalacumuladonino) {
												      Materialize.toast('La cantidad de pax es mayor a la de la OS', 4000)
						                             }else{
												                      	if ((tad-totalacumuladoadulto)>=0 || (tad-totalacumuladonino)>=0) {
								                                         ordenes.adddetalle(solicitud,noches,adultos,menores,hotel,transportacion);
											                                   }else{
											                                   	Materialize.toast('La cantidad de pax es mayor a la de la OS', 4000)
											                                   }
						                                   } 

								        	}else{
								        		Materialize.toast('Favor de agregar pax a la Orden se Servicio', 4000)
								        	}
	            }
       
       });




$("#aerolinea").on("change", function() {
        ordenes.getstatus($(this).val());
        console.log($(this).val())
       });

$("#btnbuscararticulo").click(function(){
	     const codigo=$('#buscararticulo').val()
           
	     const ordenes = new Ordenes()	
	       ordenes.searcharticuloforSold(codigo);
		});

$("#btnbuscararticulopedido").click(function(){
	     const codigo=$('#buscararticulopedido').val()
           
	     const ordenes = new Ordenes()	
	       ordenes.searcharticuloforPedido(codigo);
		});


       $(".botons").click(function(){

 var valores = $(this).parents("tr").find("td")[1].innerHTML;
        console.log(valores);

		});


    $("#cantidadarticulo").change(function(){
             $('#totalarticulo').empty()
              
            
             var cantidads = document.getElementById("cantidadarticulo").value;
             var precios = document.getElementById("precioarticulo").value;
            
          
            var totals=parseInt(cantidads)*parseInt(precios);
           

             $('#totalarticulo').append(`${totals}`)
             
            

}); 


    $("#cantidadarticulopedido").change(function(){
             $('#totalarticulopedido').empty()
              
            
             var cantidads = document.getElementById("cantidadarticulopedido").value;
             var precios = document.getElementById("precioarticulopedido").value;
            
          
            var totals=parseInt(cantidads)*parseInt(precios);
           

             $('#totalarticulopedido').append(`${totals}`)
             
            

}); 
 $("#distribuidor").change(function(){
             $('#veinte').empty()
             $('#treinta').empty()
              
            
             var distribuidor = document.getElementById("distribuidor").value;

           
            
          
            var totalveinte=(parseFloat(distribuidor)*.30)+parseFloat(distribuidor);
            var totaltreinta=(parseFloat(distribuidor)*.40)+parseFloat(distribuidor);
           

             $('#veinte').append(`${totalveinte}`)
             $('#treinta').append(`${totaltreinta}`)
             
            

}); 
 $("#edistribuidor").change(function(){
             $('#eveinte').empty()
             $('#etreinta').empty()
              
            
             var distribuidor = document.getElementById("edistribuidor").value;

           
            
          
            var totalveinte=(parseFloat(distribuidor)*.30)+parseFloat(distribuidor);
            var totaltreinta=(parseFloat(distribuidor)*.40)+parseFloat(distribuidor);
           

             $('#eveinte').append(`${totalveinte}`)
             $('#etreinta').append(`${totaltreinta}`)
             
            

}); 

$("#btnaddordendeservicio").click(function(){
	        var progresbar = document.getElementById('progresbar');
	        progresbar.style.display = 'block';
	        
    
			const ordenes = new Ordenes()		

		    const fecha=$('#fecha').val()
			const codigo=$('#codigo').val()
			const descripcion=$('#descripcion').val()
			const distribuidor=$('#distribuidor').val()
			const publico=$('#publico').val()
			const mayoreo=$('#mayoreo').val()
			const veinte=document.getElementById("veinte").innerHTML;
			const treinta=document.getElementById("treinta").innerHTML;
			const existencia=$('#existencia').val()
		  
        
			if (fecha=="" ||  codigo=="" || descripcion==""|| distribuidor=="" || publico=="" || mayoreo=="" || veinte ==""|| treinta ==""|| existencia =="" ) {

				$('.modal-content').css('opacity', '1');
				Materialize.toast('Porfavor revisa los campos', 4000)
				progresbar.style.display = 'none';

			}else{
				  
	  ordenes.crearOs(fecha,codigo,descripcion,distribuidor,publico,mayoreo,veinte,treinta,existencia);
	   
				 
			    progresbar.style.display = 'none';

			}
		});

$("#btnaddpedido").click(function(){
	        var progresbar = document.getElementById('progresbar');
	        progresbar.style.display = 'block';
	        
    
			const ordenes = new Ordenes()		

		    const fecha=$('#fechaActualpedido').val()
		    const folio=$('#folioarticulopedido').val()
		    const nombre=$('#nombrearticuloclientepedido').val()
		    const total=document.getElementById("totalventapedido").innerHTML;
		 
		  
        
			if (fecha=="" ||  folio=="" || nombre=="" ) {

				$('.modal-content').css('opacity', '1');
				Materialize.toast('Porfavor revisa los campos', 4000)
				progresbar.style.display = 'none';

			}else{
				  
	  ordenes.crearPedido(fecha,folio,nombre,total);
	   
				 
			    progresbar.style.display = 'none';

			}
		});
$("#btneditordendeservicio").click(function(){			   

	       var progresbar = document.getElementById('progresbar');
	        progresbar.style.display = 'block';
             

            const ordenes = new Ordenes()		

		    const efecha=$('#efecha').val()
			const ecodigo=$('#ecodigo').val()
			const edescripcion=$('#edescripcion').val()
			const edistribuidor=$('#edistribuidor').val()
			const epublico=$('#epublico').val()
			const emayoreo=$('#emayoreo').val()
			const eveinte=document.getElementById("eveinte").innerHTML;
			const etreinta=document.getElementById("etreinta").innerHTML;
			const eexistencia=$('#eexistencia').val()
		  

		 if (efecha=="" ||  ecodigo=="" || edescripcion==""|| edistribuidor=="" || epublico=="" || emayoreo=="" || eveinte ==""|| etreinta ==""|| eexistencia =="" ) {

				$('.modal-content').css('opacity', '1');
				Materialize.toast('Porfavor revisa los campos', 4000)
				progresbar.style.display = 'none';

			}else{
				  
	  ordenes.editarOs(efecha,ecodigo,edescripcion,edistribuidor,epublico,emayoreo,eveinte,etreinta,eexistencia);
	   
				
			    progresbar.style.display = 'none';

			}


		});

});
 function loadforeditOs(id){
	 	const ordenes = new Ordenes()
     	ordenes.loadforeditOs(id)
	

 }
  function searcharticuloforPedido(id){
	 	const ordenes = new Ordenes()
     	ordenes.searcharticuloforPedido(id)
	

 }
  function loadforverOs(id){
	 	const ordenes = new Ordenes()
     	ordenes.loadforverOs(id)
	

 }

 function delOs(id){
 	var mensaje = confirm("Desea eliminar la Orden de servicio de forma permanente?");
	//Detectamos si el usuario acepto el mensaje
	if (mensaje) {
	 	const ordenes = new Ordenes()
     	ordenes.eliminarOs(id)
	}
 }
 

 function deldetalle(index){
       const ordenes = new Ordenes()
       ordenes.deldetalle(index)	
 }
 function init(){
 	//obtiene datos de OS sucursal,aerolinea,contingencia
 	 $("#transportacion").empty();
 	 $("#sucursal").empty();
 	 $("#aerolinea").empty();
 	 $("#contingencia").empty();
 	 $("#hotel").empty();  
 	 $('#transportacion').material_select();
 	const ordenes = new Ordenes()	
 	ordenes.getsucursal()
 	ordenes.getaerolinea()
 	ordenes.getcontingencia()
 	ordenes.gethotel()
 	ordenes.gettransportacion()
 	//obtiene datos de OS sucursal,aerolinea,contingencia
    //Genera Folio a Orden de servicio
 	var foli= document.getElementById("folio");
	fol=Math.floor( Math.random()*(9999999-1))
	foli.value=fol
	//Genera Folio a Orden de servicio
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
	  if(dia<10)
	    dia='0'+dia; //agrega cero si el menor de 10
	  if(mes<10)
	    mes='0'+mes //agrega cero si el menor de 10
    //Genera Folio a Orden de servicio
    const filas=(document.getElementById("tabla").rows.length)-1
    
    var solicitud= document.getElementById("solicitud");
    solicitud.value=filas
    //Genera Fecha a Orden de servicio

    document.getElementById('fecha').value=ano+"-"+mes+"-"+dia;
    //Genera Fecha a Orden de servicio 
 }




