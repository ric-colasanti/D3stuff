class BarChart {
  constructor(tag, width, height) {
    this.margin = { top: 20, right: 20, bottom: 30, left: 40 },
      this.width = width - this.margin.left - this.margin.right,
      this.height = height - this.margin.top - this.margin.bottom;

    // set the ranges


    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.svg = d3.select(tag).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")")

    this.xAxis = this.svg.append("g").attr("id", "xAxis")
    this.yAxis = this.svg.append("g").attr("id", "yAxis")
  }


  draw(data, name, value,color, max= d3.max(data, function(d){return d["val"]})) {
    console.log(this.height);
    var xx = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);
    var yy = d3.scaleLinear()
      .range([this.height, 0]);
    // Scale the range of the data in the domains
    xx.domain(data.map(function (dd) { return dd[name]; }));
    yy.domain([0, d3.max(data, function (dd) { return max })]);
    var height = this.height

    // append the rectangles for the bar chart
    var chart = this.svg.selectAll(".bar")
    chart.data(data)  // Newdata
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", color)
      .attr("x", function (dd) { return xx(dd[name]); })
      .attr("width", xx.bandwidth())
      .attr("y", function (dd) { return yy(dd[value]); })
      .attr("height", function (dd) { return height - yy(dd[value]) });


    chart.attr("x", function (dd) { return xx(dd[0]); }) // current data
      .attr("width", xx.bandwidth())
      .attr("y", function (dd) { return yy(dd[name]); })
      .attr("height", function (dd) { return height - yy(dd[value]) });
    // add the x Axis
    chart.exit().remove() // remove data

    this.xAxis
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xx));

    // add the y Axis
    this.yAxis.call(d3.axisLeft(yy));

  }


}