
// var data = require('data.js')
// require(['../node_modules/d/lazy.js'], function(d) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
// });
// var Data = {};
// Data.Test = {'2h' : 20, '6h' : 22, '10h' : 20, '14h': 18, '18h' : 13, '22h' : 16 };
// Data.Test.units = "mnol/l"
// Data.Cort = {'2h' : 3, '6h' : 9, '10h' : 16, '14h': 8, '18h' : 9, '22h' : 3 };
// Data.Cort.units = "mg/dl"
// Data.Temp = {'2h' : 36, '6h' : 36.5, '10h' : 36.75, '14h': 37, '18h' : 37.1, '22h' : 37.25 }; 

//Define Testosterone Data
var Data = {};
Data.Test = {'2h' : 20, '6h' : 22, '10h' : 20, '14h': 18, '18h' : 13, '22h' : 16 };
Data.Test.name = "Testosterone \n"
Data.Test.units = "mnol/l"
Data.Test.max = 22;
Data.Test.diff = 9;

Data.Test.Y =  function(key){
 	console.log('Got Test')
 	return ((Data.Test.max - Data.Test[key])/Data.Test.diff) * screenSizeHeigth
}
Data.Cort = {'2h' : 3, '6h' : 9, '10h' : 16, '14h': 8, '18h' : 9, '22h' : 3 };
Data.Cort.units = "mg/dl"
Data.Cort.name = "Cortisol "
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
Data.Temp.name = "Body Temperature "
Data.Temp.Y = function(key){
	return ((Data.Temp.max - Data.Temp[key])/Data.Temp.diff) * screenSizeHeigth

}
Data.Mel = {'2h' : 110, '6h' : 210, '10h' : 40, '14h': 10, '18h' : 0, '22h' : 0 }; 
Data.Mel.diff = 210;
Data.Mel.max = 210;
Data.Mel.name = 'Melatonin '
Data.Mel.Y = function(key){
	return ((Data.Mel.max - Data.Mel[key])/Data.Mel.diff) * screenSizeHeigth

}
Data.Hgh = {'2h' : 20, '6h' : 0, '10h' : 0, '14h': 0, '18h' : 4, '22h' : 0 }; 
Data.Hgh.diff = 20;
Data.Hgh.max = 20;
Data.Hgh.name ="Growth Hormone "
Data.Hgh.Y = function(key){
	return ((Data.Hgh.max - Data.Hgh[key])/Data.Hgh.diff) * screenSizeHeigth

}
var transitionTime = 2000;
var width = 100;
var screenSizeLength = 1400;
var screenSizeHeigth = 500;
var jsonCircles = [
   { "x_axis": 150, "y_axis": 111.111, "width": 100,'height':888.888, "color" : "orange",'id': 'Test', 'hormone' : Data.Test, 'innerText' : 'Ts','units':" mnol/l",'currentVal': 0},
   { "x_axis": 350, "y_axis": 500, "width": 100,'height':500, "color" : "purple", 'id':'Cort', 'hormone' : Data.Cort, 'units': " mg/dl", 'innerText': 'Co','currentVal': 0 },
   { "x_axis": 550, "y_axis": 500, "width": 100,'height':500, "color" : "red",'id' : 'Temp', 'hormone' : Data.Temp,'units':' C', "innerText" : 'Tm','currentVal': 0},
   { "x_axis": 750, "y_axis": 238.1, "width": 100,'height':762, "color" : "grey",'id' : 'Mel', 'hormone' : Data.Mel, "innerText" : 'Ml', 'extraDet' : 'plasma serotonin',"units":' pmol/L','currentVal': 0},
   { "x_axis": 970, "y_axis": 0, "width": 100,'height':1000, "color" : "magenta",'id' : 'GHG', 'hormone' : Data.Hgh, "innerText" : 'Hgh', 'units':' ng ml^-1' ,'currentVal': 0}]
   // { "x_axis": 450, "y_axis": 250, "radius": 50, "color" : "red",'id' : 'Temp', 'hormone' : Data.Temp, "innerText" : 'Tm' }

var addZero = function(i) {
    if (i < 10) {
        i = "0" + i;
    	
    }
    return i;
}

var makeClock = function(h,m) {
    
    var d = new Date();
    var x = $("#clock");
    d.setHours(h);
    // m = addZero(m);
    // console.log(m, 'segs')
    h = d.getHours()
    m = d.setMinutes(m)
    if (h < 12){
    	var halfDay= 'AM'
    }else
    {
    	h = h - 12;
    	var halfDay = 'PM'
    }
    x.html(h +':' + '00' + ' ' + halfDay)
    console.log(x)
	var clock = x;
}
makeClock(2,00)


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
  .orient('right').ticks(10)
