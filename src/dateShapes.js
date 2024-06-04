var dateSvg = d3.select("#dateShapes")
    .attr("width", dateShapesWidth)
    .attr("height", dateShapesHeight);

var labelSvg = d3.select("#dateLabels")
    .attr("width", labelsWidth)
    .attr("height", labelsHeight);

// new Date(1980, 0, 1)

var dates = [
    1980,
    1981, 
    1982,
    1983,
    1984,
    1985,
    1986,
    1987,
    1988,
    1989,
    1990,
    1991,
    1992,
    1993,
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013
];

//brushing and linking variables:

// data structure that functions similarly to a hash set that stores the set of squares/dates currently selected in the brush:
var brushedDates;

let dateBrush;

function drawShapes() {
    var squareGroup = dateSvg.selectAll("g.rect").data(dates).enter().append("g")

    squareGroup.append("rect")
        .attr("height", 40)
        .attr("width", 40)
        .attr("class", "dateShape")
        .attr("fill", "lightseagreen")
        .attr("x", function(d, i) {
            return 70 * i + 20;
        })
        .attr("y", 10);

    // dateBrush = d3.brush();
    dateBrush = d3.brushX()
        .extent([
            [0, 0],
            [2400, 450]
            ])
        .on("start brush end", ({selection}) => {
            let value = [];
            if (selection) {
                const [x0, x1] = selection;
                value = squareGroup.style('stroke', '')
                    .filter((d,i) => x0 <= (70 * i + 20) && (70 * i + 20) < x1)
                    .style('stroke', 'black')
                    .style('stroke-width', 2)
                    .data();
                // fill the brushed bars data structure with the current value
                brushedDates = value;
                // call the method that changes the circles
                changeCircles();
                changeBars();
            } else {
                squareGroup
                    .style('stroke', '')
                // return the circles to their original state
                clearCircles();
                clearBars();
            }
        })

    squareGroup.call(dateBrush);
}

function drawLabels() {
    var textGroup = labelSvg.selectAll(".text").data(dates).enter();

    textGroup.append("text")
        .attr("x", function(d, i) {
            return 70 * i + 22;
        })
        .attr("y", 15)
        .text(function(d) {
            return d;
        })
        .style("font-family", "sans-serif");
}

window.changeCircles = function() {
    d3.selectAll(".dot")
        .style('stroke', 'lightseagreen')
        .style('stroke-width', function(d) {
            if (checkSelection(d.Year) == true) {
                return 4;
            } 
            else {
                return 0;
            }
        })

    d3.selectAll(".dotTime")
        .style('stroke', 'lightseagreen')
        .style('stroke-width', function(d) {
            if (checkSelection(d.Year) == true) {
                return 4;
            } 
            else {
                return 0;
            }
        })
}

window.clearCircles = function(){
    d3.selectAll(".dot")
        .style('stroke', '');

    d3.selectAll(".dotTime")
        .style('stroke', '');
}

function changeBars() {
    d3.selectAll(".bar")
        .style("fill", function (d) {
            if (checkSelection(d.Year) == true) {
                        return "#0093A5";
                    } 
                    else {
                        return "blue";
                    }
        })
}

function clearBars() {
    d3.selectAll(".bar")
        .style("fill", "blue");
}

// time parser
var parseYear = d3.timeFormat("%Y");

/*
this function returns true if the month/year of a particular dot is present in the brushedBars set
returns false otherwise 

month = month value of the dot
year = year value of the dot
*/
function checkSelection(year) {
    var answer = false;
    brushedDates.forEach(function (d) {
        var dateHolder = new Date(d, 0, 1);
        var currentYear = parseYear(dateHolder);
        if (year == currentYear) {
            answer = true;
        }
    })
    return answer;
}

drawShapes();
drawLabels();