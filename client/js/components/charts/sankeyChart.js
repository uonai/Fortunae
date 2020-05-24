/* globals d3 */
const container = d3.select(".container");

// BEGIN NODE ALGORITHSM
const data = JSON.parse(localStorage.getItem("items"));
console.log(data);
incomeSources = [];
expenseSources = [];
savingSources = [];

data.forEach((item) => {
  if (item.category == "4") {
    incomeSources.push(item);
  } else if (item.category == "2" && item.type !== "Savings") {
    console.log(item);
    expenseSources.push(item);
  } else if (item.category == "2" && item.type == "Savings") {
    console.log(item);
    savingSources.push(item);
  }
});

nodes = [];
incomeSources.forEach((item) => {
  nodes.push({ name: item.title });
});

nodes.push({ name: "Income" }, { name: "Expenses" });
if (savingSources.length) {
  nodes.push({ name: "Savings" });
}

expenseSources.forEach((item) => {
  nodes.push({ name: item.title });
});

savingSources.forEach((item) => {
  nodes.push({ name: item.title });
});

links = [];
totalIncome = [];
incomeSources.forEach((item, index) => {
  links.push({
    source: index,
    target: incomeSources.length,
    value: Number(item.amount),
  });
  totalIncome.push(Number(item.amount));
});

links.push({
  source: incomeSources.length,
  target: incomeSources.length + 1,
  value: totalIncome.reduce((a, b) => a + b, 0),
});

totalSavings = [];
if (savingSources.length) {
  savingSources.forEach((item) => {
    totalSavings.push(Number(item.amount));
  });
  links.push({
    source: incomeSources.length,
    target: incomeSources.length + 2,
    value: totalSavings.reduce((a, b) => a + b, 0),
  });
}

const expenseStartingPoint = links.length;
expenseSources.forEach((item, index) => {
  links.push({
    source: expenseStartingPoint - 1,
    target: index + 1 + expenseStartingPoint,
    value: Number(item.amount),
  });
});

const savingsStartingPoint = links.length;
savingSources.forEach((item, index) => {
  links.push({
    source: incomeSources.length + 2,
    target: index + 1 + savingsStartingPoint,
    value: Number(item.amount),
  });
});

// END NODE ALGORITHM

const sampleData = {
  nodes,
  links,
  // FOR REFERENCE
  // nodes: [
  //   { name: "Wages" },
  // ],
  // links: [
  //   { source: 0, target: 4, value: 24111.53 },
  // ],
};
const tooltip = container.append("div").attr("id", "tooltip");

// SVG frame
// the same margin, width and height are used for both visualizations
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 40,
};

const width = 580 + (margin.left + margin.right);
const height = 500 + (margin.top + margin.bottom);

const containerFrame = container
  .append("svg")
  .attr(
    "viewBox",
    `0 0 ${width + (margin.left + margin.right)} ${
      height + (margin.top + margin.bottom)
    }`
  )
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

createSankeyDiagram(sampleData, containerFrame);
// function creating the sankey diagram, based on an input data and frame (in which the visualization is plotted)
function createSankeyDiagram(sampleData, frame) {
  // detail a color scale
  var COLORS = ["#fff"];
  const color = d3.scaleOrdinal(COLORS);

  // detail the sankey function
  const sankey = d3
    .sankey()
    // limit the nodes and links within the containing group
    .extent([
      [0, 0],
      [width, height],
    ]);

  // destructure the two arrays for the nodes and links in two variables
  const { nodes, links } = sankey(sampleData);

  // detail a generator function for the links
  const sankeyLinks = d3.sankeyLinkHorizontal();

  // append a path element for each link
  // using the generator function
  frame
    .selectAll("path.link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", sankeyLinks)
    .attr("fill", "none")
    // stroke using the gradient
    .attr("stroke", (d) => "#fff")
    // stroke width based on the width of each data point
    .attr("stroke-width", (d) => "3px")
    // alter the opacity on hover
    // detail also the data through a simple tooltip
    .attr("opacity", 1)
    .on("mouseenter", function (d) {
      d3.select(this).transition().attr("opacity", 0.2);

      tooltip
        .append("p")
        .html(
          `<strong>${d.source.name}</strong> - <strong>${d.target.name}</strong>`
        );

      tooltip.append("p").html(`Value: <strong>${d.value}</strong>`);

      tooltip.style("opacity", 1).style("left", `200px`).style("top", `200px`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().attr("opacity", 1);

      tooltip.style("opacity", 0).selectAll("p").remove();
    });

  // append a rectangle for each node
  // using the fabricated values and the color based on the index
  frame
    .selectAll("rect.node")
    .data(nodes)
    .enter()
    .append("rect")
    .attr("class", "node")
    .attr("x", (d) => d.x0 + 10)
    .attr("y", (d) => d.y0)
    .attr("width", 4)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("pointer-events", "none")
    .attr("fill", (d) => color(d.index));

  // for each node append also a text element, detailing the respective value
  // horizontally position the text after or before the rectangle elements for each node
  frame
    .selectAll("text.node")
    .data(nodes)
    .enter()
    .append("text")
    .text((d) => d.name)
    .attr("font-size", "16")
    .attr("fill", "#fff")
    .attr("class", "tick")
    .attr("x", (d) => {
      if (d.sourceLinks.length > 0) {
        return d.x0 + sankey.nodeWidth() + 10;
      }
      return d.x0 - 5;
    })
    .attr("y", (d) => (d.y1 + d.y0) / 2)
    .attr("pointer-events", "none")
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", (d) => (d.sourceLinks.length > 0 ? "start" : "end"));
}
