import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom/client';
import { AgCharts } from 'ag-charts-react';
import { useFetchOccupancyData } from "../Hooks/useFetchOccupancyData";
import { sanitizeData, filterDataByKeyValue } from "../Utils/dataProcessing";
import { useAuth } from "../../AuthContext";

const OccupancyChart = ({style}) => {
    const { 
        userLocation, 
     } = useAuth();

    const rawData = useFetchOccupancyData();
    const cleanData = sanitizeData(rawData)
    const locationfilteredData = filterDataByKeyValue(cleanData, 'lga_name', userLocation);
    // Filter data for 2023 and 2024
    const year2024Data = filterDataByKeyValue(locationfilteredData, 'year', 2024);
    const year2023Data = filterDataByKeyValue(locationfilteredData, 'year', 2023)

    // Format the data to remove the year from the date component
    const formatDailyData = (data) => {
        return data.map(row => {
            const date = new Date(row.date);
            return {
                // Create a new date object with the month and day, setting the year to a constant value (2000)
                x: new Date(2000, date.getMonth(), date.getDate()), // Keep day and month, ignore year
                y: parseFloat(row.average_historical_occupancy),
            };
        });
    };

    const formatted2024Data = formatDailyData(year2024Data);
    //console.log("Formatted 2024 data:", JSON.stringify(formatted2024Data, null, 2));
    const formatted2023Data = formatDailyData(year2023Data);
    //console.log("Formatted 2023 data:", JSON.stringify(formatted2023Data, null, 2));

    const chartOptions = {
        title: {
            text: `Occupancy Comparison for ${userLocation}`,
        },
        width: 600,  // Set your desired width here
        height: 600, // Set your desired height here
        data: [
            { name: '2024', data: formatted2024Data },
            { name: '2023', data: formatted2023Data },
        ],
        series: [
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y',
                title: '2024',
                data: formatted2024Data,
            },
            {
                type: 'line',
                xKey: 'x',
                yKey: 'y',
                title: '2023',
                data: formatted2023Data,
            },
        ],
        axes: [
            {
                type: 'time',
                position: 'bottom',
                label: {
                    format: '%b', // Displays abbreviated month names (e.g., Jan, Feb)
                    rotation: 45, // Optional: Adjusts label rotation for readability
                },
                title: {
                    text: 'Month',
                },
                tick: {
                    interval: { timeUnit: 'month', count: 1 }, // Tick every month
                },
            },
            {
                type: 'number',
                position: 'left',
                title: {
                    text: 'Average Historical Occupancy',
                },
            },
        ],
    };

    return (
        <div style={{ height: '100%', width: '100%', ...style }}>
            <AgCharts options={chartOptions} /> 
        </div>
    );


};

export default OccupancyChart;