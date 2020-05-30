import Language from "../../utils/language.js";

const foregroundColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--foreground-color");

const max = Math.max;
const sin = Math.sin;
const cos = Math.cos;
const HALF_PI = Math.PI / 2;

const removeDuplicates = (itemDates) => {
  return itemDates.filter((a, b) => itemDates.indexOf(a) === b);
};
let spider_chart = SpiderChart(".spider-chart");
function SpiderChart(parent_selector, options) {
  // var data = [
  //   {
  //     name: "Feb",
  //     axes: [
  //       { axis: "Misc Expenses", value: 42 },
  //       { axis: "Shopping", value: 20 },
  //       { axis: "Personal Care", value: 60 },
  //       { axis: "Food", value: 26 },
  //       { axis: "Auto & Transport", value: 35 },
  //       { axis: "Bills & Utilities", value: 20 },
  //       { axis: "Savings", value: 20 },
  //     ],
  //   },
  //   {
  //     name: "Jan",
  //     axes: [
  //       { axis: "Misc Expenses", value: 50 },
  //       { axis: "Shopping", value: 45 },
  //       { axis: "Personal Care", value: 20 },
  //       { axis: "Food", value: 20 },
  //       { axis: "Auto & Transport", value: 20 },
  //       { axis: "Bills & Utilities", value: 25 },
  //       { axis: "Savings", value: 23 },
  //     ],
  //   },
  // ];

  const locale = JSON.parse(localStorage.getItem("language"));
  const expenseCategories = Language.getTerminology("expense", "categories");
  d3.timeFormatDefaultLocale(locale.time);

  const items = JSON.parse(localStorage.getItem("items"));
  console.log(items);
  const expenseSources = [];

  items.forEach((item) => {
    if (item.category == "2") {
      expenseSources.push(item);
    }
  });

  let groupOfItems = expenseSources.reduce((x, a) => {
    x[a.type] = [...(x[a.type] || []), a];
    return x;
  }, {});

  let categoryRollup = [];
  for (let category of Object.keys(groupOfItems)) {
    const numbers = [];
    const items = groupOfItems[category];

    items.forEach((item) => {
      numbers.push(Number(item.amount));
    });

    const numbersTotal = numbers.reduce((a, b) => a + b, 0);

    let expenseTypeTerminology = "";
    Object.keys(expenseCategories).forEach((key) => {
      if (key == category) {
        const x = expenseCategories[key];
        console.log(x);
        expenseTypeTerminology = x;
      }
    });

    categoryRollup.push({ type: expenseTypeTerminology, amount: numbersTotal });
  }

  const data1 = categoryRollup;
  console.log(data1);
  let itemDates = [];
  data1.forEach((item) => {
    itemDates.push(item.date);
  });
  let itemDatesFiltered = removeDuplicates(itemDates);

  let filteredData = [];
  let numbersArray = [];
  itemDatesFiltered.forEach((date) => {
    const keys = Object.entries(data1);
    let array = [];

    for (const key of keys) {
      numbersArray.push(key[1].amount);
      if (key[1].date == date) {
        array.push({
          axis: key[1].type,
          value: key[1].amount,
        });
      }
    }
    filteredData.push({ name: date, axes: array });
  });
  var data = filteredData;
  var maxNumber = Math.max(...numbersArray);

  const wrap = (text, width) => {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }; //wrap

  const cfg = {
    w: 320, //Width of the circle
    h: 320, //Height of the circle
    margin: { top: 50, right: 80, bottom: 100, left: 80 }, //The margins of the SVG
    levels: 1, //How many levels or inner circles should there be drawn
    maxValue: maxNumber, //What is the value that the biggest circle will represent
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: true, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scaleOrdinal().range([foregroundColor, foregroundColor]), //Color function,
    format: ".0f",
    unit: "",
    legend: true,
  };

  if ("undefined" !== typeof options) {
    for (var i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    }
  }

  let maxValue = 0;
  for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data[j].axes.length; i++) {
      data[j].axes[i]["id"] = data[j].name;
      if (data[j].axes[i]["value"] > maxValue) {
        maxValue = data[j].axes[i]["value"];
      }
    }
  }
  maxValue = max(cfg.maxValue, maxValue);

  const allAxis = data[0].axes.map((i, j) => i.axis),
    total = allAxis.length,
    radius = Math.min(cfg.w / 2, cfg.h / 2),
    Format = d3.format(cfg.format),
    angleSlice = (Math.PI * 2) / total;

  const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

  const parent = d3.select(parent_selector);

  parent.select("svg").remove();

  let svg = parent
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar");

  //Append a g element
  let g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (cfg.w / 2 + cfg.margin.left) +
        "," +
        (cfg.h / 2 + cfg.margin.top) +
        ")"
    );

  let axisGrid = g.append("g").attr("class", "axisWrapper");

  axisGrid;

  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");

  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr(
      "x2",
      (d, i) => rScale(maxValue * 1.1) * cos(angleSlice * i - HALF_PI)
    )
    .attr(
      "y2",
      (d, i) => rScale(maxValue * 1.1) * sin(angleSlice * i - HALF_PI)
    )
    .attr("class", "line")
    .style("stroke", foregroundColor)
    .style("stroke-width", "2px");

  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "10px")
    .attr("text-anchor", "middle")
    .style("fill", foregroundColor)

    .attr("dy", "0.35em")
    .attr(
      "x",
      (d, i) =>
        rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI)
    )
    .attr(
      "y",
      (d, i) =>
        rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI)
    )
    .text((d) => d)
    .call(wrap, cfg.wrapWidth);

  const radarLine = d3
    .radialLine()
    .curve(d3.curveLinearClosed)
    .radius((d) => rScale(d.value))
    .angle((d, i) => i * angleSlice);

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
  }

  const blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", (d) => radarLine(d.axes))
    .style("fill", (d, i) => cfg.color(i))
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function (d, i) {
      parent
        .selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", 0);
      d3.select(this).transition().duration(200).style("fill-opacity", 0);
    })
    .on("mouseout", () => {
      parent
        .selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  //Append the circles
  blobWrapper
    .selectAll(".radarCircle")
    .data((d) => d.axes)
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", (d, i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
    .attr("cy", (d, i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
    .style("fill", (d) => cfg.color(d.id))
    .style("fill-opacity", 1);

  //Wrapper for the invisible circles on top
  const blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data((d) => d.axes)
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius * 1.5)
    .attr("cx", (d, i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
    .attr("cy", (d, i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function (d, i) {
      tooltip
        .attr("x", this.cx.baseVal.value - 10)
        .attr("y", this.cy.baseVal.value - 10)
        .transition()
        .style("display", "block")
        .text(Format(d.value) + cfg.unit);
    })
    .on("mouseout", function () {
      tooltip.transition().style("display", "none").text("");
    });

  const tooltip = g
    .append("text")
    .attr("class", "tooltip")
    .attr("x", 0)
    .attr("y", 0)
    .style("font-size", "12px")
    .style("display", "none")
    .attr("text-anchor", "middle")
    .style("fill", foregroundColor)
    .attr("dy", "0.35em");

  if (cfg.legend !== false && typeof cfg.legend === "object") {
    let legendZone = svg.append("g");
    let names = data.map((el) => el.name);
    if (cfg.legend.title) {
      let title = legendZone
        .append("text")
        .attr("class", "title")
        .attr(
          "transform",
          `translate(${cfg.legend.translateX},${cfg.legend.translateY})`
        )
        .attr("x", cfg.w - 70)
        .attr("y", 10)
        .attr("font-size", "12px")
        .attr("fill", "red")
        .text(cfg.legend.title);
    }
    let legend = legendZone
      .append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 200)
      .attr(
        "transform",
        `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`
      );
    // Create rectangles markers
    legend
      .selectAll("rect")
      .data(names)
      .enter()
      .append("rect")
      .attr("x", 50)
      .attr("y", 50)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", foregroundColor)
      .attr("stroke", foregroundColor);
    // Create labels
    legend
      .selectAll("text")
      .data(names)
      .enter()
      .append("text")
      .attr("x", cfg.w - 52)
      .attr("y", (d, i) => i * 20 + 9)
      .attr("font-size", "10px")
      .attr("fill", foregroundColor)
      .attr("stroke", foregroundColor)
      .text((d) => d);
  }
  return svg;
}
