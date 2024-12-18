import { useState, useEffect } from 'react';


export const useFetchOccupancyData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching occupancy data..."); 
            try {
                const response = await fetch('http://localhost:3000/data/occupancy');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log("Data fetched successfully:", jsonData);
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log("Current data state:", data);
    return data;
};