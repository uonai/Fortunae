import Language from "../../utils/language.js";

const foregroundColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--foreground-color");

const result = JSON.parse(localStorage.getItem("category3ItemsHistorical"));
const locale = JSON.parse(localStorage.getItem("language"));
const headers = Language.getTerminology("debt", "categories");
d3.timeFormatDefaultLocale(locale.time);

const reduceItems = (itemType) => {
  console.log(itemType);
  let groupOfItems = itemType.reduce((x, a) => {
    x[a.date] = [...(x[a.date] || []), a];
    return x;
  }, {});

  let categoryRollup = [];
  for (let date of Object.keys(groupOfItems)) {
    const numbers = [];
    const items = groupOfItems[date];

    items.forEach((item) => {
      numbers.push(Number(item.item.amount));
      console.log(item.item.amount);
    });

    console.log(numbers);

    const numbersTotal = numbers.reduce((a, b) => a + b, 0);
    console.log(numbersTotal);
    categoryRollup.push({ date: date, amount: numbersTotal });
  }

  console.log(categoryRollup);
  return categoryRollup;
};

if (result) {
  const securedItems = [];
  const unsecuredItems = [];
  const revolvingItems = [];
  const nonRevolvingItems = [];

  result.forEach((item) => {
    if (item.item.type == "secured") {
      securedItems.push(item);
    }
    if (item.item.type == "unsecured") {
      unsecuredItems.push(item);
    }
    if (item.item.type == "revolving") {
      revolvingItems.push(item);
    }
    if (item.item.type == "nonRevolving") {
      nonRevolvingItems.push(item);
    }
  });

  console.log(securedItems);
  console.log(unsecuredItems);
  console.log(revolvingItems);
  console.log(nonRevolvingItems);

  const db = reduceItems(securedItems);
  const db2 = reduceItems(unsecuredItems);
  const db3 = reduceItems(revolvingItems);
  const db4 = reduceItems(nonRevolvingItems);

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

  // const data = [
  //   {
  //     name: "Checking",
  //     values: [
  //       { date: "2000", amount: "2000" },
  //       { date: "2001", amount: "2200" },
  //     ],
  //   },
  //   {
  //     name: "Savings",
  //     values: [
  //       { date: "2000", amount: "3000" },
  //       { date: "2001", amount: "3500" },
  //   },
  //   {
  //     name: "Investment",
  //     values: [
  //       { date: "2000", amount: "1000" },
  //       { date: "2001", amount: "1200" },
  //     ],
  //   },
  // ];

  const width = 420;
  const height = 450;
  const margin = 75;
  const duration = 300;

  const lineOpacity = "1";
  const lineOpacityHover = "0.1";
  const otherLinesOpacityHover = "0.5";
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
        console.log(d);
        d.amount = +d.amount;
        values.push(d.amount);
      });
    });
    /* Scale */
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.date))
      .range([0, width - margin]);
    console.log(data);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...values)])
      .range([height - margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeGreys);

    /* Add SVG */
    const svg = d3
      .select("#lineChild")
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
          .style("fill", foregroundColor)
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
          .style("fill", foregroundColor)
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
      .style("fill", foregroundColor)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .style("background-color", foregroundColor)
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
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)");
  }
}
