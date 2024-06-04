var svg6 = d3.select('#scatterTime')
    .attr('width', scatterWidth + scatterMargin.left + scatterMargin.right)
    .attr('height', scatterHeight + scatterMargin.top + scatterMargin.bottom);

var dots2;
var dotsEnter2;

var currentProcessedData2;

/*
this function handles when the inputs of the drop down menus are changed
*/
function inputsChanged2() {
    drawScatter2(currentProcessedData2, d3.select('#scatterYAxisSelector2').node().options[d3.select('#scatterYAxisSelector2').node().selectedIndex].value);
    currScatterY2 = d3.select('#scatterYAxisSelector2').node().options[d3.select('#scatterYAxisSelector2').node().selectedIndex].value;
    currScatterData2 = currentProcessedData2;
}

// define the scales and axes for left chart
var xScale6 = d3.scaleTime().range([scatterMargin.left,scatterWidth]);
var yScale6 = d3.scaleLinear().range([scatterHeight,scatterMargin.top]);
var xAxis6 = d3.axisBottom(xScale6);
var yAxis6 = d3.axisLeft(yScale6);

// append the x axis to SVG
var gx6 = svg6.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + scatterMargin.top + ',' + scatterHeight + scatterMargin.top + ')');

// append the y Axis to the SVG
var gy6 = svg6.append('g')
    .attr('class', 'y axis');

// append the title
var title6 = svg6.append('text')
    .attr('class', 'label')
    .attr('transform', 'translate(' + [(scatterWidth/2) - scatterMargin.left + 20, scatterMargin.top - 10] + ')')
    .style("font-family", "sans-serif")
    .style("font-size", "20px");

// append the X axis label
var xLabel6 = svg6.append('text')
    .attr('class', 'label')
    .attr('transform','translate(' + [scatterWidth/2 - scatterMargin.left + 60, scatterHeight + scatterMargin.top + scatterMargin.bottom/2] + ')')
    .style("font-family", "sans-serif");

// append the Y axis label
var yLabel6 = svg6.append('text')
    .attr('class', 'label')
    .attr('transform','translate('+ [scatterMargin.left - scatterMargin.left*0.7, scatterHeight/2 + scatterHeight/6 - 40] + ') rotate(270)')
    .style("font-family", "sans-serif");

// create a tooltip
let scatterToolTipTime = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

/*
this function defines the functionality of the tool tip when the mouse is over the circle,
it also changes the appearence of the circles
*/
function mouseOverCircleTime(event, d) {
    // tooltip
    scatterToolTipTime.style('opacity', 0.9)
        .html(`Country: ${d.Country}, Year: ${d.Year}, Y Value: ${d[currScatterY2]}`)
        .style("position", "absolute")
        .style("font-family", "sans-serif")
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 10) + "px");

    countrySelectedNow = d.Country;

    d3.selectAll('.dotTime')
        .attr('fill', function(d) {
            if ((d.Country == countrySelectedNow)) {
                return "black";
            } else {
                if (d["Country"] === "Argentina") {
                    return "#FF3700"
                } else if (d["Country"] === "Bolivia") {
                    return "#FF6A00"
                } else if (d["Country"] === "Spain") {
                    return "#FF9D00"
                } else if (d["Country"] === "Albania") {
                    return "#FFC500"
                } else if (d["Country"] === "Turkey") {
                    return "#E0D005"
                } else if (d["Country"] === "Venezuala, RB") {
                    return "#CCE104"
                } else if (d["Country"] === "France") {
                    return "#95E506"
                } else if (d["Country"] === "Peru") {
                    return "#4EC008"
                } else if (d["Country"] === "Norway") {
                    return "#07FF00"
                } else if (d["Country"] === "Germany") {
                    return "#056519"
                } else if (d["Country"] === "Colombia") {
                    return "#00FF83"
                } else if (d["Country"] === "Finland") {
                    return "#06E2C8"
                } else if (d["Country"] === "Sweden") {
                    return "#02BDCB"
                } else if (d["Country"] === "Bulgaria") {
                    return "#0288CB"
                } else if (d["Country"] === "Romania") {
                    return "#025ACB"
                } else if (d["Country"] === "Austria") {
                    return "#022ECB"
                } else if (d["Country"] === "Brazil") {
                    return "#1206A2"
                } else if (d["Country"] === "Ireland") {
                    return "#9169FE"
                } else if (d["Country"] === "Ecuador") {
                    return "#9766C5"
                } else if (d["Country"] === "Chile") {
                    return "#CF31FF"
                } else if (d["Country"] === "Denmark") {
                    return "#FF31FC"
                } else if (d["Country"] === "Portugul") {
                    return "#FF00B9"
                } else if (d["Country"] === "Switzerland") {
                    return "#8C073C"
                } else if (d["Country"] === "Uruguay") {
                    return "#BF5D69"
                } else if (d["Country"] === "Cyprus") {
                    return "#77AAC3"
                } else if (d["Country"] === "Italy") {
                    return "#8C6527"
                } else if (d["Country"] === "Netherlands") {
                    return "#848382"
                } else if (d["Country"] === "Iceland") {
                    return "#FF8383"
                } else if (d["Country"] === "Poland") {
                    return "#587855"
                } else if (d["Country"] === "Hungary") {
                    return "#6C80BA"
                } else if (d["Country"] === "United Kingdom") {
                    return "#B7CF9A"
                } else if (d["Country"] === "Greece") {
                    return "#5D276A"
                } else if (d["Country"] === "Paraguay") {
                    return "#A300B1"
                } 
            }
        })
        .attr('fill-opacity', function (d) {
            if ((d.Country == countrySelectedNow)) {
                return 1;
            } else {
                if (d["Country"] === globalCountrySelection1 || d["Country"] === globalCountrySelection2) {
                    return 0.9;
                } else {
                    return 0.3;
                }
            }
        });
}

