import { Form, Button, Container } from 'react-bootstrap';
import images from '../Assets/images';

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

        return (
            <div style={formStyle}>
                <div style={overlayStyle}>
                    <h2 style={{ color: 'white', textAlign: 'center' }}>Sign In</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        </Form>
                </div>
            </div>
    );
}