import Store from "../../store.js";
import HistoryItem from "../../models/historyItem.js";
import Helper from "../../utils/helper.js";

export default class HistoryChart {
  static loadHistoryChart() {
    const foregroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--foreground-color");

    const backgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--background-color");
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
    if (historyData) {
      const historyDataItems = historyData.length;
      console.log(historyDataItems);
      let n = 15;
      const history = historyData.map(function (item) {
        const x = n + 10;
        const y = 20;
        const _item = item;
        const infoISO = Helper.getTimeFromUNIXTimestamp(_item);
        if (historyDataItems <= 12) {
          n += 80;
        } else if (historyDataItems <= 24) {
          n += 38;
        } else {
          n += 22;
        }

        return new HistoryItem(x, y, item, infoISO);
      });

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
          .style("background-color", backgroundColor)
          .style("left", "-10000px")
          .text(item.infoISO);

        d3.select("#g-1")
          .append("svg:circle")
          .attr("cx", item.x)
          .attr("cy", item.y)
          .attr("r", 5)
          .style("fill", foregroundColor)
          .on("mouseover", function () {
            return tooltip.style("visibility", "visible");
          })
          .on("mousemove", function () {
            return tooltip
              .style("top", event.pageY + 5 + "px")
              .style("left", event.pageX + 20 + "px");
          })
          .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
          })
          .on("click", function () {
            Store.restoreItems(item.info, "history");
          });
      });
    }
  }

  static setTimestamp(timestamp) {
    const time = Helper.getTimeFromUNIXTimestamp(timestamp);
    const timestampDiv = document.querySelector("#timestamp");
    timestampDiv.innerHTML = time;
  }
}
