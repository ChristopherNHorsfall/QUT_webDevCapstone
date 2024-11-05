import { useState, useEffect } from 'react';
import { csv } from 'd3-fetch';

export const useFetchOccupancyData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching occupancy data..."); 
            try {
                const rawData = await csv('http://localhost:3000/data/occupancy');
                console.log("Data fetched successfully:", rawData);
                setData(rawData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log("Current data state:", data);
    return data;
};