import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { useSignIn } from './Hooks/useSignIn';
import './SignInForm.styles.css'; 
import images from '../Assets/images';

export default function SignInForm () { 
        const { username, setUsername, password, setPassword, error, handleSubmit } = useSignIn(); //in Hooks folder

        return (
            <div className="form-container"
            style={{ backgroundImage: `url(${images.bush01})` }} // set background image here cause css doesn't support imports
            > 
                <div className="overlay">
                    <h2 className="form-header">Sign In</h2>
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