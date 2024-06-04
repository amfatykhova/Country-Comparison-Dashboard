
function reloadCharts() {
   updateBirthRatePerYear();
   updateDeathRatePerYear();
   updateLifeExpectancyPerYear();
   updatePopulationGrowthOverTime();
   drawScatter(currScatterData, currScatterX, currScatterY);
   drawScatter2(currScatterData2, currScatterY2);
   updatePie();
}

function reloadFlag() {
    console.log("country changed");
    console.log(globalCountrySelection1);
    document.getElementById("flagImage1").src = "flags/" + globalCountrySelection1 + ".png";
}

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {
        d3.csv('./data/countries.csv').then(function(dataset) {
            // console.log("ORIGINAL DATA, ALL COUNTRIES")
            // console.log(dataset);
            var select = d3.select("#countrySelect1")
                .append("div")
                .append("select")
                // .attr("onchange", "reloadFlag()");
        
            select.on("change", function(d) {
                globalCountrySelection1 = d3.select(this).property("value");
                // console.log(globalCountrySelection1);
                reloadCharts()
                reloadFlag();
            })
        
            // next data by country
            var nested = d3_v5.nest()
                .key(function(d) {
                    return d.Country;
                })
                .entries(dataset);
            // console.log(nested);
            // console.log(nested[0]);
        
            select.selectAll("option")
                .data(nested)
                .enter()
                .append("option")
                .attr("value", function (d) {
                    return d.key;
                })
                .text(function (d) {
                    return d.key;
                })
        });
        
    })

function reloadChartsALT() {
    updateBirthRatePerYearALT();
    updateDeathRatePerYearALT();
    updateLifeExpectancyPerYearALT();
    updatePopulationGrowthOverTimeALT();
    drawScatter(currScatterData, currScatterX, currScatterY);
    drawScatter2(currScatterData2, currScatterY2);
    updatePieALT();

}

function reloadFlagALT() {
    console.log("country changed");
    console.log(globalCountrySelection2);
    document.getElementById("flagImage2").src = "flags/" + globalCountrySelection2 + ".png";
}

import("https://cdn.jsdelivr.net/npm/d3@5/+esm")
    .then(d3_v5 => {
        d3.csv('./data/countries.csv').then(function(dataset) {
            var select = d3.select("#countrySelect2")
                .append("div")
                .append("select")
                // .attr("onchange", "reloadFlag()");
        
            select.on("change", function(d) {
                globalCountrySelection2 = d3.select(this).property("value");
                // console.log(globalCountrySelection2);
                reloadChartsALT()
                reloadFlagALT();
            })
        
            // next data by country
            var nested = d3_v5.nest()
                .key(function(d) {
                    return d.Country;
                })
                .entries(dataset);
            // console.log(nested);
            // console.log(nested[0]);
        
            select.selectAll("option")
                .data(nested)
                .enter()
                .append("option")
                .attr("value", function (d) {
                    return d.key;
                })
                .text(function (d) {
                    return d.key;
                })
        });
        
    })
