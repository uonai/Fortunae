var svg = d3
  .select("#line")
  .append("svg:svg")
  .attr("width", "100%")
  .attr("height", "100%");
var data = d3.range(50).map(function () {
  return Math.random() * 10;
});
var x = d3.scaleLinear().domain([0, 10]).range([0, 700]);
var y = d3.scaleLinear().domain([0, 10]).range([10, 290]);
var line = document.querySelector("#line");
var line = d3
  .line()
  .curve(d3.curveCardinal)
  .x(function (d, i) {
    return x(i);
  })
  .y(function (d) {
    return y(d);
  });

var path = svg.append("svg:path").attr("d", line(data));
var circle = svg
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 350)
  .attr("r", 6)
  .attr("fill", "white");

var pathEl = path.node();
var pathLength = pathEl.getTotalLength();
var BBox = pathEl.getBBox();
var scale = pathLength / BBox.width;
var offsetLeft = document.getElementById("line").offsetLeft;
var randomizeButton = d3.select("button");

svg.on("mousemove", function () {
  var x = d3.event.pageX - offsetLeft;
  var beginning = x,
    end = pathLength,
    target;
  while (true) {
    target = Math.floor((beginning + end) / 2);
    pos = pathEl.getPointAtLength(target);
    if ((target === end || target === beginning) && pos.x !== x) {
      break;
    }
    if (pos.x > x) end = target;
    else if (pos.x < x) beginning = target;
    else break; //position found
  }
  circle.attr("opacity", 1).attr("cx", x).attr("cy", pos.y);
});