/*
this function makes the tool tip invisibile when it leaves the circle, and reverts the appearence
of the circles to their original state
*/
function mouseLeaveCircleTime() {   
    scatterToolTipTime.style('opacity', 0);

    d3.selectAll(".dotTime")
        .attr('fill', function(d) {
            if (d["Country"] === "Argentina") {
                return "#FF3700"
            } else if (d["Country"] === "Bolivia") {
                return "#FF6A00"
            } else if (d["Country"] === "Spain") {
                return "#FF9D00"
            } else if (d["Country"] === "Albania") {
                return "#FFC500"
            } else if (d["Country"] === "Turkey") {
                return "#E0D005"
            } else if (d["Country"] === "Venezuala, RB") {
                return "#CCE104"
            } else if (d["Country"] === "France") {
                return "#95E506"
            } else if (d["Country"] === "Peru") {
                return "#4EC008"
            } else if (d["Country"] === "Norway") {
                return "#07FF00"
            } else if (d["Country"] === "Germany") {
                return "#056519"
            } else if (d["Country"] === "Colombia") {
                return "#00FF83"
            } else if (d["Country"] === "Finland") {
                return "#06E2C8"
            } else if (d["Country"] === "Sweden") {
                return "#02BDCB"
            } else if (d["Country"] === "Bulgaria") {
                return "#0288CB"
            } else if (d["Country"] === "Romania") {
                return "#025ACB"
            } else if (d["Country"] === "Austria") {
                return "#022ECB"
            } else if (d["Country"] === "Brazil") {
                return "#1206A2"
            } else if (d["Country"] === "Ireland") {
                return "#9169FE"
            } else if (d["Country"] === "Ecuador") {
                return "#9766C5"
            } else if (d["Country"] === "Chile") {
                return "#CF31FF"
            } else if (d["Country"] === "Denmark") {
                return "#FF31FC"
            } else if (d["Country"] === "Portugul") {
                return "#FF00B9"
            } else if (d["Country"] === "Switzerland") {
                return "#8C073C"
            } else if (d["Country"] === "Uruguay") {
                return "#BF5D69"
            } else if (d["Country"] === "Cyprus") {
                return "#77AAC3"
            } else if (d["Country"] === "Italy") {
                return "#8C6527"
            } else if (d["Country"] === "Netherlands") {
                return "#848382"
            } else if (d["Country"] === "Iceland") {
                return "#FF8383"
            } else if (d["Country"] === "Poland") {
                return "#587855"
            } else if (d["Country"] === "Hungary") {
                return "#6C80BA"
            } else if (d["Country"] === "United Kingdom") {
                return "#B7CF9A"
            } else if (d["Country"] === "Greece") {
                return "#5D276A"
            } else if (d["Country"] === "Paraguay") {
                return "#A300B1"
            } 
        })
        .attr('fill-opacity', function(d) {
            if (d["Country"] === globalCountrySelection1 || d["Country"] === globalCountrySelection2) {
                return 0.9;
            } else {
                return 0.3;
            }
        })

}

