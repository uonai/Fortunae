// Item Class: Represents an item

class Item {
  constructor(id, title, amount) {
    this.id = id;
    this.title = title;
    this.amount = amount;
  }
}

class Helper {
  static generateUUIDv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
// UI Class: Handles UI Tasks

class UI {
  static displayItems() {
    const items = Store.getItems();
    console.log(items);
    UI.addButtonToSection();
    UI.addChartToSection();
    if (items.length) {
      items.forEach((item) => UI.addItemToList(item));
    }
  }

  static addItemToList(item) {
    const list = document.querySelector("#item-list");

    const listItem = document.createElement("li");
    listItem.className = item.id;

    listItem.innerHTML = `
    <span>${item.title}</span>: $<span>${item.amount}</span>
    <a="#" class="delete">X</a>
    `;
    list.appendChild(listItem);
  }

  static addButtonToSection() {
    const section = document.querySelector(".section-container");
    const sectionAddButton = document.createElement("button");
    sectionAddButton.innerHTML = "Add Fund [+]";
    section.appendChild(sectionAddButton);
  }

  static addChartToSection() {
    const section = document.querySelector(".section-container");
    const sectionAddChart = document.createElement("div");
    sectionAddChart.className = "rectangle";
    sectionAddChart.innerHTML = `<div class="inner-rectangle"></div>`;
    section.appendChild(sectionAddChart);
  }

