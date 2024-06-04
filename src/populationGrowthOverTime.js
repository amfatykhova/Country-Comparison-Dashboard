// create a tool tip
let lineToolTip2 = d3.select("body").append("div")
.attr("class", "tooltip")
.style("background", "black")
.style("opacity", 0);  

// line tool tip functions
// tool tip functions:
function mouseOverPopulation(event, d) {
    lineToolTip2.style('opacity', 0.9)
        .html(`Average Life Expectancy`)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");  

    d3.selectAll(".linePopulation")
        .style('stroke-width', 5)
}

function mouseOverRural(event, d) {
    lineToolTip2.style('opacity', 0.9)
        .html(`Rural Population Growth`)
        .style("position", "absolute")
        .style("color", "white")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px"); 
        
    d3.selectAll(".lineRural")
        .style('stroke-width', 5)
}

function mouseOverUrban(event, d) {
    lineToolTip2.style('opacity', 0.9)
        .html(`Urban Population Growth`)
        .style("color", "white")
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");  

    d3.selectAll(".lineUrban")
        .style('stroke-width', 5);
}

function mouseLeaveLine2() {   
    lineToolTip2.style('opacity', 0);

    d3.selectAll(".linePopulation")
        .style('stroke-width', 2);

    d3.selectAll(".lineRural")
        .style('stroke-width', 2);

    d3.selectAll(".lineUrban")
        .style('stroke-width', 2);
}

var countryData;

// LEFT GRAPH VARIABLES:
// define the SVG:
var svg4 = d3.select('#populationGrowthOverTime')
    .attr('width', lineWidth + lineMargin.left + lineMargin.right)
    .attr('height', lineHeight + lineMargin.top + lineMargin.bottom);

var lines4_total_population;
var lines4_urban_population;
var lines4_rural_population;

var xScale4;
var yScale4;
var xAxis4;
var yAxis4;

xScale4 = d3.scaleTime().range([lineMargin.left,lineWidth]);
yScale4 = d3.scaleLinear().range([lineHeight,lineMargin.top]);

xAxis4 = d3.axisBottom(xScale4);
yAxis4 = d3.axisLeft(yScale4);

// append the x axis to SVG
var gx4 = svg4.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + lineMargin.top + ',' + lineHeight + lineMargin.top + ')');

// append the y Axis to the SVG
var gy4 = svg4.append('g')
    .attr('class', 'y axis');

// append the title
var title4 = svg4.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(lineWidth/2) - lineMargin.left - 60, lineMargin.top - 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel4 = svg4.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [lineWidth/2, lineHeight + 50] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel4 = svg4.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [lineMargin.left - lineMargin.left/2, lineHeight/2 + lineHeight/6 + 30] + ') rotate(270)')
    .text("Population Growth %")
    .style("font-family", "sans-serif");

// legend
svg4.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 20).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg4.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 50).text("Avrg Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 50).attr("r", 7).style("fill", "steelblue")

svg4.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 80).text("Urban Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 80).attr("r", 7).style("fill", "red")

svg4.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 110).text("Rural Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 110).attr("r", 7).style("fill", "green")

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV4 = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry4(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                if (initialLine) {
                    drawChart4(countryData);
                } else {
                    reDrawChart4(countryData);
                }
            })

        }

        // draw the default chart (LEFT)
        processCSV4();

        // filter the data so that it is only for the current country
        function processCountry4(dataset) {
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
        function drawChart4(data) {
            var yAxisExtent = calculatePopulationGrowthExtent(data);
            // console.log("Population Growth % extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the population growth % extent as the y axis domain:
            yScale4.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale4.domain(xAxisExtent);

            gx4.call(xAxis4).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy4.call(yAxis4).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title4.text(globalCountrySelection1 + ": Population Growth % / Year");

            // Add the line
            lines4_total_population = svg4.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "linePopulation")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.PopulationGrowth) 
                    })
                )
                .on('mouseenter', mouseOverPopulation)
                .on('mouseleave', mouseLeaveLine2);

            // Add the line
            lines4_urban_population = svg4.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("class", "lineUrban")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.UrbanPopulationPercentGrowth) 
                    })
                )
                .on('mouseenter', mouseOverUrban)
                .on('mouseleave', mouseLeaveLine2);

            // Add the line
            lines4_rural_population = svg4.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("class", "lineRural")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.RuralPopulationGrowth) 
                    })
                )
                .on('mouseenter', mouseOverRural)
                .on('mouseleave', mouseLeaveLine2);
        }

        // draw the chart (LEFT CHART)
        function reDrawChart4(data) {
            var yAxisExtent = calculatePopulationGrowthExtent(data);
            // console.log("Population Growth % extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the Population Growth % extent as the y axis domain:
            yScale4.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale4.domain(xAxisExtent);

            gx4.call(xAxis4).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy4.call(yAxis4).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title4.text(globalCountrySelection1 + ": Population Growth % / Year");

           // Update the line
            lines4_total_population.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.PopulationGrowth) 
                    })
                )

            // Update the line
            lines4_urban_population.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.UrbanPopulationPercentGrowth) 
                    })
                )

            // Update the line
            lines4_rural_population.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4(+d.RuralPopulationGrowth) 
                    })
                )

        }

    }
)