window.drawScatter2 = function(data, yAttribute) {
    var xAxisExtent2 = calculateDateExtent(data);

    xScale6.domain(xAxisExtent2);
    yScale6.domain(d3.extent(data, d => +d[yAttribute]));

    // create the axes for the particular attributes
    gx6.call(xAxis6).attr('transform', 'translate(0,' + (scatterHeight + 5) + ')');
    gy6.call(yAxis6).attr('transform', 'translate(' + (scatterMargin.left) + ',0)');;

    // create the lables for the particular attributes
    xLabel6.text("Year");
    yLabel6.text(yAttribute);

    // create the title for the particular attributes
    title6.text("Time by " + yAttribute);

    // draw the circles
    dots2 = svg6.selectAll('.dotTime')
        .data(data);

    dotsEnter2 = dots2.enter()
        .append('circle')
        .attr('class', 'dotTime')
        .attr('fill', function(d) {
            if (d["Country"] === "Argentina") {
                return "#FF3700"
            } else if (d["Country"] === "Bolivia") {
                return "#FF6A00"
            } else if (d["Country"] === "Spain") {
                return "#FF9D00"
            } else if (d["Country"] === "Albania") {
                return "#FFC500"
            } else if (d["Country"] === "Turkey") {
                return "#E0D005"
            } else if (d["Country"] === "Venezuala, RB") {
                return "#CCE104"
            } else if (d["Country"] === "France") {
                return "#95E506"
            } else if (d["Country"] === "Peru") {
                return "#4EC008"
            } else if (d["Country"] === "Norway") {
                return "#07FF00"
            } else if (d["Country"] === "Germany") {
                return "#056519"
            } else if (d["Country"] === "Colombia") {
                return "#00FF83"
            } else if (d["Country"] === "Finland") {
                return "#06E2C8"
            } else if (d["Country"] === "Sweden") {
                return "#02BDCB"
            } else if (d["Country"] === "Bulgaria") {
                return "#0288CB"
            } else if (d["Country"] === "Romania") {
                return "#025ACB"
            } else if (d["Country"] === "Austria") {
                return "#022ECB"
            } else if (d["Country"] === "Brazil") {
                return "#1206A2"
            } else if (d["Country"] === "Ireland") {
                return "#9169FE"
            } else if (d["Country"] === "Ecuador") {
                return "#9766C5"
            } else if (d["Country"] === "Chile") {
                return "#CF31FF"
            } else if (d["Country"] === "Denmark") {
                return "#FF31FC"
            } else if (d["Country"] === "Portugul") {
                return "#FF00B9"
            } else if (d["Country"] === "Switzerland") {
                return "#8C073C"
            } else if (d["Country"] === "Uruguay") {
                return "#BF5D69"
            } else if (d["Country"] === "Cyprus") {
                return "#77AAC3"
            } else if (d["Country"] === "Italy") {
                return "#8C6527"
            } else if (d["Country"] === "Netherlands") {
                return "#848382"
            } else if (d["Country"] === "Iceland") {
                return "#FF8383"
            } else if (d["Country"] === "Poland") {
                return "#587855"
            } else if (d["Country"] === "Hungary") {
                return "#6C80BA"
            } else if (d["Country"] === "United Kingdom") {
                return "#B7CF9A"
            } else if (d["Country"] === "Greece") {
                return "#5D276A"
            } else if (d["Country"] === "Paraguay") {
                return "#A300B1"
            } 
        })
        .on('mouseenter', mouseOverCircleTime)
        .on('mouseleave', mouseLeaveCircleTime);

    dots2.merge(dotsEnter2)
        .attr("cx", function (d) { 
            
            var dataNow = new Date(d["Year"], 0, 1);
            return xScale6(dataNow); 
        } )
        .attr("cy", function (d) { return yScale6(d[yAttribute]); } )
        .attr('fill-opacity', function(d) {
            if (d["Country"] === globalCountrySelection1 || d["Country"] === globalCountrySelection2) {
                return 0.9;
            } else {
                return 0.3;
            }
        })
        .attr('r', function(d) {
            if (d["Country"] === globalCountrySelection1 || d["Country"] === globalCountrySelection2) {
                return 10;
            } else {
                return 6;
            }
        });

    // remove the dots when the X and Y attributes change so that the graph can be re-drawn
    dots2.exit().remove();
}

window.processCSV6 = function() {
    d3.csv('./data/countries.csv', dataPreprocessor).then(function(dataset) {
        processedData = dataset;
        currentProcessedData2 = processedData;
        drawScatter2(processedData, "BirthRate");
        currScatterY2 = "BirthRate";
        currScatterData2 = processedData;
    });
}

processCSV6();

