class ScatterZoom {
    constructor(tag) {
      console.log("scatter construct");
      var element = document.getElementById(tag)
      var bBox = element.getBoundingClientRect()

      const margin = 80;
      this.width = bBox.width - margin ;
      this.height = bBox.height - margin ;
      const padding = { top: 10, bottom: 40, left: 60, right: 20 };

      this.svg = d3
        .select("#"+tag)
        .attr("width", this.width + padding.right + padding.left)
        .attr("height", this.height + padding.top + padding.bottom);

      this.plotArea = this.svg
        .append("g")
        .attr(
          "transform",
          "translate(" + [padding.left, padding.top] + ")"
        );

      const clippingRect = this.plotArea
        .append("clipPath")
        .attr("id", "clippy")
        .append("rect")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("fill", "none");

      this.xAxis = this.plotArea
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate(" + [0, this.height] + ")");
      this.yAxis = this.plotArea.append("g").attr("id", "yAxis")
      this.yAxisLable= this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 )
      .attr("x",0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle");

      this.xAxisLable= this.svg.append("text")
      .attr("y",this.height+padding.bottom)
      .attr("x",this.width/2 + padding.left)
      .attr("dy", "1em")
      .style("text-anchor", "middle");
     
    }

    draw(data,xElement,yElement) {
    self = this
      const x = d3
        .scaleLinear()
        .range([0, this.width])
        .domain([
          0,
          d3.max(data, function (dd) {
            return dd[xElement];
          }),
        ]).nice();
      
      const y = d3.scaleLinear().range([this.height, 0]).domain([
          0,
          d3.max(data, function (dd) {
            return dd[yElement];
          }),
        ]).nice();
      

      const xAxis = d3.axisBottom(x);
      self.xAxis.call(xAxis);

      const yAxis = d3.axisLeft(y);
      self.yAxis.call(yAxis);

      self.yAxisLable.text(yElement)
      self.xAxisLable.text(xElement)

      const dots = self.plotArea
      .selectAll("circle")
      .data(data, function (d) {
        return d["id_person"];
      });
      dots
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d[xElement]);
        })
        .attr("cy", function (d) {
          return y(d[yElement]);
        })
        .attr("r", 2)
        .style("fill", "Red")
        .on("mouseover", function (d) {
          //console.log(this.__data__);
          d3.select(this)
            .attr("cursor", "pointer")
            .style("fill", "green")
            .attr("r", 6);
        })
        .on("mouseout", function (d) {
          d3.select(this)
            .attr("r", this.toggle ? 9 : 2)
            .style("fill", this.toggle ? "green" : "red");
        })
        .on("click", function (d) {
          this.toggle = !this.toggle; // declared variable setting it to true
          d3.select(this)
              .transition()
              .duration(1000)
              .attr("r", this.toggle ? 9 : 2)
              .style("fill", this.toggle ? "green" : "red");
          if (this.toggle) {
              personId = this.__data__.id_person
              getPersonData()
          } else {
              personId = ""
          }

      })
        .attr("clip-path", "url(#clippy)");

      dots
        .attr("cx", function (d) {
          return x(d[xElement]);
        })
        .attr("cy", function (d) {
          return y(d[yElement]);
        });



      var update = function (event) {
        let x2 = event.transform.rescaleX(x);
        self.xAxis.call(xAxis.scale(x2));
        let y2 = event.transform.rescaleY(y);
        self.yAxis.call(yAxis.scale(y2));
        self.plotArea
          .selectAll("circle")
          .attr("cx", function (d) {
            return x2(d[xElement]);
          })
          .attr("cy", function (d) {
            return y2(d[yElement]);
          });
      };

      const zoom = d3.zoom().on("zoom", function (event) {
        update(event);
      });
      this.svg.call(zoom);
    }
  }

  console.log("scatter called");