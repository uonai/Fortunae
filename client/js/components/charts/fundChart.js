const result = JSON.parse(localStorage.getItem("category1ItemsHistorical"));
if (result) {
  const db = result.filter(function (item) {
    return item.item.type == "Checking";
  });

  const db2 = result.filter(function (item) {
    return item.item.type == "Saving";
  });

  const db3 = result.filter(function (item) {
    return item.item.type == "Investment";
  });

  const db4 = result.filter(function (item) {
    return item.item.type == "Emergency";
  });

  const data = [
    {
      name: "Checking",
      values: db,
    },
    {
      name: "Saving",
      values: db2,
    },
    {
      name: "Investment",
      values: db3,
    },
  ];
  // const data = [
  //   {
  //     name: "Checking",
  //     values: [
  //       { date: "2000", amount: "2000" },
  //       { date: "2001", amount: "2200" },
  //       { date: "2002", amount: "3000" },
  //       { date: "2003", amount: "4000" },
  //       { date: "2004", amount: "2000" },
  //       { date: "2005", amount: "1500" },
  //     ],
  //   },
  //   {
  //     name: "Savings",
  //     values: [
  //       { date: "2000", amount: "3000" },
  //       { date: "2001", amount: "3500" },
  //       { date: "2002", amount: "4000" },
  //       { date: "2003", amount: "4500" },
  //       { date: "2004", amount: "5000" },
  //       { date: "2005", amount: "5500" },
  //     ],
  //   },
  //   {
  //     name: "Investment",
  //     values: [
  //       { date: "2000", amount: "1000" },
  //       { date: "2001", amount: "1200" },
  //       { date: "2002", amount: "800" },
  //       { date: "2003", amount: "1200" },
  //       { date: "2004", amount: "1500" },
  //       { date: "2005", amount: "2000" },
  //     ],
  //   },
  // ];

  const width = 420;
  const height = 450;
  const margin = 75;
  const duration = 300;

  const lineOpacity = "1";
  const lineOpacityHover = "1";
  const otherLinesOpacityHover = "0.05";
  const lineStroke = "2px";
  const lineStrokeHover = "px";

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
        d.amount = +d.item.amount;
        values.push(d.item.amount);
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
      .on("mouseover", function (d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .style("fill", "#ffffff")
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 100);
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
        d3.select(this).transition().duration(duration).attr("r", circleRadius);
      });

    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .style("fill", "white")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "white");
  }
}