// pre process the filtered country data
function dataPreprocessor(row) {
    return {
        'Country': row['Country'],
        'Region': row['Region'],
        'Year': row['Year'],
        'BirthRate': +row['BirthRate'],
        'DeathRate': +row['DeathRate'],
        'FertilityRate': +row['FertilityRate'],
        'LifeExpectancyFemale': +row['LifeExpectancyFemale'],
        'LifeExpectancyMale': +row['LifeExpectancyMale'],
        'LifeExpectancyTotal': +row['LifeExpectancyTotal'],
        'PopulationGrowth': +row['PopulationGrowth'],
        'PopulationTotal': +row['PopulationTotal'],
        'MobileCellularSubscriptions': +row['MobileCellularSubscriptions'],
        'MobileCellularSubscriptionsPerHundred': +row['MobileCellularSubscriptionsPerHundred'],
        'TelephoneLines': +row['TelephoneLines'],
        'TelephoneLinesPerHundred': +row['TelephoneLinesPerHundred'],
        'AgriculturalLand': +row['AgriculturalLand'],
        'AgriculturalLandPercent': +row['AgriculturalLandPercent'],
        'ArableLand': +row['ArableLand'],
        'ArableLandPercent': +row['ArableLandPercent'],
        'LandArea': +row['LandArea'],
        'RuralPopulation': +row['RuralPopulation'],
        'RuralPopulationGrowth': +row['RuralPopulationGrowth'],
        'SurfaceArea': +row['SurfaceArea'],
        'PopulationDensity': +row['PopulationDensity'],
        'UrbanPopulationPercent': +row['UrbanPopulationPercent'],
        'UrbanPopulationPercentGrowth': +row['UrbanPopulationPercentGrowth']
    }
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

// legend:

// legend
svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top + 20).text("Legend").style("font-size", "25px").attr("alignment-baseline","middle").style("font-family", "sans-serif")

// text and circles
svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+60).text("Argentina").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+60).attr("r", 7).style("fill", "#FF3700")


svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+80).text("Bolivia").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+80).attr("r", 7).style("fill", "#FF6A00")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+100).text("Spain").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+100).attr("r", 7).style("fill", "#FF9D00")


svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+120).text("Albania").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+120).attr("r", 7).style("fill", "#FFC500")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+140).text("Turkey").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+140).attr("r", 7).style("fill", "#E0D005")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+160).text("Venezuala, RB").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+160).attr("r", 7).style("fill", "#CCE104")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+180).text("France").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+180).attr("r", 7).style("fill", "#95E506")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+200).text("Peru").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+200).attr("r", 7).style("fill", "#4EC008")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+220).text("Norway").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+220).attr("r", 7).style("fill", "#07FF00")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+240).text("Geramany").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+240).attr("r", 7).style("fill", "#056519")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+260).text("Colombia").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+260).attr("r", 7).style("fill", "#00FF83")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+280).text("Finland").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+280).attr("r", 7).style("fill", "#06E2C8")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+300).text("Sweden").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+300).attr("r", 7).style("fill", "#02BDCB")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+320).text("Bulgaria").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+320).attr("r", 7).style("fill", "#0288CB")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+340).text("Romania").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+340).attr("r", 7).style("fill", "#025ACB")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+360).text("Austria").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+360).attr("r", 7).style("fill", "#022ECB")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+380).text("Brazil").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+380).attr("r", 7).style("fill", "#1206A2")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+400).text("Ireland").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+400).attr("r", 7).style("fill", "#9169FE")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+420).text("Chile").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+420).attr("r", 7).style("fill", "#CF31FF")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+440).text("Denmark").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+440).attr("r", 7).style("fill", "#FF31FC")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+460).text("Portugul").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+460).attr("r", 7).style("fill", "#FF00B9")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+480).text("Switzerland").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+480).attr("r", 7).style("fill", "#8C073C")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+500).text("Uruguay").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+500).attr("r", 7).style("fill", "#BF5D69")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+520).text("Cyprus").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+520).attr("r", 7).style("fill", "#77AAC3")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+540).text("Italy").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+540).attr("r", 7).style("fill", "#8C6527")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+560).text("Netherlands").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+560).attr("r", 7).style("fill", "#848382")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+580).text("Iceland").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+580).attr("r", 7).style("fill", "#FF8383")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+600).text("Poland").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+600).attr("r", 7).style("fill", "Poland")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+620).text("Hungary").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+620).attr("r", 7).style("fill", "#6C80BA")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+640).text("United Kingdom").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+640).attr("r", 7).style("fill", "#B7CF9A")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+660).text("Greece").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+660).attr("r", 7).style("fill", "#5D276A")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+680).text("Paraguay").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+680).attr("r", 7).style("fill", "#A300B1")

svg6.append("text").attr("x", 2400 - scatterMargin.right - 60).attr("y", scatterMargin.top+700).text("Ecuador").style("font-size", "20px").attr("alignment-baseline","middle").style("font-family", "sans-serif")
svg6.append("circle").attr("cx",2400 - scatterMargin.right + 100).attr("cy",scatterMargin.top+700).attr("r", 7).style("fill", "#9766C5")

