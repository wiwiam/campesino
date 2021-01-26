$(document).ready(function(){
  const contable = new Contable()	
//Load OS
 db.collection("ordenesdeservicio").onSnapshot(function(doc) {
		  contenido= document.getElementById('ordenescontenido');    
		  contenido.innerHTML="";
		  contable.loadOs()
		      });

  db.collection("ordenesdeservicio").onSnapshot(function(doc) {
		  contenido= document.getElementById('ordenescontenidocxp');    
		  contenido.innerHTML="";
		  contable.loadOscxp()
		      });

});
function loadOsView(id){
   			const contable = new Contable();
            contable.loadOsView(id);
}
function loadOsViewcxp(id){
   			const contable = new Contable();
            contable.loadOsViewcxp(id);
}