// tool tip methods
// create a tooltip
let barToolTip2 = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function mouseOverBar2(event, d) {
    barToolTip2.style('opacity', 0.9)
        .html(`Country: ${d.Country}, Year: ${d.Year}, Death Rate: ${d.DeathRate}`)
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");

    d3.select(this)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
}

function mouseLeaveBar2() {
    barToolTip2.style('opacity', 0);

    d3.selectAll('.bar')
        .attr('stroke', '')
}

var countryData;

// define the SVG:
var svg2 = d3.select('#deathRatePerYear')
    .attr('width', barWidth + barMargin.left + barMargin.right)
    .attr('height', barHeight + barMargin.top + barMargin.bottom);

var bars2;
var barsEnter2;

var xScale2 = d3.scaleBand().range([barMargin.left,barWidth]).padding(0.1);
var yScale2 = d3.scaleLinear().range([barHeight,barMargin.top]);
var xAxis2 = d3.axisBottom(xScale2);
var yAxis2 = d3.axisLeft(yScale2);

// OTHER BAR CHART
// OTHER COUNTRY
// define the SVG:
var svg2_ALT = d3.select('#deathRatePerYear_ALT')
    .attr('width', barWidth + barMargin.left + barMargin.right)
    .attr('height', barHeight + barMargin.top + barMargin.bottom);

var bars2_ALT;
var barsEnter2_ALT;

var xScale2_ALT = d3.scaleBand().range([barMargin.left,barWidth]).padding(0.1);
var yScale2_ALT = d3.scaleLinear().range([barHeight,barMargin.top]);
var xAxis2_ALT = d3.axisBottom(xScale2);
var yAxis2_ALT = d3.axisLeft(yScale2);

// append the x axis to SVG
var gx2 = svg2.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + barMargin.top + ',' + barHeight + barMargin.top + ')');

// append the y Axis to the SVG
var gy2 = svg2.append('g')
    .attr('class', 'y axis');

// append the title
var title2 = svg2.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(barWidth/2) - barMargin.left, barMargin.top - 10] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel2 = svg2.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [barWidth/2 - barMargin.left + 75, barHeight + barMargin.top + barMargin.bottom/2] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel2 = svg2.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [barMargin.left - barMargin.left/2, barHeight/2 + barHeight/6] + ') rotate(270)')
    .text("Death Rate")
    .style("font-family", "sans-serif");


// append the X axis label
var xLabel2_ALT = svg2_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [barWidth/2 - barMargin.left + 75, barHeight + barMargin.top + barMargin.bottom/2] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel2_ALT = svg2_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [barMargin.left - barMargin.left/2, barHeight/2 + barHeight/6] + ') rotate(270)')
    .text("Death Rate")
    .style("font-family", "sans-serif");

// OTHER BAR CHART
// append the x axis to SVG
var gx2_ALT = svg2_ALT.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + barMargin.top + ',' + barHeight + barMargin.top + ')');

// append the y Axis to the SVG
var gy2_ALT = svg2_ALT.append('g')
    .attr('class', 'y axis');

