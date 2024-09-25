// src/components/HomeStyles.js
import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background: linear-gradient(135deg, #ff7e5f, #feb47b); 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    text-align: center;
    color: #fff; 
    margin-bottom: 20px;
    font-size: 20px; 
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
`;

export const Form = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #fff; 
    border-radius: 5px;
    margin-right: 10px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #feb47b; /* Change to gradient color on focus */
        outline: none;
    }
`;

export const Select = styled.select`
    padding: 10px;
    border: 1px solid #fff; /* White border */
    border-radius: 5px;
    margin-right: 10px;
    background: rgba(255, 255, 255, 0.8); /* Slightly transparent white background */
`;

export const SubmitButton = styled.button`
    padding: 10px 15px;
    background-color: #007bff; /* Original blue color */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3; /* Darker blue on hover */
    }
`;

export const TodoListContainer = styled.ul`
    list-style-type: none; /* Remove default bullet points */
    padding: 0;
    width: 100%; /* Full width for the list */
    margin-top: 20px; /* Space from form */
`;
