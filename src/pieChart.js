var svg7 = d3.select("#pieChart1")
    .attr("width", pieWidth)
    .attr("height", pieHeight);

var radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin;

var pie = d3.pie();

svg7.append("g");

// append the title
var pieTitle = svg7.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(pieWidth/2) - 170, 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// legend
svg7.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 60).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg7.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 90).text("Average Rural Population").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg7.append("circle").attr("cx", 600 - pieMargin + 20).attr("cy", pieMargin + 90).attr("r", 7).style("fill", "gold")

svg7.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 120).text("Average Urban Population").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg7.append("circle").attr("cx", 600 - pieMargin + 20).attr("cy", pieMargin + 120).attr("r", 7).style("fill", "blue")

// create a tooltip
let pieToolTip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function mouseOverPieSlice(event, d) {
    // tooltip
    pieToolTip.style('opacity', 0.9)
        .html(`Population: ${Math.round(d.data)}`)
        .style("position", "absolute")
        .style("display", "inline-block")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");
}

function mouseLeavePieSlice() {   
    pieToolTip.style('opacity', 0);
}


import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV7 = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                countryData = processCountry7(dataset);
                var pieData = extractPieData(countryData);
                drawPie(pieData);
            })
        }

        // draw the default pie (left)
        processCSV7();

        // filter the data so that it is only for the current country
        function processCountry7(dataset) {
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

        function extractPieData(data) {
            var length = data.length;
            var aggregatedPopulation = 0;
            var aggregatedRuralPopulation = 0;
            for (var i = 0; i < data.length; i++) {
                aggregatedPopulation = aggregatedPopulation + (+data[i].PopulationTotal);
                aggregatedRuralPopulation = aggregatedRuralPopulation + (+data[i].RuralPopulation);
            }
            var averagePopulation = aggregatedPopulation / length;
            var averageRuralPopulation = aggregatedRuralPopulation / length;
            var averageUrbanPopulation = averagePopulation - averageRuralPopulation;
            return [averageRuralPopulation, averageUrbanPopulation];
        }

        function drawPie(data) {
            // console.log("pie data: ")
            // console.log(data);

            pieTitle.text(globalCountrySelection1 + ": Urban / Rural Population Ratio");


            pie = d3.pie();
            
            var color = d3.scaleOrdinal()
                .domain(data)
                .range(["gold", "blue"]);

            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            var arcs = svg7.selectAll("arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc");

            arcs.append("path")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .attr("transform", "translate(" + pieWidth / 3 + "," + pieHeight / 2 + ")")
                .on('mouseenter', mouseOverPieSlice)
                .on('mouseleave', mouseLeavePieSlice);
        }
    })

window.updatePie = function() {
    // console.log("the country has been updated so the chart must update")    
    processCSV7();
}

// RIGHT PIE CHART:

var svg7_ALT = d3.select("#pieChart1_ALT")
    .attr("width", pieWidth)
    .attr("height", pieHeight);

var pie_ALT = d3.pie();

svg7_ALT.append("g");

// append the title
var pieTitle_ALT = svg7_ALT.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(pieWidth/2) - 170, 25] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// legend
svg7_ALT.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 60).text("Legend").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

svg7_ALT.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 90).text("Average Rural Population").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg7_ALT.append("circle").attr("cx", 600 - pieMargin + 20).attr("cy", pieMargin + 90).attr("r", 7).style("fill", "gold")

svg7_ALT.append("text").attr("x", 600 - pieMargin - 170).attr("y", pieMargin + 120).text("Average Urban Population").style("font-size", "15px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg7_ALT.append("circle").attr("cx", 600 - pieMargin + 20).attr("cy", pieMargin + 120).attr("r", 7).style("fill", "blue")

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {

        window.processCSV7ALT = function() {
            d3.csv('./data/countries.csv').then(function(dataset) {
                var countryData = processCountry7_ALT(dataset);
                var pieData = extractPieData_ALT(countryData);
                drawPie_ALT(pieData);
            })
        }

        // draw the default pie (left)
        processCSV7ALT();

        // filter the data so that it is only for the current country
        function processCountry7_ALT(dataset) {
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

        function extractPieData_ALT(data) {
            var length = data.length;
            var aggregatedPopulation = 0;
            var aggregatedRuralPopulation = 0;
            for (var i = 0; i < data.length; i++) {
                aggregatedPopulation = aggregatedPopulation + (+data[i].PopulationTotal);
                aggregatedRuralPopulation = aggregatedRuralPopulation + (+data[i].RuralPopulation);
            }
            var averagePopulation = aggregatedPopulation / length;
            var averageRuralPopulation = aggregatedRuralPopulation / length;
            var averageUrbanPopulation = averagePopulation - averageRuralPopulation;
            return [averageRuralPopulation, averageUrbanPopulation];
        }

        function drawPie_ALT(data) {
            // console.log("pie data: ")
            // console.log(data);

            pieTitle_ALT.text(globalCountrySelection2 + ": Urban / Rural Population Ratio");

            pie_ALT = d3.pie();
            
            var color = d3.scaleOrdinal()
                .domain(data)
                .range(["gold", "blue"]);

            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            var arcs = svg7_ALT.selectAll("arc")
                .data(pie_ALT(data))
                .enter()
                .append("g")
                .attr("class", "arc");

            arcs.append("path")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .attr("transform", "translate(" + pieWidth / 3 + "," + pieHeight / 2 + ")")
                .on('mouseenter', mouseOverPieSlice)
                .on('mouseleave', mouseLeavePieSlice);
        }
    })

window.updatePieALT = function() {
    // console.log("the country has been updated so the chart must update")    
    processCSV7ALT();
}
    