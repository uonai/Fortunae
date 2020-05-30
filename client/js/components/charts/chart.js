import Language from "../../utils/language.js";

export default class Chart {
  static reduceItems(itemType) {
    let groupOfItems = itemType.reduce((x, a) => {
      x[a.date] = [...(x[a.date] || []), a];
      return x;
    }, {});

    let categoryRollup = [];
    for (let date of Object.keys(groupOfItems)) {
      let numbers = [];
      const items = groupOfItems[date];

      items.forEach((item) => {
        numbers.push(Number(item.item.amount));
      });

      const numbersTotal = numbers.reduce((a, b) => a + b, 0);
      categoryRollup.push({ date: date, amount: numbersTotal });
    }

    return categoryRollup;
  }

  static loadChart() {
    const foregroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--foreground-color");

    const result = JSON.parse(localStorage.getItem("category1ItemsHistorical"));

    const locale = JSON.parse(localStorage.getItem("language"));
    const headers = Language.getTerminology("fund", "categories");
    const noDataAvailableTerminology = Language.getTerminology(
      "general",
      "noDataAvailable"
    );

    if (locale) {
      d3.timeFormatDefaultLocale(locale.time);
    }

    if (result) {
      if (result.length) {
        const chartContainer = document.querySelector(".chart-inner");
        chartContainer.classList.remove("hidden");
        let checkingItems = [];
        let savingItems = [];
        let investmentItems = [];
        let emergencyItems = [];

        result.forEach((item) => {
          if (item.item.type == "checking") {
            checkingItems.push(item);
          }
          if (item.item.type == "saving") {
            savingItems.push(item);
          }
          if (item.item.type == "investment") {
            investmentItems.push(item);
          }
          if (item.item.type == "emergency") {
            emergencyItems.push(item);
          }
        });

        const db = this.reduceItems(checkingItems);
        const db2 = this.reduceItems(savingItems);
        const db3 = this.reduceItems(investmentItems);
        const db4 = this.reduceItems(emergencyItems);

        const data = [
          {
            name: headers[Object.keys(headers)[0]],
            values: db,
          },
          {
            name: headers[Object.keys(headers)[1]],
            values: db2,
          },
          {
            name: headers[Object.keys(headers)[2]],
            values: db3,
          },
          {
            name: headers[Object.keys(headers)[3]],
            values: db4,
          },
        ];

        // FOR REFEREHCE
        // const data = [
        //   {
        //     name: "Checking",
        //     values: [
        //       { date: "2000", amount: "2000" },
        //       { date: "2001", amount: "2200" },
        //     ],
        //   },
        // ];

        const width = 150;
        const height = 150;
        const margin = 40;
        const duration = 300;

        const lineOpacity = "1";
        const lineOpacityHover = "0.1";
        const otherLinesOpacityHover = "0.1";
        const lineStroke = "2px";
        const lineStrokeHover = "4px";

        const circleOpacity = "1";
        const circleOpacityOnLineHover = "1";
        const circleRadius = 5;
        const circleRadiusHover = 6;

        /* Format Data */
        if (db) {
          const parseDate = d3.timeParse("%s");

          let values = [];
          data.forEach(function (d) {
            d.values.forEach(function (d) {
              d.date = parseDate(d.date);
              d.amount = +d.amount;
              values.push(d.amount);
            });
          });
          /* Scale */
          const xScale = d3
            .scaleTime()
            .domain(d3.extent(data[0].values, (d) => d.date))
            .range([0, width - margin]);

          const yScale = d3
            .scaleLinear()
            .domain([0, Math.max(...values)])
            .range([height - margin, 0]);

          const color = d3.scaleOrdinal(d3.schemeGreys);

          /* Add SVG */
          const svg = d3
            .select("#line")
            .append("svg")
            .attr("width", width + margin + "px")
            .attr("height", height + margin + "px")
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);

          /* Add line into SVG */
          const line = d3
            .line()
            .curve(d3.curveCardinal)
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.amount));

          let lines = svg.append("g").attr("class", "lines");

          lines
            .selectAll(".line-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "line-group")
            .on("mouseover", function (d) {
              svg
                .append("text")
                .attr("class", "title-text")
                .style("fill", foregroundColor)
                .text(d.name)
                .attr("text-anchor", "middle")
                .attr("x", (width - margin) / 2)
                .attr("y", 100);
            })
            .on("mouseout", function () {
              svg.select(".title-text").remove();
            })
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => line(d.values))
            .style("stroke", (d, i) => color(i))
            .style("opacity", lineOpacity)
            .on("mouseover", function () {
              d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
              d3.selectAll(".circle").style(
                "opacity",
                circleOpacityOnLineHover
              );
              d3.select(this)
                .style("opacity", lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            })
            .on("mouseout", function () {
              d3.selectAll(".line").style("opacity", lineOpacity);
              d3.selectAll(".circle").style("opacity", circleOpacity);
              d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
            });

          lines
            .selectAll("circle-group")
            .data(data)
            .enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data((d) => d.values)
            .enter()
            .append("g")
            .attr("class", "circle")
            .on("mouseover", function (d) {
              d3.select(this)
                .style("cursor", "pointer")
                .append("text")
                .attr("class", "text")
                .style("fill", foregroundColor)
                .text(`${d.amount}`)
                .attr("x", (d) => xScale(d.date) + -10)
                .attr("y", (d) => yScale(d.amount) - 10);
            })
            .on("mouseout", function () {
              d3.select(this)
                .style("cursor", "none")
                .transition()
                .duration(duration)
                .selectAll(".text")
                .remove();
            })
            .append("circle")
            .attr("cx", (d) => xScale(d.date))
            .attr("cy", (d) => yScale(d.amount))
            .attr("r", circleRadius)
            .style("opacity", circleOpacity)
            .style("fill", foregroundColor)
            .on("mouseover", function () {
              d3.select(this)
                .transition()
                .duration(duration)
                .style("background-color", foregroundColor)
                .attr("r", circleRadiusHover);
            })
            .on("mouseout", function () {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
            });
        }
      } else {
        console.log("chart else");
        const noData = document.createElement("span");
        noData.innerHTML = `${noDataAvailableTerminology}`;
        const parent = document.querySelector(".chart-outer");

        const chartContainer = document.querySelector(".chart-inner");
        parent.insertBefore(noData, chartContainer);
      }
    }
  }
}
