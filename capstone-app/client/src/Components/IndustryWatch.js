import { Form, Button, Container } from 'react-bootstrap';
import images from '../Assets/images';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import OccupancyChart from './Charts/Occupancy';

export default function IndustryWatch () {
    const { userLocation } = useAuth();
    const Location = userLocation;

    return (
        <Container style={{ height: '600px', width: '60vw' }} >
            <h2>Industry Watch</h2>
            {Location ? (
                <OccupancyChart lga_name style={{ height: '600px', width: '100%' }}/>
            ) : (
                <p>Please select a location to view the occupancy data.</p>
            )}
            
        </Container>
        
    )
}