// append the title
var title2_ALT = svg2_ALT.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(barWidth/2) - barMargin.left, barMargin.top - 10] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV2 = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry2(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                drawChart2(countryData);
            })

        }

        window.processCSV2ALT = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry2_ALT(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                drawChart2_ALT(countryData);
            })

        }

        // THIS NEEDS TO BE ABLE TO BE CALLED OUTSIDE BY THE INPUTS CHANGED FUNCTION
        processCSV2();
        processCSV2ALT();

        function processCountry2(dataset) {
            // next data by country
            var nested = d3_v5.nest()
                .key(function(d) {
                    return d.Country;
                })
                .entries(dataset);

            // identify index:
            var index;
            for (var i = 0; i < nested.length; i++) {
                if (nested[i].key === globalCountrySelection1) {
                    index = i;
                }
            }

            var newData = nested[index].values;
            return newData;
        }

        function processCountry2_ALT(dataset) {
            // next data by country
            var nested = d3_v5.nest()
                .key(function(d) {
                    return d.Country;
                })
                .entries(dataset);

            // identify index:
            var index;
            for (var i = 0; i < nested.length; i++) {
                if (nested[i].key === globalCountrySelection2) {
                    index = i;
                }
            }

            var newData = nested[index].values;
            return newData;
        }


        // draw the chart (LEFT CHART):
        function drawChart2(data) {
            // calculate the Death rate extent for the current country
            // console.log("all the death rates:");
            var deathRateExtent = d3.extent(countryData, (d) => +d.DeathRate);
            // console.log("Death rate extent:")
            // console.log(deathRateExtent);
            

            // set the Death rate extent as the y axis domain
            yScale2.domain(deathRateExtent);

            xScale2.domain(data.map(function(d) { return d.Year; }));

            // var yScale2 = d3.scaleLinear().range([barHeight,barMargin.top]);
            gx2.call(xAxis2).attr('transform', 'translate(0,' + (barHeight + 5) + ')');
            gy2.call(yAxis2).attr('transform', 'translate(' + (barMargin.left) + ',0)');

            title2.text(globalCountrySelection1 + ": Death Rate / Year");

            bars2 = svg2.selectAll(".bar")
                .data(data);

            barsEnter2 = bars2.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill", "blue")
                .attr("fill-opacity", 0.6)
                .on('mouseenter', mouseOverBar2)
                .on('mouseleave', mouseLeaveBar2);

            bars2.merge(barsEnter2)
                .attr("width", xScale2.bandwidth())
                .attr("x", function(v) { return xScale2(v.Year); })
                .attr("y", function(v) { 
                    // console.log(globalCountrySelection2 + ", " + v.Year + ", " + v.DeathRate)
                    return yScale2(+v.DeathRate); 
                })
                .attr("height", function(v) { return barHeight - yScale2(+v.DeathRate); });
            
            bars2.exit().remove();
        }

        // draw the chart (RIGHT CHART):
        function drawChart2_ALT(data) {
            // calculate the Death rate extent for the current country
            // console.log("all the Death rates:");
            var deathRateExtent = d3.extent(countryData, (d) => +d.DeathRate);
            // console.log("Death rate extent:")
            // console.log(deathRateExtent);
            

            // set the Death rate extent as the y axis domain
            yScale2_ALT.domain(deathRateExtent);

            xScale2_ALT.domain(data.map(function(d) { return d.Year; }));

            // var yScale2 = d3.scaleLinear().range([barHeight,barMargin.top]);
            gx2_ALT.call(xAxis2_ALT).attr('transform', 'translate(0,' + (barHeight + 5) + ')');
            gy2_ALT.call(yAxis2_ALT).attr('transform', 'translate(' + (barMargin.left) + ',0)');

            title2_ALT.text(globalCountrySelection2 + ": Death Rate / Year");

            bars2_ALT = svg2_ALT.selectAll(".bar")
                .data(data);

            barsEnter2_ALT = bars2_ALT.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill", "blue")
                .attr("fill-opacity", 0.6)
                .on('mouseenter', mouseOverBar2)
                .on('mouseleave', mouseLeaveBar2);

            bars2_ALT.merge(barsEnter2_ALT)
                .attr("width", xScale2_ALT.bandwidth())
                .attr("x", function(v) { return xScale2_ALT(v.Year); })
                .attr("y", function(v) { 
                    // console.log(globalCountrySelection2 + ", " + v.Year + ", " + v.DeathRate)
                    return yScale2_ALT(+v.DeathRate); 
                })
                .attr("height", function(v) { return barHeight - yScale2_ALT(+v.DeathRate); });
            
            bars2_ALT.exit().remove();
        }

    })

window.updateDeathRatePerYear = function() {
    // console.log("the country has been updated so the chart must update")    
    processCSV2();
}

window.updateDeathRatePerYearALT = function() {
    // console.log("DEATH RATEthe country has been updated so the chart must update - RIGHT SIDE")    
    processCSV2ALT();
}