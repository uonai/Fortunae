export default class Chart {
  static loadChart() {
    var data = [
      {
        name: "Checking",
        values: [
          { date: "2000", price: "100" },
          { date: "2001", price: "110" },
          { date: "2002", price: "145" },
          { date: "2003", price: "241" },
          { date: "2004", price: "101" },
          { date: "2005", price: "90" },
        ],
      },
      {
        name: "Savings",
        values: [
          { date: "2000", price: "200" },
          { date: "2001", price: "120" },
          { date: "2002", price: "33" },
          { date: "2003", price: "21" },
          { date: "2004", price: "51" },
          { date: "2005", price: "190" },
        ],
      },
      {
        name: "Investment",
        values: [
          { date: "2000", price: "300" },
          { date: "2001", price: "75" },
          { date: "2002", price: "44" },
          { date: "2003", price: "120" },
          { date: "2004", price: "70" },
          { date: "2005", price: "180" },
        ],
      },
    ];

    var width = 250;
    var height = 250;
    var margin = 0;
    var duration = 250;

    var lineOpacity = "0.9";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "3.5px";
    var lineStrokeHover = "3.5px";

    var circleOpacity = "0.9";
    var circleOpacityOnLineHover = "1";
    var circleRadius = 5;
    var circleRadiusHover = 6;

    /* Format Data */
    var parseDate = d3.timeParse("%Y");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.date))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.price)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeGreys);

    /* Add SVG */
    var svg = d3
      .select("#line")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .curve(d3.curveCardinal)
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price));

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
          .text(d.name)
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
          .text(`${d.price}`)
          .attr("x", (d) => xScale(d.date) + 5)
          .attr("y", (d) => yScale(d.price) - 10);
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
      .attr("cy", (d) => yScale(d.price))
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
        d3.select(this).transition().duration(duration).attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);
  }
}
