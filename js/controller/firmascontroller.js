$(document).ready(function () {  
	 db.collection("firma").onSnapshot(function(doc) {
		            checkfirma()
		      });
 
 checkfirma()
  
  });	

function limpiar(){
	initialize()
}
function guardarfirma(){
	const ordenes = new Ordenes();
                    ordenes.getidandsavefirma() 
}

function checkfirma(){
	const ordenes = new Ordenes();
    ordenes.checkfirma()  
}