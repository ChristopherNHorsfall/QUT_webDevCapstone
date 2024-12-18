import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const MultiLineChart = ({ data, width = 800, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Define margins and dimensions
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Parse the data for dates
    const parseDate = d3.timeParse("%Y-%m-%d");
    const dataParsed = data.map(d => ({ 
        ...d, 
        date: parseDate(d.date.split('T')[0]),
        year: new Date(d.date).getFullYear(),
        average_historical_occupancy: +d.average_historical_occupancy
     }));

    console.log("dataParse:", dataParsed)
    // Group data by year
    const dataByYear = d3.group(dataParsed, d => d.year);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dataParsed, d => d.date))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataParsed, d => d.average_historical_occupancy)])
      .range([innerHeight, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain([...dataByYear.keys()])
      .range(["steelblue", "orange"]); // Add more colors if necessary

    // Line generator
    const lineGenerator = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.average_historical_occupancy));

    // Append the chart group
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw the axes
    chart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(6));

    chart.append("g").call(d3.axisLeft(yScale));

    // Draw the lines
    for (const [year, values] of dataByYear) {
      chart
        .append("path")
        .datum(values)
        .attr("fill", "none")
        .attr("stroke", colorScale(year))
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
    }

    // Add a legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 120}, ${margin.top})`);

    [...dataByYear.keys()].forEach((year, index) => {
      legend
        .append("circle")
        .attr("cx", 10)
        .attr("cy", index * 20)
        .attr("r", 5)
        .attr("fill", colorScale(year));

      legend
        .append("text")
        .attr("x", 20)
        .attr("y", index * 20 + 5)
        .text(year)
        .style("font-size", "12px");
    });
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default MultiLineChart;