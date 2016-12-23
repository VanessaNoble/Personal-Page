/**
 * Created by vanessamnoble on 12/20/16.
 */
//bar graph
var data = {
    labels: [
        'resilience', 'maintainability', 'accessibility',
        'uptime', 'functionality', 'impact'
    ],
    series: [
        {
            label: '2012',
            values: [4, 8, 15, 16, 23, 42]
        },
        {
            label: '2013',
            values: [12, 43, 22, 11, 73, 25]
        },
        {
            label: '2014',
            values: [31, 28, 14, 8, 15, 21]
        },]
};

var chartWidth       = 230,
    barHeight        = 15,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 110,
    spaceForLegend   = 90;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
        zippedData.push(data.series[j].values[i]);
    }
}
// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });
// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
        if (i % data.series.length === 0)
            return data.labels[Math.floor(i/data.series.length)];
        else
            return ""});

chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
    .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });
legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });


//google graphs


// Load Charts and the corechart and barchart packages.
google.charts.load('current', {'packages':['corechart']});

// Draw the pie chart and bar chart when Charts is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    var piechart_options = {title:'Pie Chart: How Much Pizza I Ate Last Night',
        width:420,
        height:450};
    var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
    piechart.draw(data, piechart_options);

    var barchart_options = {title:'Barchart: How Much Pizza I Ate Last Night',
        width:420,
        height:450,
        legend: 'none'};
    var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));
    barchart.draw(data, barchart_options);
}