function calculatePopulationGrowthExtent(data) {
    // var populationGrowthExtent;

    // // find the maximum and minimum among total population growth
    // var totalMin = 200;
    // var totalMax = -200;

    // for (var i = 0; i < data.length; i++) {
    //     if (parseFloat(data[i].PopulationGrowth) < totalMin) {
    //         totalMin = parseFloat(data[i].PopulationGrowth)
    //         console.log("TOTAL MIN LOOK HERE: " + totalMin + " Index: " + i);
    //     }
    //     if (parseFloat(data[i].PopulationGrowth) > totalMax) {
    //         totalMax = parseFloat(data[i].PopulationGrowth)
    //     }
    // }

    // console.log("OVERALL POPULATION EXTENT: (" + totalMin + ", " + totalMax + ")");

    // // find the maximum and minimum among urban population growth
    // var urbanMin = 200;
    // var urbanMax = -200;

    // for (var i = 0; i < data.length; i++) {
    //     if (parseFloat(data[i].PopulationGrowth) < urbanMin) {
    //         urbanMin = parseFloat(data[i].UrbanPopulationPercentGrowth)
    //         console.log("URBAN MIN LOOK HERE: " + urbanMin + " Index: " + i);
    //     }
    //     if (parseFloat(data[i].PopulationGrowth) > urbanMax) {
    //         urbanMax = parseFloat(data[i].UrbanPopulationPercentGrowth)
    //     }
    // }

    // console.log("URBAN POPULATION EXTENT: (" + urbanMin + ", " + urbanMax + ")");


    // // find the maximum and minimum among rural population growth
    // var ruralMin = 1000;
    // var ruralMax = -200;

    // for (var i = 0; i < data.length; i++) {
    //     if (parseFloat(data[i].PopulationGrowth) < ruralMin) {
    //         ruralMin = parseFloat(data[i].RuralPopulationGrowth);
    //         console.log("RURAL MIN LOOK HERE: " + ruralMin + " Index: " + i);
    //     }
    //     if (parseFloat(data[i].PopulationGrowth) > ruralMax) {
    //         ruralMax = parseFloat(data[i].RuralPopulationGrowth);
    //     }
    // }

    // console.log("RURAL POPULATION EXTENT: (" + ruralMin + ", " + ruralMax + ")");

    // var absoluteMin = 200;
    // var absoluteMax = -200;

    // var allMin = [totalMin, urbanMin, ruralMin];
    // var allMax = [totalMax, urbanMax, urbanMax];

    // for (var i = 0; i < 3; i ++) {
    //     if (allMin[i] < absoluteMin) {
    //         absoluteMin = allMin[i];
    //     }
    //     if (allMax[i] > absoluteMax) {
    //         absoluteMax = allMax[i];
    //     }
    // }

    // populationGrowthExtent = [absoluteMin, absoluteMax];
    // console.log("ACTUAL POPULATION EXTENT");
    // console.log(populationGrowthExtent);
    // return populationGrowthExtent;

    return [-6, 5];
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

window.updatePopulationGrowthOverTime = function() {
    initialLine = false;
    // console.log("the country has been updated so the chart must update")    
    processCSV4();
}

window.updatePopulationGrowthOverTimeALT = function() {
    initialLine = false;
    // console.log("the country has been updated so the chart must update")    
    processCSV4ALT();
}


// DEFINE RIGHT GRAPH VARIABLES:

// LEFT GRAPH VARIABLES:
// define the SVG:
var svg4_ALT = d3.select('#populationGrowthOverTime_ALT')
    .attr('width', lineWidth + lineMargin.left + lineMargin.right)
    .attr('height', lineHeight + lineMargin.top + lineMargin.bottom);

var lines4_total_population_ALT;
var lines4_urban_population_ALT;
var lines4_rural_population_ALT;

var xScale4_ALT;
var yScale4_ALT;
var xAxis4_ALT;
var yAxis4_ALT;

xScale4_ALT = d3.scaleTime().range([lineMargin.left,lineWidth]);
yScale4_ALT = d3.scaleLinear().range([lineHeight,lineMargin.top]);

xAxis4_ALT = d3.axisBottom(xScale4);
yAxis4_ALT = d3.axisLeft(yScale4);

// append the x axis to SVG
var gx4_ALT = svg4_ALT.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + lineMargin.top + ',' + lineHeight + lineMargin.top + ')');

