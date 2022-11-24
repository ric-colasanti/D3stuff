let dimensions = {
    width: 400,
    height: 500,
    margins: 50,
  };

var display = function (d, data) {
    var htmlString = "<p>ID: " + data[d][0] + "</p>";
    for (let i = 1; i < data[d].length; i++) {
        htmlString += "<p>Val" + i + ": " + data[d][i] + "</p>";
    }
    document.getElementById("output").innerHTML = htmlString;
};


var update = function (data) {
   
    const xAccessor = (d) => d[xAxis]
    const yAccessor = (d) => d[yAxis]
    
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.containerHeight-10, 10])
    
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([10, dimensions.containerWidth-10])

    const xAxisL = d3.axisBottom(xScale)

    svg.select("#area")
    .call(xAxisL)
    .attr(
    "transform",
    `translate(${dimensions.margins}, ${dimensions.margins})`
    );

    svg
        .selectAll("circle")
        .data(data, (d) => d["id_person"])
        .join(
            (enter) =>
                enter
                    .append("circle")
                    .attr("cx", d => xScale(xAccessor(d)))
                    .attr("cy", d => yScale(yAccessor(d)))
                    .attr("r", 3)
                    .style("fill", "Red")
                    .on("click", function (d) {
                        this.toggle = !this.toggle; // declared variable setting it to true
                        d3.select(this)
                            .transition()
                            .duration(1000)
                            .attr("r", this.toggle ? 9 : 3)
                            .style("fill", this.toggle ? "green" : "red");
                        if (this.toggle) {
                            personId = this.__data__.id_person
                            getPersonData()
                        } else {
                            personId = ""
                        }

                    })
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("cursor", "pointer")
                            .attr("r", 6)
                            .style("fill", "green");
                        if (this.toggle) {
                            console.log(this);
                        }
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("r", this.toggle ? 9 : 3)
                            .style("fill", this.toggle ? "green" : "red");
                    }),
            (update) =>
                update
                .attr("cx", d => xScale(xAccessor(d)))
                .attr("cy", d => yScale(yAccessor(d))),
            (exit) => exit.remove()
        );
};





dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
dimensions.containerHeight = dimensions.height - dimensions.margins * 2;



// Scales


const svg = d3.select("#plot")
.attr("width", dimensions.width)
.attr("height", dimensions.height)
.append("svg").append("g").attr("id","area")
;