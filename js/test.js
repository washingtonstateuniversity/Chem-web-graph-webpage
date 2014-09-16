function get_results_1(callback){
	console.log("setting up the graph with new values");
	
	$.getJSON('content/return.json', function(data) {
		/*optional stuff to do after success */

		//var div_data = "<table><tr><td>degree</td><td>percent</td></tr>";
		//$(div_data).appendTo('#table1');
		$.each(data.result1, function(i,ss){
			var div_data = "<tr><td>"+ss.degree+"</td><td>"+ss.percent+"</td></tr>";
			$(div_data).appendTo('#table1');
		});
		//div_data = "</table>";
		//$(div_data).appendTo('#table1');


		var bardata=data.result1;
		  //console.log(bardata);

		var margin = {top: 40, right: 40, bottom: 40, left: 40},
			width = 380 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
		  .rangeRoundBands([0,width],0.5)
		  .domain(bardata.map(function(d){return d.degree}));

		var y = d3.scale.linear()
		  .range([height, 0])
		  .domain([0, d3.max(bardata, function(d){ return d.percent})]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.tickSize(5)
			.orient("bottom");

		var yAxis = d3.svg.axis()
		  .scale(y)
		  .orient("left");

		// create bar field
		var svg = d3.select("#box1").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		//create x and y axis
		svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis)

		svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis);
		//create bar data
		svg.selectAll('rect')
			.data(bardata)
			.enter()
			.append('rect')
			.attr('x', function(d){ return x(d.degree);}) // x position of the bar
			.attr('y', function(d){ return y(d.percent);})
			.attr('width', x.rangeBand()) // width of the bar
			.attr('height', function(d){return height-y(d.percent)})
			.attr('fill', 'grey')
			.on('mouseover', function(d){d3.select(this).attr('fill', 'blue');})
			.on('mouseout', function(d){d3.select(this).attr('fill', 'grey')});
		callback();
	});// end of getjson
	
	
}



jQuery(document).ready(function() {
	
	$('#output').hide();

	$('#myshowhide').on("click",function(){
		$('#graphbox').slideToggle("slow");
	}); //end of my show/hide


	$('#mysend').on("click",function(e){
		e.preventDefault();//note you should always take controll of the event bubble.  
		

		//this is how you use a callback, in this cause "get results" button on click event
		//in order to get real results you would be posting to the server.  I'll example that 
		//below.  In this case first this shows that we are going to get what you had in results1.js
		// as a function ahead of this, so it's able to be accessed.  We then provide a way to run a function
		// after it getis it's results and it's done rendering.  That call back is an anonymous function that runs
		// the show function for $('#output')
		get_results_1(
			function(){
				$('#output').show();
			}
		);
		
		// now what you will will most likely use is something like this
		
		/*
		
// not this it what is 
//		var formData = $( "form[name='main_form']" ).serialize();
//		$('#graphbox').block({message: '<h3>submitting</h3>'});
//		$.getJSON('content/procressor.php', formData , function(data){
//			get_results_1(function(){ // you would remove the $.getJSON() from this function
//				$('#output').show();
//			});
//		});
		//so what we can see here is that we are getting all the data (in this case from a form) 
		//and then passing it to the server.  The server would then take the array of data you passed over
		// under $_GET[] or $_REQUEST[] and then do the processing for that data you just passed over
		// under your php function.. could be something like 
		//
		// <?php
		// $return = graph($_GET['form_data']);
		// $return = json_encode($return);
		// header('Content-Type: application/json');
		// echo json_encode($data);
		// exit();
		//
		// which assumes that your custom function is graph, and that it will take a array/object, and after processing 
		// that it'll return an array or object back.  As we discussed before we can simulate this by setting up a return 
		// file that has the final data that is needed to get the graph to display.  
		
		
		
		*/
		
		
		
		
		
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



	

});