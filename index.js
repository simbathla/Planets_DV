console.log("bla bla");

d3.csv("planetEE.csv").then(data1 =>{
    data1.forEach(d =>{
        d.discovery_year = +d.discovery_year;
        d.distance = +d.distance;
    })
    console.log(data1);
    BubbleChart(data1,x2,y1);
})

d3.csv("planetEJ.csv").then(data2 =>{
    data2.forEach(d =>{
        d.discovery_year = +d.discovery_year;
        d.distance = +d.distance;
    })
    console.log(data2);
    BubbleChart(data2, x1, y1);
})


d3.csv("planetJE.csv").then(data3 =>{
    data3.forEach(d =>{
        d.discovery_year = +d.discovery_year;
        d.distance = +d.distance;
    })
    console.log(data3);
    BubbleChart(data3, x1, y2);
})

d3.csv("planetJJ.csv").then(data =>{
    data.forEach(d =>{
        d.discovery_year = +d.discovery_year;
        d.distance = +d.distance;
    })
    console.log(data);
    BubbleChart(data, x2, y2);
})


    width = 1200 ;
    height = 700;

let svg = d3.select("#my-svg")
    .attr("width", width)
    .attr("height", height);
    console.log(svg);  

var x1 = d3.scaleLinear()
    .domain([1995, 2024])
    .range([ width/2 ,width]);
     
var x2 = d3.scaleLinear()
    .domain([2024, 1995])
    .range([ 0, width/2]); 

        
var y1 = d3.scaleLinear()
    .domain([0, 3600])
    .range([ height/2, 0])
    .nice();

var y2 = d3.scaleLinear()
    .domain([0, 3600])
    .range([height/2, height])
    .nice();   

const X1axis =svg.append("g")
    .attr("transform", `translate(${0},  ${height/2})`)
    .style("fill", "white")
    .call(d3.axisBottom(x1));
 
X1axis.style('color', 'white')     
    
const X2axis = svg.append("g")
    .attr("transform", `translate(${0}, ${height/2} )`)
    .style("fill", "white")
    .call(d3.axisBottom(x2));  

X2axis.style('color', 'white')     

svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 1200)
        .attr("y", (height+70)/2)
        .text("Discovery Year")
        .style("fill", "white");
   
const Y1axis = svg.append("g")
    .attr("transform",`translate(${width/2},0)`)
    .style("fill", "white")
    .call(d3.axisRight(y1)); 

Y1axis.style('color', 'white')         
  
const Y2axis = svg.append("g")
    .attr("transform",`translate(${width/2},${0})`)
    .style("fill", "white")
    .call(d3.axisRight(y2)); 

Y2axis.style('color', 'white')    
   

svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", (width/2)-10)
    .attr('transform', `rotate(-90)`)
    .text("Distance from Earth (lightyears)")
    .style("fill", "white");  
    
var myColor = d3.scaleOrdinal()
    .domain(["Terrestrial", "Gas Giant", "Neptune-like", "Super Earth"])
    .range(d3.schemeSet1);   

svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 1295)
    .attr("y", 120)
    .text("Legend : Planet Type")
    .style("fill", "white");

const allgroups = ["Terrestrial", "Gas Giant", "Neptune-like", "Super Earth"]
const size = 20    
svg.selectAll("myrect")
    .data(allgroups)
    .join("circle")
        .attr("cx", 1150)
        .attr("cy", (d,i) => 8 + i*(size+5)) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", d =>  myColor(d))

svg.selectAll("mylabels")
    .data(allgroups)
        .enter()
        .append("text")
        .attr("x", 1150 + size*.8)
        .attr("y", (d,i) =>  i * (size + 5) + (8)) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", d => myColor(d))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")    ;    

function BubbleChart( data,x,y){    
    
    var z = d3.scaleLinear()
        .domain([0,3])
        .range([5, 25]); 

    const tooltip = d3.select("#my-svg")
        .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "black")
          .style("border-radius", "5px")
          .style("padding", "10px")
          .style("color", "white")          
       
    const showTooltip = function(event,d) {
            tooltip
              .transition()
              .duration(200)
            tooltip
              .style("opacity", 1)
              .html("Name: " + d.name)
              .style("left", (event.x)/2 + "px")
              .style("top", (event.y)/2-50 + "px")
          }

    var moveTooltip = function(d) {
        tooltip
            .style("left", (d3.mouse(this)[0]+30) + "px")
            .style("top", (d3.mouse(this)[1]+30) + "px")
    }
        
    var hideTooltip = function(d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }      

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
           .attr("cx", function (d) { return x(d.discovery_year); } )
           .attr("cy", function (d) { return y(d.distance); } )
           .attr("r", function (d) { return z(d.radius_multiplier); } )
           .style("fill", function (d) { return myColor(d.planet_type); } )
           .style( "opacity", "1.0")
           .attr("stroke", "Black")
           .append("texts")
           .style("stroke-width", "30px")  
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseout", hideTooltip );  
        

        
}

//BubbleChart();
