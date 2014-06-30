function reset_up_graph(){
	
	console.log("setting up the graph with new values");
	
}






jQuery(document).ready(function() {
	
	
	$('#myshowhide').on("click",function(){
		$('#graphbox').toggle("slow");
	}); //end of my show/hide

	// first disable the graph editor and then send data to server
	$('#mysend').on("click",function(){
		$('#graphbox').block({message: '<h3>submitting</h3>'});
		$.getJSON('content/return.json', {} , function(data){
			reset_up_graph();
			$('#graphbox').unblock();
		});
	});//end of mysend 

	$("[name='main_form'] input").on("change",function(e){
		e.preventDefault();
		var formData = $( "form[name='main_form']" ).serialize();
		$('#graphbox').block({message: '<h3>submitting</h3>'});
		$.getJSON('content/return.json', formData , function(data){
			reset_up_graph();
			$('#graphbox').unblock();
		});
	});
	
	
	
	
	
	
	$('#myreflesh').on("click",function(){
	});//end of myreflesh
});