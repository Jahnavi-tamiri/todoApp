import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Form, Input, Button, Title } from './SignupStyles';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Signup successful! You can log in now.');
            navigate('/login'); // Redirect to login after successful signup
        } else {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Signup</Title>
                <Input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="submit">Signup</Button>
            </Form>
        </FormContainer>
    );
};

export default Signup;
