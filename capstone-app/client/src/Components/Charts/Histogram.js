import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data, width = 600, height = 400 }) => {
    const svgRef = useRef();

    useEffect(() => {
        // Select the SVG element and clear previous content
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Define margins and inner dimensions
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create scales
        const xScale = d3
            .scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([0, innerWidth]);

        const histogram = d3
            .bin()
            .domain(xScale.domain())
            .thresholds(xScale.ticks(10)); // Adjust bin count here

        const bins = histogram(data);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(bins, (d) => d.length)])
            .range([innerHeight, 0]);

        // Append group for chart area
        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Draw bars
        chart
            .selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.x0)) // x0 is the start of the bin
            .attr("y", (d) => yScale(d.length))
            .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - 1) // x1 is the end of the bin
            .attr("height", (d) => innerHeight - yScale(d.length))
            .attr("fill", "steelblue");

        // Add axes
        chart
            .append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

        chart.append("g").call(d3.axisLeft(yScale));
    }, [data, height, width]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default Histogram;