AxisGroup = svg.append("g").call(yAxis);
// typeof(xAxis, 'wefewf');



var rects = svg.selectAll("rects")
  .data(jsonCircles)
  .enter()
  .append('g')
  .append("rect")

var circleAttributes = rects
   .attr("x", function (d) { return d.x_axis; })
   .attr("y", function (d) { return d.y_axis; })
   .attr("width", function (d) { return d.width; })
   .attr("height", function (d) { return d.height; })
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
    .attr("dy", "0")
    .text(function(d) { 

    	// console.log(d['currentVal'], 'from ')
    	return d['innerText'] + '\n'
     + d['currentVal'] + d['units']})
    .attr({
      "alignment-baseline": "middle",
      "text-anchor": "middle",
      "font-size" : '120%',
      'color': 'white'
    })
var updateText = function(){
	text
	.data(jsonCircles)
	.text(function(d){
		return d['hormone'].name + '\n'  + d['currentVal'] + d['units']
	}).exit()


	}
setInterval(updateText, 10)
	
	// .data(jsonCircles)
	// .enter()
	// .append('text')

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
	var r = /\d+/ 
	timeOfDay.match(r)
	
	makeClock(timeOfDay.match(r),00)
	d3.selectAll('rect')
  .data(jsonCircles)
  .transition(transitionTime)
  .duration(transitionTime)
  .attr("y", function(d){ 
  	// console.log('time of day', d['hormone'])
  	d['currentVal'] = (d['hormone'][timeOfDay])
  	return d['hormone'].Y(timeOfDay)})
  .attr('height',function(d){
  	return (1000 - d['hormone'].Y(timeOfDay))
  }
  )}


$("#timesOfDay").on('change',(function () {
    // console.log($(this).val())
   	changeTime($(this).val()) 
  }))

//REFACTOR TO LOOP TO GOD'S SAKE WTF IS THIS
$('.runDay').on('click', function(){
	var count = 0;
	// var times = ['2h','6h','10h','14h','18h','22h']
	// for (i in times) {

	// 	setTimeout(function(){
	// 		changeTime(times[i])
	// 	}, count * transitionTime)
	// 	count++''
	// }
	setTimeout(function(){
		changeTime('6h')
		makeClock(6,00)
		// setTimeout(makeClock(3,00),transitionTime/4)
  //   	setTimeout(makeClock(4,00),transitionTime/4)
  //   	setTimeout(makeClock(5,00),transitionTime/4)
  //   	setTimeout(makeClock(6,00),transitionTime/4)

    },0 * transitionTime)
	
	setTimeout(function(){
		 changeTime('10h')
  	 	 makeClock(10,00)
	
 		 // setTimeout(makeClock(7,00),transitionTime/4)
		// setTimeout(makeClock(8,00),transitionTime/4)
		// setTimeout(makeClock(9,00),transitionTime/4)
		// setTimeout(makeClock(10,00),transitionTime/4)

    },1 * transitionTime)
    setTimeout(function(){
		 changeTime('14h')
  		 makeClock(14,00)

  //   	setTimeout(makeClock(11,00),transitionTime/4)
		// setTimeout(makeClock(12,00),transitionTime/4)
		// setTimeout(makeClock(13,00),transitionTime/4)
		// setTimeout(makeClock(14,00),transitionTime/4)

    },2 * transitionTime)
    setTimeout(function(){
		 changeTime('18h')
		makeClock(18,00)

	 //    setTimeout(makeClock(15,00),transitionTime/4)
		// setTimeout(makeClock(16,00),transitionTime/4)
		// setTimeout(makeClock(17,00),transitionTime/4)
		// setTimeout(makeClock(18,00),transitionTime/4)
 
    },3 * transitionTime)
    setTimeout(function(){
		 changeTime('22h')
  	makeClock(22,00)
  	
  // setTimeout(makeClock(19,00),transitionTime/4)
		// setTimeout(makeClock(20,00),transitionTime/4)
		// setTimeout(makeClock(21,00),transitionTime/4)
		// setTimeout(makeClock(22,00),transitionTime/4)
	},4 * transitionTime)
     setTimeout(function(){
		 changeTime('2h')
    	makeClock(2 	,00)

  // setTimeout(makeClock(23,00),transitionTime/4)
		// setTimeout(makeClock(24,00),transitionTime/4)
		// setTimeout(makeClock(1,00),transitionTime/4)
		// setTimeout(makeClock(2,00),transitionTime/4)

    },5 * transitionTime)
	// changeTime('6h')
	// changeTime('10h')
	// changeTime('14h')
	// changeTime('18h')
	// changeTime('22h')

})