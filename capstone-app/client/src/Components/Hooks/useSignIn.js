import { useState } from 'react';
import { useAuth } from '../../AuthContext';

export const useSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsLoggedIn } = useAuth();
    const { handleLogin } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const payload = { username, password };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid credentials');
            }
            const data = await response.json();
            console.log("API Response", data)
            handleLogin(data.username);
        } catch (err) {
            setError(err.message);
        }
    };

    return { username, setUsername, password, setPassword, error, handleSubmit };
};