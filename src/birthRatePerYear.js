// tool tip methods
// create a tooltip
let barToolTip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function mouseOverBar(event, d) {
    barToolTip.style('opacity', 0.9)
        .html(`Country: ${d.Country}, Year: ${d.Year}, Birth Rate: ${d.BirthRate}`)
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");

    d3.select(this)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
}

function mouseLeaveBar() {
    barToolTip.style('opacity', 0);

    d3.selectAll('.bar')
        .attr('stroke', '')
}

// country data
var countryData;

// define the SVG:
var svg1 = d3.select('#birthRatePerYear')
    .attr('width', barWidth + barMargin.left + barMargin.right)
    .attr('height', barHeight + barMargin.top + barMargin.bottom);

var bars1;
var barsEnter1;

var xScale1 = d3.scaleBand().range([barMargin.left,barWidth]).padding(0.1);
var yScale1 = d3.scaleLinear().range([barHeight,barMargin.top]);
var xAxis1 = d3.axisBottom(xScale1);
var yAxis1 = d3.axisLeft(yScale1);

// OTHER BAR CHART
// OTHER COUNTRY
// define the SVG:
var svg1_ALT = d3.select('#birthRatePerYear_ALT')
    .attr('width', barWidth + barMargin.left + barMargin.right)
    .attr('height', barHeight + barMargin.top + barMargin.bottom);

var bars1_ALT;
var barsEnter1_ALT;

var xScale1_ALT = d3.scaleBand().range([barMargin.left,barWidth]).padding(0.1);
var yScale1_ALT = d3.scaleLinear().range([barHeight,barMargin.top]);
var xAxis1_ALT = d3.axisBottom(xScale1);
var yAxis1_ALT = d3.axisLeft(yScale1);

// append the x axis to SVG
var gx1 = svg1.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + barMargin.top + ',' + barHeight + barMargin.top + ')');

// append the y Axis to the SVG
var gy1 = svg1.append('g')
    .attr('class', 'y axis');

// append the title
var title1 = svg1.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(barWidth/2) - barMargin.left, barMargin.top - 10] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel1 = svg1.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [barWidth/2 - barMargin.left + 75, barHeight + barMargin.top + barMargin.bottom/2] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel1 = svg1.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [barMargin.left - barMargin.left/2, barHeight/2 + barHeight/6] + ') rotate(270)')
    .text("Birth Rate")
    .style("font-family", "sans-serif");

// append the X axis label
var xLabel2_ALT = svg1_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [barWidth/2 - barMargin.left + 75, barHeight + barMargin.top + barMargin.bottom/2] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel2_ALT = svg1_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [barMargin.left - barMargin.left/2, barHeight/2 + barHeight/6] + ') rotate(270)')
    .text("Birth Rate")
    .style("font-family", "sans-serif");

// OTHER BAR CHART
// append the x axis to SVG
var gx1_ALT = svg1_ALT.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + barMargin.top + ',' + barHeight + barMargin.top + ')');

// append the y Axis to the SVG
var gy1_ALT = svg1_ALT.append('g')
    .attr('class', 'y axis');

// append the title
var title1_ALT = svg1_ALT.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(barWidth/2) - barMargin.left, barMargin.top - 10] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV1 = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry1(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                drawChart1(countryData);
            })

        }

        window.processCSV1ALT = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry1_ALT(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                drawChart1_ALT(countryData);
            })

        }

        // THIS NEEDS TO BE ABLE TO BE CALLED OUTSIDE BY THE INPUTS CHANGED FUNCTION
        processCSV1();
        processCSV1ALT();

        function processCountry1(dataset) {
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

        function processCountry1_ALT(dataset) {
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
        function drawChart1(data) {
            var birthRateExtent = d3.extent(countryData, (d) => +d.BirthRate);

            // set the birth rate extent as the y axis domain
            yScale1.domain(birthRateExtent);

            xScale1.domain(data.map(function(d) { return d.Year; }));

            gx1.call(xAxis1).attr('transform', 'translate(0,' + (barHeight + 5) + ')');
            gy1.call(yAxis1).attr('transform', 'translate(' + (barMargin.left) + ',0)');

            title1.text(globalCountrySelection1 + ": Birth Rate / Year");


            bars1 = svg1.selectAll(".bar")
                .data(data);

            barsEnter1 = bars1.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill", "blue")
                .attr("fill-opacity", 0.6)
                .on('mouseenter', mouseOverBar)
                .on('mouseleave', mouseLeaveBar);

            bars1.merge(barsEnter1)
                .attr("width", xScale1.bandwidth())
                .attr("x", function(v) { return xScale1(v.Year); })
                .attr("y", function(v) { return yScale1(+v.BirthRate); })
                .attr("height", function(v) { return barHeight - yScale1(+v.BirthRate); });

            bars1.exit().remove();
        }

        // draw the chart (RIGHT CHART):
        function drawChart1_ALT(data) {
            // calculate the birth rate extent for the current country
            // console.log("all the birth rates:");
            var birthRateExtent = d3.extent(countryData, (d) => +d.BirthRate);
            // console.log("birth rate extent:")
            // console.log(birthRateExtent);
            

            // set the birth rate extent as the y axis domain
            yScale1_ALT.domain(birthRateExtent);

            xScale1_ALT.domain(data.map(function(d) { return d.Year; }));

            // var yScale1 = d3.scaleLinear().range([barHeight,barMargin.top]);
            gx1_ALT.call(xAxis1_ALT).attr('transform', 'translate(0,' + (barHeight + 5) + ')');
            gy1_ALT.call(yAxis1_ALT).attr('transform', 'translate(' + (barMargin.left) + ',0)');

            title1_ALT.text(globalCountrySelection2 + ": Birth Rate / Year");

            bars1_ALT = svg1_ALT.selectAll(".bar")
                .data(data);

            barsEnter1_ALT = bars1_ALT.enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill", "blue")
                .attr("fill-opacity", 0.6)
                .on('mouseenter', mouseOverBar)
                .on('mouseleave', mouseLeaveBar);

            bars1_ALT.merge(barsEnter1_ALT)
                .attr("width", xScale1_ALT.bandwidth())
                .attr("x", function(v) { return xScale1_ALT(v.Year); })
                .attr("y", function(v) { 
                    // console.log(globalCountrySelection1 + ", " + v.Year + ", " + v.BirthRate)
                    return yScale1_ALT(+v.BirthRate); 
                })
                .attr("height", function(v) { return barHeight - yScale1_ALT(+v.BirthRate); });
            
            bars1_ALT.exit().remove();
        }

    })

window.updateBirthRatePerYear = function() {
    // console.log("the country has been updated so the chart must update")    
    processCSV1();
}

window.updateBirthRatePerYearALT = function() {
    // console.log("the country has been updated so the chart must update - RIGHT SIDE")    
    processCSV1ALT();
}