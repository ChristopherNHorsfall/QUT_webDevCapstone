import { Form, Button, Container } from 'react-bootstrap';
import images from '../Assets/images';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import OccupancyChart from './Charts/Occupancy';
//import Histogram from './Charts/histogram';
import MultiLineChart from './Charts/MultiLine';
import { useFetchOccupancyData } from './Hooks/useFetchOccupancyData';
import { sanitizeData, filterDataByKeyValue } from './Utils/dataProcessing';


export default function IndustryWatch () {
    const { userLocation } = useAuth();
    const Location = userLocation;
    const occupancyData = useFetchOccupancyData();

    const sanitizedOccupancyData = sanitizeData(occupancyData);
    const locationfilteredData = filterDataByKeyValue(sanitizedOccupancyData, 'lga_name', userLocation);
    const multiLineData = locationfilteredData;

    return (
        <Container style={{ height: '600px', width: '60vw' }} >
            <h2>Industry Watch</h2>
            {Location ? (
                <div>
                    <MultiLineChart data={multiLineData} width={800} height={400}/>
                </div>

            ) : (
                <p>Please select a location to view the occupancy data.</p>
            )}
            

        </Container>
        
    )
}


//<OccupancyChart lga_name style={{ height: '600px', width: '100%' }}/>