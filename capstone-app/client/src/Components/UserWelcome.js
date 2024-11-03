import { Form, Button, Container } from 'react-bootstrap';
import images from '../Assets/images';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './UserWelcome.styles.css'; 

export default function UserWelcome () {
    const { 
        username, 
        userLocation, 
        locations, 
        handleLocationChange
     } = useAuth();

    console.log('Current username:', username);



    return (
        <div className="background"
        style={{ backgroundImage: `url(${images.seaRocks01})` }}>

            <div className='overlay'>
                <h2 style={{ color: 'white' }}>Welcome '{username}' from </h2>
                        <Form.Select
                        value={userLocation}
                        onChange={handleLocationChange}
                        className="bg-white/90 backdrop-blur-sm"
                        >
                        {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                        ))}
                    </Form.Select>
            </div>
        </div>
                

    )

}