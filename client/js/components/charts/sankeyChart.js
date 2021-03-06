import Language from "../../utils/language.js";
const foregroundColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--foreground-color");

const container = d3.select(".container");

const locale = JSON.parse(localStorage.getItem("language"));
const expenseCategories = Language.getTerminology("expense", "categories");
const incomeCategories = Language.getTerminology("income", "categories");
const expensesTerminology = Language.getTerminology("expense", "title");
const savingsTerminology = Language.getTerminology("expense", "savings");
const incomesTerminology = Language.getTerminology("income", "title");
const totalTerminology = Language.getTerminology("general", "total");

console.log(incomeCategories);
d3.timeFormatDefaultLocale(locale.time);

// BEGIN NODE ALGORITHSM
const data = JSON.parse(localStorage.getItem("items"));
console.log(data);
const incomeSources = [];
const expenseSources = [];
const savingSources = [];

data.forEach((item) => {
  if (item.category == "4") {
    incomeSources.push(item);
  } else if (item.category == "2" && item.type !== "savings") {
    console.log(item);
    expenseSources.push(item);
  } else if (item.category == "2" && item.type == "savings") {
    console.log(item);
    savingSources.push(item);
  }
});

// EXPENSE ROLLUP

let groupOfItems = expenseSources.reduce((x, a) => {
  console.log("a", a);
  console.log("x", x);
  x[a.type] = [...(x[a.type] || []), a];
  return x;
}, {});
// console.log(groupOfItems);

let expenseCategoryRollup = [];
for (let type of Object.keys(groupOfItems)) {
  const numbers = [];
  const items = groupOfItems[type];

  items.forEach((item) => {
    numbers.push(Number(item.amount));
    console.log(item.type);
  });

  const numbersTotal = numbers.reduce((a, b) => a + b, 0);

  let expenseTypeTerminology = "";
  Object.keys(expenseCategories).forEach((key) => {
    if (key == type) {
      const x = expenseCategories[key];
      console.log(x);
      expenseTypeTerminology = x;
    }
  });
  expenseCategoryRollup.push({
    type: expenseTypeTerminology,
    amount: numbersTotal,
  });
}

// END EXPENSE ROLLUP

// SAVINGS ROLLUP (THIS SHOULD BE MERGED WITH ABOVE CODE INTO A REUSABLE FUNCTION)

let groupOfSavingItems = savingSources.reduce((x, a) => {
  console.log("a", a);
  console.log("x", x);
  x[a.type] = [...(x[a.type] || []), a];
  return x;
}, {});
console.log(groupOfSavingItems);

let savingCategoryRollup = [];
for (let type of Object.keys(groupOfSavingItems)) {
  const numbers = [];
  const items = groupOfSavingItems[type];

  items.forEach((item) => {
    numbers.push(Number(item.amount));
    console.log(item.type);
  });

  const numbersTotal = numbers.reduce((a, b) => a + b, 0);

  let savingsTypeTerminology = "";
  Object.keys(expenseCategories).forEach((key) => {
    if (key == type) {
      const x = expenseCategories[key];
      console.log(x);
      savingsTypeTerminology = x;
    }
  });

  savingCategoryRollup.push({
    type: savingsTypeTerminology,
    amount: numbersTotal,
  });
}

// END SAVINGS ROLLUP

const nodes = [];
incomeSources.forEach((item) => {
  nodes.push({ name: item.title });
});

nodes.push({ name: incomesTerminology }, { name: expensesTerminology });
if (savingCategoryRollup.length) {
  nodes.push({ name: savingsTerminology });
}

expenseCategoryRollup.forEach((item) => {
  nodes.push({ name: item.type });
});

savingCategoryRollup.forEach((item) => {
  nodes.push({ name: item.type });
});

const links = [];
const totalIncome = [];
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

const totalSavings = [];
if (savingCategoryRollup.length) {
  savingCategoryRollup.forEach((item) => {
    totalSavings.push(Number(item.amount));
  });
  links.push({
    source: incomeSources.length,
    target: incomeSources.length + 2,
    value: totalSavings.reduce((a, b) => a + b, 0),
  });
}

const expenseStartingPoint = links.length;
expenseCategoryRollup.forEach((item, index) => {
  if (totalSavings.length) {
    links.push({
      source: expenseStartingPoint - 1,
      target: index + 1 + expenseStartingPoint,
      value: Number(item.amount),
    });
  } else {
    links.push({
      source: expenseStartingPoint,
      target: index + 1 + expenseStartingPoint,
      value: Number(item.amount),
    });
  }
});

const savingsStartingPoint = links.length;
savingCategoryRollup.forEach((item, index) => {
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

function createSankeyDiagram(sampleData, frame) {
  var COLORS = [foregroundColor];
  const color = d3.scaleOrdinal(COLORS);

  const sankey = d3.sankey().extent([
    [0, 0],
    [width, height],
  ]);

  const { nodes, links } = sankey(sampleData);

  const sankeyLinks = d3.sankeyLinkHorizontal();

  frame
    .selectAll("path.link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", sankeyLinks)
    .attr("opacity", 1)
    .on("mouseenter", function (d) {
      d3.select(this).transition().attr("opacity", 0.1);

      tooltip
        .append("p")
        .html(
          `<strong>${d.source.name}</strong> - <strong>${d.target.name}</strong>`
        );

      tooltip
        .append("p")
        .html(`${totalTerminology}: <strong>${d.value}</strong>`);

      tooltip.style("opacity", 1).style("left", `200px`).style("top", `200px`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().attr("opacity", 1);

      tooltip.style("opacity", 0).selectAll("p").remove();
    });

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

  frame
    .selectAll("text.node")
    .data(nodes)
    .enter()
    .append("text")
    .text((d) => d.name)
    .attr("font-size", "16")
    .attr("fill", foregroundColor)
    .attr("class", "tick-sankey")
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
