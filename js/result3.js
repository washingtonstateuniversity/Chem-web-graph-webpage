jQuery(document).ready(function() {

$.getJSON('content/return.json', function(data) {
	/*optional stuff to do after success */

	$.each(data.nodes, function(i,ss){
		var div_data = "<tr><td>"+ss.id+"</td><td>"+ss.size+"</td></tr>";
		$(div_data).appendTo('#table3');
	});


// set up SVG for D3
	var width  = 500,
		height = 400,
		colors = d3.scale.category10();

	var svg = d3.select('#box3')
	  .append('svg')
	  .attr('width', width)
	  .attr('height', height);

	// set up initial nodes and links
	//  - nodes are known by 'id', not by index in array.
	//  - links are always source < target; edge directions are set by 'left' and 'right'.


	var nodes = data.nodes;
	var links = data.links;
	  //undirected graph

	// init D3 force layout
	var force = d3.layout.force()
		.nodes(nodes)
		.links(links)
		.size([width, height])
		.linkDistance(100)
		.charge(-500)
		.on('tick', tick)


	// handles to link and node element groups
	var path = svg.append('svg:g').selectAll('path'),
		circle = svg.append('svg:g').selectAll('g');

	  // path (link) group
	  path = path.data(links);

	  // add new links
	  path.enter().append('svg:path')
		.attr('class', 'link')


	  // circle (node) group
	  // NB: the function arg is crucial here! nodes are known by id, not by index!
	  circle = circle.data(nodes, function(d) { return d.id; });


	  // update existing nodes (reflexive & selected visual states)
	  circle.selectAll('circle')
		.style('fill', function(d) { return colors(d.id); })

	  // add new nodes
	  var g = circle.enter().append('svg:g');

	  g.append('svg:circle')
		.attr('class', 'node')
		.attr('r', function(d){return d.size;})
		.style('fill', function(d) { return colors(d.id); })
		.style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
		
	  // show node IDs
	  g.append('svg:text')
		  .attr('x', 0)
		  .attr('y', 4)
		  .attr('class', 'id')
		  .text(function(d) { return d.id; });

	  // set the graph in motion
	  force.start();


	// update force layout (called automatically each iteration)
	function tick() {
	  // draw directed edges with proper padding from node centers
	  path.attr('d', function(d) {
		var deltaX = d.target.x - d.source.x,
			deltaY = d.target.y - d.source.y,
			dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
			normX = deltaX / dist,
			normY = deltaY / dist,
			sourcePadding = 12,
			targetPadding = 12,
			sourceX = d.source.x + (sourcePadding * normX),
			sourceY = d.source.y + (sourcePadding * normY),
			targetX = d.target.x - (targetPadding * normX),
			targetY = d.target.y - (targetPadding * normY);
		return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
	  });

	  circle.attr('transform', function(d) {
		return 'translate(' + d.x + ',' + d.y + ')';
	  });
	}


}); // end of get json

}); // end of document ready