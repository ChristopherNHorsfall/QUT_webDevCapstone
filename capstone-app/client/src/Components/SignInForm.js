import { Form, Button, Container } from 'react-bootstrap';
import images from '../Assets/images';
import React, { useState } from 'react';

export default function SignInForm () {
        const formStyle = {
            backgroundImage: `url(${images.bush01})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '50vh', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            position: 'relative',
            color: 'white'
        };
    
        const overlayStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px', 
        };

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();
            setError('');

            console.log('Submitting login form:', { username, password });
            // Prepare the request payload
            const payload = { username, password };
    
            try {
                console.log('Sending POST request to /login');

                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                console.log('Response status:', response.status);
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Error response data:', errorData);
                    throw new Error(errorData.message || 'Invalid credentials');
                }
    
                const data = await response.json();
                console.log('Login successful, server response:', data.message);

            } catch (err) {
                console.error('Error during login:', err);
                setError(err.message);
            }
        };

        return (
            <div style={formStyle}>
                <div style={overlayStyle}>
                    <h2 style={{ color: 'white', textAlign: 'center' }}>Sign In</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </Form>
                </div>
            </div>
    );
}