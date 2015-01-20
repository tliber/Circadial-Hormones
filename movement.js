
// var data = require('data.js')
require(['../node_modules/d/lazy.js'], function(d) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
// var Data = {};
// Data.Test = {'2h' : 20, '6h' : 22, '10h' : 20, '14h': 18, '18h' : 13, '22h' : 16 };
// Data.Test.units = "mnol/l"
// Data.Cort = {'2h' : 3, '6h' : 9, '10h' : 16, '14h': 8, '18h' : 9, '22h' : 3 };
// Data.Cort.units = "mg/dl"
// Data.Temp = {'2h' : 36, '6h' : 36.5, '10h' : 36.75, '14h': 37, '18h' : 37.1, '22h' : 37.25 }; 

//Define Testosterone Data
var Data = {};
Data.Test = {'2h' : 20, '6h' : 22, '10h' : 20, '14h': 18, '18h' : 13, '22h' : 16 };
Data.Test.units = "mnol/l"
Data.Test.max = 22;
Data.Test.diff = 9;

Data.Test.Y =  function(key){
 	console.log('Got Test')
 	return ((Data.Test.max - Data.Test[key])/Data.Test.diff) * screenSizeHeigth
}
Data.Cort = {'2h' : 3, '6h' : 9, '10h' : 16, '14h': 8, '18h' : 9, '22h' : 3 };
Data.Cort.units = "mg/dl"
Data.Cort.max = 16;
Data.Cort.diff = 13;
//
Data.Cort.Y =  function(key){
	// console.log('GOT cort')
	 return ((Data.Cort.max - Data.Cort[key])/Data.Cort.diff) * screenSizeHeigth

}
Data.Temp = {'2h' : 36, '6h' : 36.5, '10h' : 36.75, '14h': 37, '18h' : 37.1, '22h' : 37.25 }; 
Data.Temp.diff = 1.25;
Data.Temp.max = 37.25
Data.Temp.Y = function(key){
	return ((Data.Temp.max - Data.Temp[key])/Data.Temp.diff) * screenSizeHeigth

}
Data.Mel = {'2h' : 110, '6h' : 210, '10h' : 40, '14h': 10, '18h' : 0, '22h' : 0 }; 
Data.Mel.diff = 210;
Data.Mel.max = 210;
Data.Mel.Y = function(key){
	return ((Data.Mel.max - Data.Mel[key])/Data.Mel.diff) * screenSizeHeigth

}
Data.Hgh = {'2h' : 20, '6h' : 0, '10h' : 0, '14h': 0, '18h' : 4, '22h' : 0 }; 
Data.Hgh.diff = 20;
Data.Hgh.max = 20;
Data.Hgh.Y = function(key){
	return ((Data.Hgh.max - Data.Hgh[key])/Data.Hgh.diff) * screenSizeHeigth

}
var width = 100;
var screenSizeLength = 1000;
var screenSizeHeigth = 500;
var jsonCircles = [
   { "x_axis": 150, "y_axis": 250, "radius": 30, "color" : "orange",'id': 'Test', 'hormone' : Data.Test, 'innerText' : 'Ts'},
   { "x_axis": 300, "y_axis": 250, "radius": 30, "color" : "purple", 'id':'Cort', 'hormone' : Data.Cort, 'innerText': 'Co' },
   { "x_axis": 450, "y_axis": 250, "radius": 30, "color" : "red",'id' : 'Temp', 'hormone' : Data.Temp, "innerText" : 'Tm'},
   { "x_axis": 600, "y_axis": 250, "radius": 30, "color" : "grey",'id' : 'Mel', 'hormone' : Data.Mel, "innerText" : 'Ml', 'extraDet' : 'plasma serotonin',"units":'pmol/L'},
   { "x_axis": 750, "y_axis": 250, "radius": 30, "color" : "magenta",'id' : 'GHG', 'hormone' : Data.Hgh, "innerText" : 'Hgh', 'units':'ng ml^-1' }]
   // { "x_axis": 450, "y_axis": 250, "radius": 50, "color" : "red",'id' : 'Temp', 'hormone' : Data.Temp, "innerText" : 'Tm' }




var svg = d3.select("body").append("svg")
  .attr({"width" : screenSizeLength,
  "height" : screenSizeHeigth})
  .style({
  'padding' : '25px',
  'border-size': 15 + 'px',
  "border-color" :'black',
  "border-style" : "solid"
  });

//making the axis
var axisScale = d3.scale.linear()
    .domain([100,0])
    .range([0,500]);

var yAxis = d3.svg.axis()
  .scale(axisScale)
  .orient('left').ticks(10)
AxisGroup = svg.append("g").call(yAxis);
// typeof(xAxis, 'wefewf');



var circles = svg.selectAll("circle")
  .data(jsonCircles)
  .enter()
  .append('g')
  .append("circle")

var circleAttributes = circles
   .attr("cx", function (d) { return d.x_axis; })
   .attr("cy", function (d) { return d.y_axis; })
   .attr("r", function (d) { return d.radius; })
   .attr("id", function(d) { return d.id; })
   .attr('type',"els")
   .attr('stroke', "#2F3550")
   .attr("stroke-width", 2.4192)
   .style("fill", function(d) { return d.color; });


var text = svg.append("g")
    .attr("class", "labels")
  .selectAll("text")
    .data(jsonCircles)
  .enter().append("text")
    .attr("dx", function(d){ return d['x_axis']})
    .attr("dy", ".35em")
    .text(function(d) { return d['innerText'] + '\n'
     })
    .attr({
      "alignment-baseline": "middle",
      "text-anchor": "middle"
    })
// svg.selectAll('text')
	// .data(jsonCircles)
	// .enter()
	.append('text')

// var label = circles.append("text")
// .text(function(d){
//   return d;
// })
// .attr({
//   "alignment-baseline": "middle",
//   "text-anchor": "middle"
// })
   
   // .style("fill", function(d) { return d.color; });

var changeTime = function(timeOfDay){
	d3.selectAll('circle')
  .data(jsonCircles)
  .transition(100)
  .duration(100)
  .attr("cy", function(d){ 
  	console.log('time of day', d['hormone'])
  	return d['hormone'].Y(timeOfDay)})

};

$("#timesOfDay").on('change',(function () {
    console.log($(this).val())
   	changeTime($(this).val()) 
  }))
$('.runDay').on('click', function(){
	changeTime('2h')
	changeTime('6h')
	changeTime('10h')
	changeTime('14h')
	changeTime('18h')
	changeTime('22h')

})