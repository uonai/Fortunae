import Store from "./store.js";

export default class HistoryChart {
  static loadHistoryChart() {
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

    d3.select("#g-1")
      .append("path")
      .attr("d", line(points))
      .attr("id", "myPath");
    // var randomI = Math.round(Math.random() * myPath.getTotalLength());

    // var historyPoint = myPath.getPointAtLength(randomI);

    // console.log("x=" + historyPoint.x + "  y=" + historyPoint.y);
    const history = [
      { x: 20, y: 10, info: "1589150449155" },
      { x: 100, y: 10, info: "1589151363043" },
    ];

    history.forEach((item) => {
      var tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(item.info);

      d3.select("#g-1")
        .append("svg:circle")
        .attr("cx", item.x)
        .attr("cy", item.y)
        .attr("r", 5)
        .style("fill", "white")
        .on("mouseover", function () {
          return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
          return tooltip
            .style("top", event.pageY + 20 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        })
        .on("click", function () {
          Store.restoreItems(item.info);
        });

      // d3.select("#g-1")
      //   .append("svg:circle")
      //   .attr("cx", 50)
      //   .attr("cy", historyPoint.y)
      //   .attr("r", 5)
      //   .style("fill", "white");

      // d3.select("#g-1")
      //   .append("svg:circle")
      //   .attr("cx", 100)
      //   .attr("cy", historyPoint.y)
      //   .attr("r", 5)
      //   .style("fill", "white");
    });
  }
}