  static deleteItem(el) {
    if (el.classList.contains("delete")) {
      console.log("test");
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#amount").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".form-container");
    const form = document.querySelector("#item-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
}

// Store Class: Handles Storage

class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    console.log(items);
    return items;
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(id) {
    const items = Store.getItems();

    items.forEach((item, index) => {
      if (item.id === id) {
        items.splice(index, 1);
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  }
}

// Event: Display Items
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an Item
document.querySelector("#item-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const amount = document.querySelector("#amount").value;

  // Validation

  if (title === "" || amount === "") {
    UI.showAlert("Please fill out all form fields.", "error");
  } else {
    // Instantiate item
    const id = Helper.generateUUIDv4();
    console.log(id);
    const item = new Item(id, title, amount);
    UI.addItemToList(item);
    Store.addItem(item);
    UI.clearFields();
    console.log(item);
  }
});

// Event: Remove an Item
document.querySelector("#item-list").addEventListener("click", (e) => {
  Store.removeItem(e.target.parentElement.className);
  UI.deleteItem(e.target);
});

// Chart

var myData =
  "date	New York	San Francisco	Austin\n\
20111001	63.4	62.7	72.2\n\
20111002	58.0	59.9	67.7\n\
20111003	53.3	59.1	69.4\n\
20111004	55.7	58.8	68.0\n\
20111005	64.2	58.7	72.4\n\
20111006	58.8	57.0	77.0\n\
20111007	57.9	56.7	82.3\n\
20111008	61.8	56.8	78.9\n\
20111009	69.3	56.7	68.8\n\
20111010	71.2	60.1	68.7\n\
20111011	68.7	61.1	70.3\n\
20111012	61.8	61.5	75.3\n\
20111013	63.0	64.3	76.6\n\
20111014	66.9	67.1	66.6\n\
20111015	61.7	64.6	68.0\n\
20111016	61.8	61.6	70.6\n\
20111017	62.8	61.1	71.1\n\
20111018	60.8	59.2	70.0\n\
20111019	62.1	58.9	61.6\n\
20111020	65.1	57.2	57.4\n\
20111021	55.6	56.4	64.3\n\
20111022	54.4	60.7	72.4\n";

var margin = {
  top: 20,
  right: 80,
  bottom: 30,
  left: 50,
};

var w = 900 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;

var parseDate = d3.timeParse("%Y%m%d");

var scaleX = d3.scaleTime().range([0, w]);

var scaleY = d3.scaleLinear().range([h, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom().scale(scaleX);

var yAxis = d3.axisLeft().scale(scaleY);

var line = d3
  .line()
  .x(function (d) {
    return scaleX(d.date);
  })
  .y(function (d) {
    return scaleY(d.temperature);
  })
  .curve(d3.curveBasis);

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  // .style("background-color","lightGreen")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = d3.tsvParse(myData);
console.log("data is", data);

color.domain(
  d3.keys(data[0]).filter(function (key) {
    console.log("key", key);
    return key !== "date";
  })
);

data.forEach(function (d) {
  d.date = parseDate(d.date);
});

var cities = color.domain().map(function (name) {
  return {
    name: name,
    values: data.map(function (d) {
      return {
        date: d.date,
        temperature: +d[name],
      };
    }),
  };
});

scaleX.domain(
  d3.extent(data, function (d) {
    return d.date;
  })
);
scaleY.domain([
  d3.min(cities, function (c) {
    return d3.min(c.values, function (v) {
      return v.temperature;
    });
  }),
  d3.max(cities, function (c) {
    return d3.max(c.values, function (v) {
      return v.temperature;
    });
  }),
]);

console.log("cities", cities);

var legend = svg
  .selectAll("g")
  .data(cities)
  .enter()
  .append("g")
  .attr("class", "legend");

legend
  .append("rect")
  .attr("x", w - 20)
  .attr("y", function (d, i) {
    return i * 20;
  })
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function (d) {
    return color(d.name);
  });

legend
  .append("text")
  .attr("x", w - 8)
  .attr("y", function (d, i) {
    return i * 20 + 9;
  })
  .text(function (d) {
    return d.name;
  });

svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .style("fill", "black")
  .text("Temperature (ºF)");

var city = svg
  .selectAll(".city")
  .data(cities)
  .enter()
  .append("g")
  .attr("class", "city");

city
  .append("path")
  .attr("class", "line")
  .attr("d", function (d) {
    return line(d.values);
  })
  .style("stroke", function (d) {
    return color(d.name);
  });

city
  .append("text")
  .datum(function (d) {
    return {
      name: d.name,
      value: d.values[d.values.length - 1],
    };
  })
  .attr("transform", function (d) {
    return (
      "translate(" +
      scaleX(d.value.date) +
      "," +
      scaleY(d.value.temperature) +
      ")"
    );
  })
  .attr("x", 3)
  .attr("dy", ".35")
  .text(function (d) {
    return d.name;
  });

var mouseG = svg
  .append("g") // this the black vertical line to folow mouse
  .attr("class", "mouse-over-effects");

mouseG
  .append("path")
  .attr("class", "mouse-line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", "0");

var lines = document.getElementsByClassName("line");
var mousePerLine = mouseG
  .selectAll(".mouse-per-line")
  .data(cities)
  .enter()
  .append("g")
  .attr("class", "mouse-per-line");

mousePerLine
  .append("circle")
  .attr("r", 7)
  .style("stroke", function (d) {
    return color(d.name);
  })
  .style("fill", "none")
  .style("stroke-width", "1px")
  .style("opacity", "0");

mousePerLine.append("text").attr("transform", "translate(10,3)");

mouseG
  .append("rect")
  .attr("width", w)
  .attr("height", h)
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("mouseout", function () {
    d3.select(".mouse-line").style("opacity", "0");
    d3.selectAll(".mouse-per-line circle").style("opacity", "0");
    d3.selectAll(".mouse-per-line text").style("opacity", "0");
  })
  .on("mouseover", function () {
    d3.select(".mouse-line").style("opacity", "1");
    d3.selectAll(".mouse-per-line circle").style("opacity", "1");
    d3.selectAll(".mouse-per-line text").style("opacity", "1");
  })
  .on("mousemove", function () {
    var mouse = d3.mouse(this);
    console.log("Mouse:", mouse);
    d3.select(".mouse-line").attr("d", function () {
      var d = "M" + mouse[0] + "," + h;
      d += " " + mouse[0] + "," + 0;
      return d;
    });
    // .attr("d",function(){
    //   var d = "M" + w +"," + mouse[1];
    //   d+=" " +0 + "," + mouse[1];
    //   return d;
    // });

    d3.selectAll(".mouse-per-line").attr("transform", function (d, i) {
      console.log(w / mouse[0]);
      var xDate = scaleX.invert(mouse[0]),
        bisect = d3.bisector(function (d) {
          return d.date;
        }).right;
      idx = bisect(d.values, xDate);
      console.log("xDate:", xDate);
      console.log("bisect", bisect);
      console.log("idx:", idx);

      var beginning = 0,
        end = lines[i].getTotalLength(),
        target = null;

      console.log("end", end);

      while (true) {
        target = Math.floor((beginning + end) / 2);
        console.log("Target:", target);
        pos = lines[i].getPointAtLength(target);
        console.log("Position", pos.y);
        console.log("What is the position here:", pos);
        if ((target === end || target == beginning) && pos.x !== mouse[0]) {
          break;
        }

        if (pos.x > mouse[0]) end = target;
        else if (pos.x < mouse[0]) beginning = target;
        else break; // position found
      }
      d3.select(this)
        .select("text")
        .text(scaleY.invert(pos.y).toFixed(1))
        .attr("fill", function (d) {
          return color(d.name);
        });
      return "translate(" + mouse[0] + "," + pos.y + ")";
    });
  });

// original graph: https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91
