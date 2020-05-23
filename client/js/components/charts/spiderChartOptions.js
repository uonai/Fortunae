const margin = { top: 50, right: 80, bottom: 100, left: 80 },
  width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

const spiderChartOptions = {
  w: 320,
  h: 320,
  margin: margin,
  levels: 1,
  roundStrokes: true,
  color: d3.scaleOrdinal().range(["#fff", "#fff"]),
  format: ".0f",
};

// Draw the chart, get a reference the created svg element :
let svg_radar1 = SpiderChart(".radarChart", spiderChartOptions);
