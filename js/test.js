//function reset_up_graph(){
	
//	console.log("setting up the graph with new values");
	
//}



jQuery(document).ready(function() {
	
	$('#output').hide();

	$('#myshowhide').on("click",function(){
		$('#graphbox').slideToggle("slow");
	}); //end of my show/hide


	$('#mysend').on("click",function(){
//		$('#graphbox').block({message: '<p>see the results:</p>'});
		$('#output').show();
	});//end of mysend 

	$('#mymodify').on("click",function(){
//		$('#graphbox').unblock();
		$('#output').hide();
	});

	$('#showresult').click(function(){
		$('#output').show();
	});

	$('#triggle1').click(function() {
		/* Act on the event */
		$('#first').slideToggle("slow");
	});
	$('#triggle2').click(function() {
		/* Act on the event */
		$('#second').slideToggle("slow");
	});

//	$("[name='main_form'] input").on("change",function(e){
//		e.preventDefault();
//		var formData = $( "form[name='main_form']" ).serialize();
//		$('#graphbox').block({message: '<h3>submitting</h3>'});
//		$.getJSON('content/return.json', formData , function(data){
//			reset_up_graph();
//			$('#graphbox').unblock();
//		});
//	});
	

	

});