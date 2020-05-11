import Store from "./store.js";
import HistoryItem from "./historyItem.js";

export default class HistoryChart {
  static loadHistoryChart() {
    const line = d3
      .line()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      })
      .curve(d3.curveCardinal.tension(0));

    const points = [
      { x: 0, y: 20 },
      { x: 1000, y: 20 },
    ];

    const historyData = JSON.parse(localStorage.getItem("history"));
    console.log(historyData);
    // if (historyData) {
    let n = 15;
    const history = historyData.map(function (item) {
      console.log(item);
      const x = n + 10;
      const y = 20;
      const _item = item;
      const infoISO = new Date(_item * 1000);
      n += 100;
      return new HistoryItem(x, y, item, infoISO);
    });

    console.log(history);
    // }
    //syntax is off here, need to es6

    d3.select("#g-1")
      .append("path")
      .attr("d", line(points))
      .attr("id", "myPath");

    history.forEach((item) => {
      var tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "1000")
        .style("visibility", "hidden")
        .style("background-color", "black")
        .text(item.infoISO);

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
            .style("top", event.pageY + 10 + "px")
            .style("left", event.pageX + 20 + "px");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        })
        .on("click", function () {
          Store.restoreItems(item.info);
        });
    });
  }
}
