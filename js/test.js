jQuery(document).ready(function() {
	
	
	$('#myshowhide').on("click",function(){
		$('#graphbox').toggle("slow");
	}); //end of my show/hide

	// first disable the graph editor and then send data to server
	$('#mysend').on("click",function(){
		$('#graphbox').block({message: '<h3>submitting</h3>'});
		$.getJSON('content/return.json?callback=?', {} , function(data){
			alert(data);
			$('#graphbox').unblock();
		});
	});//end of mysend 

	$('#myreflesh').on("click",function(){
	});//end of myreflesh
});