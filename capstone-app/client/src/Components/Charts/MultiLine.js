import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const MultiLineChart = ({ data, 
    width = 800, 
    height = 400,
    valueKey = 'average_historical_occupancy',
    yAxisLabel = 'Value',
    yMin = 0.3,
    dateKey = 'date'
}) => {
    const [showSchoolHolidays, setShowSchoolHolidays] = useState(true); // State to manage visibility
    const svgRef = useRef();
    const schoolHolidays = [
        { start: new Date('2023-04-01'), end: new Date('2023-04-16') }, // QLD autumn holidays
        { start: new Date('2023-06-24'), end: new Date('2023-07-09') }, // QLD winter holidays
        { start: new Date('2023-09-15'), end: new Date('2023-10-03') }, // QLD spring holidays
        { start: new Date('2023-01-01'), end: new Date('2023-01-26') }, // QLD summer Jan holidays
        { start: new Date('2023-12-08'), end: new Date('2023-12-31') } // QLD summer Dec holidays  
    ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Define margins and dimensions
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Normalize all dates to the same year for alignment
    const normalizeToYear = (date, referenceYear) => {
        const d = new Date(date);
        return new Date(referenceYear, d.getMonth(), d.getDate());
    };
    
    const referenceYear = 2023; // Choose a year for normalization
    const dataParsed = data.map(d => {
        const originalDate = new Date(d.date); // Original date
         return {
            ...d, 
            originalDate, // Store original date for reference
            adjustedDate: normalizeToYear(originalDate, referenceYear), // Reference year adjustment
            value: +d[valueKey] // Convert to number
        };
    });
    // Sort data by original date
    dataParsed.sort((a, b) => a.originalDate - b.originalDate);

    console.log("Parsed Data:", dataParsed)


    // Group data by year
    const dataByYear = d3.group(dataParsed, d => d.originalDate.getFullYear());

    console.log("Grouped Data:", Array.from(dataByYear));

    // Scales
    const xScale = d3
      .scaleTime()
      .domain([new Date(Date.UTC(referenceYear, 0, 1)), new Date(Date.UTC(referenceYear, 11, 31))]) // Reference year months
      .range([0, innerWidth])
      .nice(); 

    const yScale = d3
      .scaleLinear()
      .domain([0.3, d3.max(dataParsed, d => d.value)])
      .range([innerHeight, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain([...dataByYear.keys()])
      .range(["steelblue", "orange"]); // Add more colors if necessary


    // Append the chart group
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw the axes
    chart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(12));

    chart.append("g").call(d3.axisLeft(yScale));

    // Draw the lines
    for (const [year, values] of dataByYear) {
        values.sort((a, b) => a.originalDate - b.originalDate);
      chart
        .append("path")
        .datum(values)
        .attr("fill", "none")
        .attr("stroke", colorScale(year))
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => xScale(d.adjustedDate)) 
            .y(d => yScale(d.average_historical_occupancy))
        );
    }
    // Create a separate group for holiday highlights
    const holidayGroup = chart
        .append("g")
        .attr("class", "holiday-highlights");

    // Draw school holiday highlights (only if showSchoolHolidays is true)
    if (showSchoolHolidays) {
        schoolHolidays.forEach(holiday => {

            // Draw vertical lines for start and end of the holiday
            const startX = xScale(holiday.start);
            const endX = xScale(holiday.end);

            // Vertical line at the start of the holiday
            
            holidayGroup.append("line")
            .attr("x1", startX)
            .attr("x2", startX)
            .attr("y1", 0)
            .attr("y2", innerHeight)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5"); // Optional dashed line

            // Vertical line at the end of the holiday
            holidayGroup.append("line")
            .attr("x1", endX)
            .attr("x2", endX)
            .attr("y1", 0)
            .attr("y2", innerHeight)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5"); // Optional dashed line

            // Draw shaded area
            holidayGroup.append("rect")
            .attr("x", xScale(holiday.start))
            .attr("y", 0)
            .attr("width", xScale(holiday.end) - xScale(holiday.start))
            .attr("height", innerHeight)
            .attr("fill", "rgba(255, 0, 0, 0.15)") // Semi-transparent red
            .attr("pointer-events", "none"); // Prevent interaction on the shaded area
        });
    } else {
        chart.selectAll(".holiday-highlights").remove();
    };

    // Append the y-axis label
    chart.append("text")
    .attr("transform", "rotate(-90)") // Rotate the text 90 degrees counterclockwise
    .attr("y", -margin.left + 15) // Adjust position from the left edge
    .attr("x", -innerHeight / 2) // Center vertically along the chart
    .attr("text-anchor", "middle") // Align text
    .style("font-size", "12px") // Optional: Adjust font size
    .text("Occupancy");

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
  }, [data, width, height, schoolHolidays, showSchoolHolidays]);

  

  return (
    <div>
    <div>
        <h4>Average Occupancy Yearly Comparison</h4>
    </div>
      <svg ref={svgRef} width={width} height={height} />
      <div>
        <div className="mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={showSchoolHolidays}
                    onChange={(e) => setShowSchoolHolidays(e.target.checked)}
                    className="form-checkbox"
                />
                <span>Show School Holidays</span>
            </label>
        </div>
      </div>
    </div>
  );
};

export default MultiLineChart;