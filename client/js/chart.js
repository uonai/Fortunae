export default class Chart {
  static loadChart() {
    const db = JSON.parse(localStorage.getItem("category1ItemsHistorical"));
    const db2 = JSON.parse(localStorage.getItem("category2ItemsHistorical"));
    console.log(db);
    const data = [
      {
        name: "Category 1",
        values: db,
      },
      {
        name: "Category 2",
        values: db2,
      },
    ];

    const width = 200;
    const height = 200;
    const margin = 50;
    const duration = 300;

    const lineOpacity = "0.9";
    const lineOpacityHover = "1";
    const otherLinesOpacityHover = "0.05";
    const lineStroke = "3px";
    const lineStrokeHover = "3px";

    const circleOpacity = "0.9";
    const circleOpacityOnLineHover = "1";
    const circleRadius = 5;
    const circleRadiusHover = 6;

    /* Format Data */
    if (db) {
      const parseDate = d3.timeParse("%s");
      data.forEach(function (d) {
        d.values.forEach(function (d) {
          d.date = parseDate(d.date);
          console.log(d.date);
          d.amount = +d.item.amount;
          console.log(d.item.amount);
        });
      });

      /* Scale */
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data[0].values, (d) => d.date))
        .range([0, width - margin]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data[0].values, (d) => d.amount)])
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
        .on("mouseover", function (d, i) {
          svg
            .append("text")
            .attr("class", "title-text")
            .style("fill", "#ffffff")
            .text(d.title)
            .attr("text-anchor", "middle")
            .attr("x", (width - margin) / 2)
            .attr("y", 50);
        })
        .on("mouseout", function (d) {
          svg.select(".title-text").remove();
        })
        .append("path")
        .attr("class", "line")
        .attr("d", (d) => line(d.values))
        .style("stroke", (d, i) => color(i))
        .style("opacity", lineOpacity)
        .on("mouseover", function (d) {
          d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
          d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
          d3.select(this)
            .style("opacity", lineOpacityHover)
            .style("stroke-width", lineStrokeHover)
            .style("cursor", "pointer");
        })
        .on("mouseout", function (d) {
          d3.selectAll(".line").style("opacity", lineOpacity);
          d3.selectAll(".circle").style("opacity", circleOpacity);
          d3.select(this)
            .style("stroke-width", lineStroke)
            .style("cursor", "none");
        });

      /* Add circles in the line */
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
            .style("fill", "#ffffff")
            .text(`${d.amount}`)
            .attr("x", (d) => xScale(d.date) + 5)
            .attr("y", (d) => yScale(d.amount) - 10);
        })
        .on("mouseout", function (d) {
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
        .style("fill", "white")
        .on("mouseover", function (d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .style("background-color", "#ffffff")
            .attr("r", circleRadiusHover);
        })
        .on("mouseout", function (d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadius);
        });
    }
  }
}
