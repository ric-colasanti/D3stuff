class ScatterPlot {
    constructor(tag, width, height) {
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 },
            this.width = width - this.margin.left - this.margin.right,
            this.height = height - this.margin.top - this.margin.bottom;

            console.log(this.width,this.margin.left,this.margin.right);
            console.log(this.height,this.margin.top,this.margin.bottom);
      // set the ranges


        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        this.svg = d3.select(tag).append("svg")
        this.plotArea = this.svg.append("g")
            
        this.svg
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("style", "outline: thin solid black;");

      
        this.plotArea.attr(
            "transform",
            "translate(" + [this.margin.left, this.margin.top] + ")"
          );

        this.xAxis = this.svg.append("g")
        this.xAxis.attr(
            "transform",
            "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ")"
          )
        this.xBrush = this.xAxis.append("g")
        this.xBrush.attr("class", "brushX")    

        this.yAxis = this.svg.append("g")
        this.yAxis.attr(
            "transform", 
            "translate(" + this.margin.left + "," + this.margin.top + ")"
            )
        this.yBrush = this.yAxis.append("g")
        this.yBrush.attr("class", "brushY")

        const clippingRect = this.plotArea
        .append("clipPath")
        .attr("id", "clippy")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("fill", "none");

        this.brushY = d3
        .brushY()
        .extent([
        [- this.margin.left, 0],
          [0, this.height],
          
        ])

        this.brushX = d3
          .brushX()
          .extent([
            [0, 0],
            [this.width, this.height],
          ])

    }
    draw(data, xaxis, yaxis, color ,index="") {
        self = this
        var update = function(){
            self.xAxis.transition().duration(1000).call(d3.axisBottom(x))          
            self.yAxis.transition().duration(1000).call(d3.axisLeft(y))          
            self.plotArea.selectAll("circle")
            .transition().duration(1000)
            .attr("cx", function (d) {
              return x(d[xaxis]);
            })
            .attr("cy", function (d) {
              return y(d[yaxis]);
            })
          }
          var updateX= function (e) {
            if (e.selection!=null) {
              x.domain([ x.invert(e.selection[0]), x.invert(e.selection[1]) ])
              self.xAxis.select(".brushX").call(self.brushX.move, null);
              update()
            }
          };
          
        this.brushX.on("end", updateX);
        this.xBrush.call(this.brushX);
        
        var updateY= function (e) {
          if (e.selection!=null) {
            y.domain([  y.invert(e.selection[1]),y.invert(e.selection[0]), ])
            self.yAxis.select(".brushY").call(self.brushY.move, null);
            update()
          }
        };
  


        this.brushY.on("end", updateY);
        this.yBrush.call(this.brushY);


        
        let x = d3
        .scaleLinear()
        .range([0, this.width])
        .domain([
          0,
          d3.max(data, function (d) {
            return d.x;
          }),
        ])
        .nice();
      let y = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([
          0,
          d3.max(data, function (d) {
            return d.y;
          }),
        ])
        .nice();

        // append the rectangles for the bar chart
        var chart = this.plotArea.selectAll("circle")
        chart.data(data,function(d){return d[index]})
            .enter().append("circle")// new data
            .attr("cx", function (dd) { return x(dd[xaxis]); })
            .attr("cy", function (dd) { return y(dd[yaxis]); })
            .attr("r", 1)
            .style("fill", color)
            .on("click", function (d) {
                this.toggle = !this.toggle; // declared variable setting it to true
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("r", this.toggle ? 9 : 2)
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
            }).attr("clip-path", "url(#clippy)");;;
        chart.attr("cx", function (dd) { return x(dd[xaxis]); }) // current data
            .attr("cy", function (dd) { return y(dd[yaxis]); })
        // add the x Axis
        .attr("clip-path", "url(#clippy)");;
        chart.exit().remove() // remove data

        this.xAxis
        .call(d3.axisBottom(x)).on("dblclick",function(d){ x.domain([
            0,
            d3.max(data, function (d) {
              return d.x;
            }),
          ])
          .nice(); update()});

        // add the y Axis
        this.yAxis
        .call(d3.axisLeft(y)).on("dblclick",function(d){ y.domain([0,
            d3.max(data, function (d) {
              return d.y;
            })
          ])
          .nice(); update()});

    }
}