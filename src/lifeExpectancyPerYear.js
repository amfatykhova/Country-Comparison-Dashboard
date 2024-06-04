var countryData;

// create a tool tip
let lineToolTip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("background", "black")
.style("opacity", 0);  

// line tool tip functions
// tool tip functions:
function mouseOverAverageLifeExpectancy(event, d) {
    lineToolTip.style('opacity', 0.9)
        .html(`Average Life Expectancy`)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");  

    d3.selectAll(".lineAverage")
        .style('stroke-width', 5)
}

function mouseOverFemaleLifeExpectancy(event, d) {
    lineToolTip.style('opacity', 0.9)
        .html(`Female Life Expectancy`)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px"); 
        
    d3.selectAll(".lineWomen")
        .style('stroke-width', 5)
}

function mouseOverMaleLifeExpectancy(event, d) {
    lineToolTip.style('opacity', 0.9)
        .html(`Male Life Expectancy`)
        .style("color", "white")
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");  

    d3.selectAll(".lineMen")
        .style('stroke-width', 5);
}

function mouseLeaveLine() {   
    lineToolTip.style('opacity', 0);

    d3.selectAll(".lineAverage")
        .style('stroke-width', 2);

    d3.selectAll(".lineWomen")
        .style('stroke-width', 2);

    d3.selectAll(".lineMen")
        .style('stroke-width', 2);
}


// LEFT GRAPH VARIABLES:
var svg3 = d3.select('#lifeExpectancyPerYear')
    .attr('width', lineWidth + lineMargin.left + lineMargin.right)
    .attr('height', lineHeight + lineMargin.top + lineMargin.bottom);

var lines3_average;
var lines3_women;
var lines3_men;

var xScale3;
var yScale3;
var xAxis3;
var yAxis3;

xScale3 = d3.scaleTime().range([lineMargin.left,lineWidth]);
yScale3 = d3.scaleLinear().range([lineHeight,lineMargin.top]);

xAxis3 = d3.axisBottom(xScale3);
yAxis3 = d3.axisLeft(yScale3);

// append the x axis to SVG
var gx3 = svg3.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + lineMargin.top + ',' + lineHeight + lineMargin.top + ')');

// append the y Axis to the SVG
var gy3 = svg3.append('g')
    .attr('class', 'y axis');

// append the title
var title3 = svg3.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(lineWidth/2) - lineMargin.left - 60, lineMargin.top - 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel3 = svg3.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [lineWidth/2, lineHeight + 50] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel3 = svg3.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [lineMargin.left - lineMargin.left/2, lineHeight/2 + lineHeight/6 + 30] + ') rotate(270)')
    .text("Life Expectancy")
    .style("font-family", "sans-serif");

// legend
svg3.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 20).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg3.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 50).text("Life Expec Avrg").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 50).attr("r", 7).style("fill", "steelblue")

svg3.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 80).text("Life Expec Female").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 80).attr("r", 7).style("fill", "red")

svg3.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 110).text("Life Expec Male").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 110).attr("r", 7).style("fill", "green")

// steelblue = Life expectancy arvg
// red = life expectancy female
// blue = life expectancy male

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV3 = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry3(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                if (initialLine) {
                    drawChart3(countryData);
                } else {
                    reDrawChart3(countryData);
                }
            })

        }

        // draw the default chart (LEFT)
        processCSV3();

        // filter the data so that it is only for the current country
        function processCountry3(dataset) {
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

        // draw the chart (LEFT CHART)
        function drawChart3(data) {
            var yAxisExtent = calculateLifeExpentencyExtent(data);
            // console.log("life expectancy extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the life expectancy extent as the y axis domain:
            yScale3.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale3.domain(xAxisExtent);

            gx3.call(xAxis3).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy3.call(yAxis3).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title3.text(globalCountrySelection1 + ": Life Expectancy / Year");

            // Add the line
            lines3_average = svg3.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "lineAverage")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyTotal) 
                    })
                )
                .on('mouseenter', mouseOverAverageLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Add the line
            lines3_women = svg3.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "lineWomen")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyFemale) 
                    })
                )
                .on('mouseenter', mouseOverFemaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Add the line
            lines3_men = svg3.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "lineMen")
                .attr("stroke", "green")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyMale) 
                    })
                )
                .on('mouseenter', mouseOverMaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);
        }

        // draw the chart (LEFT CHART)
        function reDrawChart3(data) {
            var yAxisExtent = calculateLifeExpentencyExtent(data);
            // console.log("life expectancy extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the life expectancy extent as the y axis domain:
            yScale3.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale3.domain(xAxisExtent);

            gx3.call(xAxis3).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy3.call(yAxis3).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title3.text(globalCountrySelection1 + ": Life Expectancy / Year");

           // Update the line
            lines3_average.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyTotal) 
                    })
                )
                .on('mouseenter', mouseOverAverageLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Update the line
            lines3_women.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyFemale) 
                    })
                )
                .on('mouseenter', mouseOverFemaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Update the line
            lines3_men.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3(+d.LifeExpectancyMale) 
                    })
                )
                .on('mouseenter', mouseOverMaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

        }

    }
)

