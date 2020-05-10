var line = d3
  .line()
  .x(function (d) {
    return d.x;
  })
  .y(function (d) {
    return d.y;
  })
  .curve(d3.curveCardinal.tension(0));

var points = [
  { x: 0, y: 10 },
  { x: 25, y: 10 },
  { x: 50, y: 10 },
  { x: 100, y: 10 },
  { x: 200, y: 10 },
  { x: 300, y: 10 },
  { x: 1000, y: 10 },
];

d3.select("#g-1").append("path").attr("d", line(points)).attr("id", "myPath");

var randomI = Math.round(Math.random() * myPath.getTotalLength());

var historyPoint = myPath.getPointAtLength(randomI);

console.log("x=" + historyPoint.x + "  y=" + historyPoint.y);

d3.select("#g-1")
  .append("svg:circle")
  .attr("cx", historyPoint.x)
  .attr("cy", historyPoint.y)
  .attr("r", 6)
  .style("fill", "white");