// append the y Axis to the SVG
var gy4_ALT = svg4_ALT.append('g')
    .attr('class', 'y axis');

// append the title
var title4_ALT = svg4_ALT.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(lineWidth/2) - lineMargin.left - 60, lineMargin.top - 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel4_ALT = svg4_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [lineWidth/2, lineHeight + 50] + ')')
    .text("Year")
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel4_ALT = svg4_ALT.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [lineMargin.left - lineMargin.left/2, lineHeight/2 + lineHeight/6 + 30] + ') rotate(270)')
    .text("Population Growth %")
    .style("font-family", "sans-serif");

// legend
svg4_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 20).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg4_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 50).text("Avrg Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 50).attr("r", 7).style("fill", "steelblue")

svg4_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 80).text("Urban Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 80).attr("r", 7).style("fill", "red")

svg4_ALT.append("text").attr("x", 598 - lineMargin.right - 50).attr("y", lineMargin.top + 110).text("Rural Pop. Growth").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg4_ALT.append("circle").attr("cx", 598 - lineMargin.right + 90).attr("cy",lineMargin.top + 110).attr("r", 7).style("fill", "green")


// METHODS FOR DRAWING THE RIGHT CHART
import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV4ALT = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry4_ALT(dataset);
                // console.log("country Data: ");
                // console.log(countryData);
                if (initialLine) {
                    drawChart4_ALT(countryData);
                } else {
                    reDrawChart4_ALT(countryData);
                }
            })

        }

        // draw the default chart (LEFT)
        processCSV4ALT();

        // filter the data so that it is only for the current country
        function processCountry4_ALT(dataset) {
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
        function drawChart4_ALT(data) {
            var yAxisExtent = calculatePopulationGrowthExtent(data);
            // console.log("Population growth % extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the population growth % extent as the y axis domain:
            yScale4_ALT.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale4_ALT.domain(xAxisExtent);

            gx4_ALT.call(xAxis4).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy4_ALT.call(yAxis4).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title4_ALT.text(globalCountrySelection2 + ": Population Growth % / Year");

            // Add the line
            lines4_total_population_ALT = svg4_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "linePopulation")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.PopulationGrowth) 
                    })
                )
                .on('mouseenter', mouseOverPopulation)
                .on('mouseleave', mouseLeaveLine2);

            // Add the line
            lines4_urban_population_ALT = svg4_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("class", "lineUrban")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.UrbanPopulationPercentGrowth) 
                    })
                )
                .on('mouseenter', mouseOverUrban)
                .on('mouseleave', mouseLeaveLine2);

            // Add the line
            lines4_rural_population_ALT = svg4_ALT.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "green")
                .attr("class", "lineRural")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.RuralPopulationGrowth) 
                    })
                )
                .on('mouseenter', mouseOverRural)
                .on('mouseleave', mouseLeaveLine2);
        }

        // draw the chart (LEFT CHART)
        function reDrawChart4_ALT(data) {
            var yAxisExtent = calculatePopulationGrowthExtent(data);
            // console.log("Population growth % extent: " + yAxisExtent + " for " + globalCountrySelection1);

            // set the population growth % extent as the y axis domain:
            yScale4_ALT.domain(yAxisExtent);


            var xAxisExtent = calculateDateExtent(data);
            // console.log("Year range: ");
            // console.log(xAxisExtent);

            // set the date range as the x axis domain
            xScale4_ALT.domain(xAxisExtent);

            gx4_ALT.call(xAxis4_ALT).attr('transform', 'translate(0,' + (lineHeight + 5) + ')');
            gy4_ALT.call(yAxis4_ALT).attr('transform', 'translate(' + (lineMargin.left) + ',0)');

            title4_ALT.text(globalCountrySelection2 + ": Population Growth % / Year");

           // Update the line
            lines4_total_population_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.PopulationGrowth) 
                    })
                )

            // Update the line
            lines4_urban_population_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.UrbanPopulationPercentGrowth) 
                    })
                )

            // Update the line
            lines4_rural_population_ALT.datum(data)
                .attr("d", d3.line()
                    .x(function(d) { 
                        var dataNow = new Date(d.Year, 0, 1);
                        return xScale4_ALT(dataNow) 
                    })
                    .y(function(d) { 
                        return yScale4_ALT(+d.RuralPopulationGrowth) 
                    })
                )

        }

    }
)

