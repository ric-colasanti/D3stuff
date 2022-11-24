class ScatterPlot {
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
    draw(data, xaxis, yaxis, color ,index="") {
        console.log(this.height);
        var xx = d3.scaleLinear()
            .range([0, this.width])
        var yy = d3.scaleLinear()
            .range([this.height, 0]);

        xx.domain([0, d3.max(data, function (d) { return d[xaxis] })]);
        yy.domain([0, d3.max(data, function (d) { return d[yaxis] })]);
        var height = this.height

        // append the rectangles for the bar chart
        var chart = this.svg.selectAll("circle")
        chart.data(data,function(d){return d[index]})
            .enter().append("circle")
            .attr("cx", function (dd) { return xx(dd[xaxis]); })
            .attr("cy", function (dd) { return yy(dd[yaxis]); })
            .attr("r", 3)
            .style("fill", color)
            .on("click", function (d) {
                this.toggle = !this.toggle; // declared variable setting it to true
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", this.toggle ? 9 : 3)
                if (this.toggle) {
                    console.log(this.__data__[xaxis],this.__data__[yaxis],this.__data__[index])
                }
            })
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("cursor", "pointer")
                    .attr("r", 6)
    
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("r", this.toggle ? 9 : 3)
            });
        chart.attr("cx", function (dd) { return xx(dd[xaxis]); })
            .attr("cy", function (dd) { return yy(dd[yaxis]); });
        // add the x Axis
        chart.exit().remove()

        this.xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xx));

        // add the y Axis
        this.yAxis.call(d3.axisLeft(yy));

    }
}