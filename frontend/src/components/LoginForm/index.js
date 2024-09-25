import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Form, Input, Button, Title } from './LoginFormStyles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Login successful!');
            navigate('/'); // Redirect to home page after successful login
        } else {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <Button type="submit">Login</Button>
            </Form>
        </FormContainer>
    );
};

export default Login;
