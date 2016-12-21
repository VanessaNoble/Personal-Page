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

var chartWidth       = 300,
    barHeight        = 20,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

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

// //line graph
// var svg = d3.select("svg"),
//     margin = {top: 20, right: 80, bottom: 30, left: 50},
//     width = svg.attr("width") - margin.left - margin.right,
//     height = svg.attr("height") - margin.top - margin.bottom,
//     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var parseTime = d3.timeParse("%Y%m%d");
//
// var x = d3.scaleTime().range([0, width]),
//     y = d3.scaleLinear().range([height, 0]),
//     z = d3.scaleOrdinal(d3.schemeCategory10);
//
// var line = d3.line()
//     .curve(d3.curveBasis)
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.temperature); });
//
// d3.tsv("data.tsv", type, function(error, data) {
//     if (error) throw error;
//
//     var cities = data.columns.slice(1).map(function(id) {
//         return {
//             id: id,
//             values: data.map(function(d) {
//                 return {date: d.date, temperature: d[id]};
//             })
//         };
//     });
//
//     x.domain(d3.extent(data, function(d) { return d.date; }));
//
//     y.domain([
//         d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
//         d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
//     ]);
//
//     z.domain(cities.map(function(c) { return c.id; }));
//
//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
//
//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(d3.axisLeft(y))
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("fill", "#000")
//         .text("Temperature, ºF");
//
//     var city = g.selectAll(".city")
//         .data(cities)
//         .enter().append("g")
//         .attr("class", "city");
//
//     city.append("path")
//         .attr("class", "line")
//         .attr("d", function(d) { return line(d.values); })
//         .style("stroke", function(d) { return z(d.id); });
//
//     city.append("text")
//         .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
//         .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
//         .attr("x", 3)
//         .attr("dy", "0.35em")
//         .style("font", "10px sans-serif")
//         .text(function(d) { return d.id; });
// });
//
// function type(d, _, columns) {
//     d.date = parseTime(d.date);
//     for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
//     return d;
// }

//pie chart
















