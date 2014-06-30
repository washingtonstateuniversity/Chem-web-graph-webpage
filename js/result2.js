$.getJSON('return.json', function(data) {
    /*optional stuff to do after success */

var bardata=data.result2;
  console.log(bardata);

var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 280 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0,width],0.5)
  .domain(bardata.map(function(d){return d.x}));

var y = d3.scale.linear()
  .range([height, 0])
  .domain([0, d3.max(bardata, function(d){ return d.y})]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(5)
    .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

// create bar field
var svg = d3.select("#box2").append("svg")
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
    .attr('x', function(d){ return x(d.x);}) // x position of the bar
    .attr('y', function(d){ return y(d.y);})
    .attr('width', x.rangeBand()) // width of the bar
    .attr('height', function(d){return height-y(d.y)})
    .attr('fill', 'grey')
    .on('mouseover', function(d){d3.select(this).attr('fill', 'blue');})
    .on('mouseout', function(d){d3.select(this).attr('fill', 'grey')});

});// end of getjson