// take the minimum form women and the maximum from men 
function calculateLifeExpentencyExtent(data) {
    var lifeExtent;

    var max = -1;
    var min = 200;

    // find the maximum among women
    for (var i = 0; i < data.length; i++) {
        if (+(data[i].LifeExpectancyFemale) > max) {
            max = +(data[i].LifeExpectancyFemale)
        }
    }

    // find the minimum among men
    for (var i = 0; i < data.length; i++) {
        if (+(data[i].LifeExpectancyMale) < min) {
            min = +(data[i].LifeExpectancyMale)
        }
    }

    lifeExtent = [min, max];
    return lifeExtent;
}

function calculateDateExtent(data) {
    var max = -1;
    var min = 3000;

    for (var i = 0; i < data.length; i++) {
        if (+(data[i].Year) < min) {
            min = +(data[i].Year)
        }
        if (+(data[i].Year) > max) {
            max = +(data[i].Year)
        }
    }

    var startDate = new Date(min, 0, 1);
    var endDate = new Date(max, 0, 2);

    var dateRange = [startDate, endDate];
    return dateRange;

}

window.updateLifeExpectancyPerYear = function() {
    initialLine = false;
    // console.log("the country has been updated so the chart must update")    
    processCSV3();
}

window.updateLifeExpectancyPerYearALT = function() {
    initialLine = false;
    // console.log("the country has been updated so the chart must update")    
    processCSV3ALT();
}


// DEFINE RIGHT GRAPH VARIABLES:

// LEFT GRAPH VARIABLES:
// define the SVG:
var svg3_ALT = d3.select('#lifeExpectancyPerYear_ALT')
    .attr('width', lineWidth + lineMargin.left + lineMargin.right)
    .attr('height', lineHeight + lineMargin.top + lineMargin.bottom);

var lines3_average_ALT;
var lines3_women_ALT;
var lines3_men_ALT;

var xScale3_ALT;
var yScale3_ALT;
var xAxis3_ALT;
var yAxis3_ALT;

xScale3_ALT = d3.scaleTime().range([lineMargin.left,lineWidth]);
yScale3_ALT = d3.scaleLinear().range([lineHeight,lineMargin.top]);

xAxis3_ALT = d3.axisBottom(xScale3);
yAxis3_ALT = d3.axisLeft(yScale3);

// append the x axis to SVG
var gx3_ALT = svg3_ALT.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + lineMargin.top + ',' + lineHeight + lineMargin.top + ')');

// append the y Axis to the SVG
var gy3_ALT = svg3_ALT.append('g')
    .attr('class', 'y axis');

// append the title
var title3_ALT = svg3_ALT.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(lineWidth/2) - lineMargin.left - 60, lineMargin.top - 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel3_ALT = svg3_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [lineWidth/2, lineHeight + 50] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel3_ALT = svg3_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [lineMargin.left - lineMargin.left/2, lineHeight/2 + lineHeight/6 + 30] + ') rotate(270)')
    .text("Life Expectancy")
    .style("font-family", "sans-serif");

// legend
svg3_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 20).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg3_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 50).text("Life Expec Avrg").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 50).attr("r", 7).style("fill", "steelblue")

svg3_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 80).text("Life Expec Female").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 80).attr("r", 7).style("fill", "red")

svg3_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 110).text("Life Expec Male").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg3_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 110).attr("r", 7).style("fill", "green")


// METHODS FOR DRAWING THE RIGHT CHART
import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV3ALT = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry3_ALT(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                if (initialLine) {
                    drawChart3_ALT(countryData);
                } else {
                    reDrawChart3_ALT(countryData);
                }
            })

        }

        // draw the default chart (LEFT)
        processCSV3ALT();

        // filter the data so that it is only for the current country
        function processCountry3_ALT(dataset) {
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

        // draw the chart (RIGHT CHART)
        function drawChart3_ALT(data) {
            var yAxisExtent = calculateLifeExpentencyExtent(data);
            // console.log("life expectancy extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the life expectancy extent as the y axis domain:
            yScale3_ALT.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale3_ALT.domain(xAxisExtent);

            gx3_ALT.call(xAxis3).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy3_ALT.call(yAxis3).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title3_ALT.text(globalCountrySelection2 + ": Life Expectancy / Year");

            // Add the line
            lines3_average_ALT = svg3_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "lineAverage")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyTotal) 
                    })
                )
                .on('mouseenter', mouseOverAverageLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Add the line
            lines3_women_ALT = svg3_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("class", "lineWomen")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyFemale) 
                    })
                )
                .on('mouseenter', mouseOverFemaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Add the line
            lines3_men_ALT = svg3_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("class", "lineMen")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyMale) 
                    })
                )
                .on('mouseenter', mouseOverMaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);
        }

        // draw the chart (LEFT CHART)
        function reDrawChart3_ALT(data) {
            var yAxisExtent = calculateLifeExpentencyExtent(data);
            // console.log("life expectancy extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the life expectancy extent as the y axis domain:
            yScale3_ALT.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale3_ALT.domain(xAxisExtent);

            gx3_ALT.call(xAxis3_ALT).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy3_ALT.call(yAxis3_ALT).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title3_ALT.text(globalCountrySelection2 + ": Life Expectancy / Year");

           // Update the line
            lines3_average_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyTotal) 
                    })
                )
                .on('mouseenter', mouseOverAverageLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Update the line
            lines3_women_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyFemale) 
                    })
                )
                .on('mouseenter', mouseOverFemaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

            // Update the line
            lines3_men_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale3_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale3_ALT(+d.LifeExpectancyMale) 
                    })
                )
                .on('mouseenter', mouseOverMaleLifeExpectancy)
                .on('mouseleave', mouseLeaveLine);

        }

    }
)

