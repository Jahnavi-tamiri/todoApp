// src/components/Home.js
import React, { Component } from 'react';
import { HomeContainer, Title, Form, Input, Select, SubmitButton } from './HomeStyles'; // Import styled components
import TodoList from '../TodoList';
import Header from '../Header';
import { v4 as uuidv4 } from 'uuid'; // Correctly import uuid

class Home extends Component {
    state = {
        todoList: [],
        task: '',
        status: false,
        category: '',
    };

    onSubmitList = (event) => {
        event.preventDefault();

        const { task, status, category } = this.state;

        // Basic validation for task input
        if (task.trim() === '') {
            alert('Please enter a task!');
            return;
        }

        const newList = {
            id: uuidv4(),
            status,
            category,
            task,
        };

        this.setState(prevState => ({
            todoList: [...prevState.todoList, newList],
            task: '', // Clear input field after adding
            category: '', // Clear category if needed
        }));
    };

    handleInputChange = (event) => {
        this.setState({ task: event.target.value });
    };

    handleCheckboxChange = (id) => {
        this.setState(prevState => ({
            todoList: prevState.todoList.map(todo => 
                todo.id === id ? { ...todo, status: !todo.status } : todo
            )
        }));
    };

    handleCategoryChange = (event) => {
        this.setState({ category: event.target.value });
    };

    handleDelete = (id) => {
        this.setState(prevState => ({
            todoList: prevState.todoList.filter(todo => todo.id !== id)
        }));
    };

    render() {
        const { todoList, task, category } = this.state;

        return (
            <div>
                <Header />
                <HomeContainer>
                <Title>Todo List</Title>
                <Form onSubmit={this.onSubmitList}>
                    <Input 
                        type='text' 
                        value={task}
                        onChange={this.handleInputChange}
                        placeholder='Enter task...'
                    />
                    <Select value={category} onChange={this.handleCategoryChange}>
                        <option value=''>Select Category</option>
                        <option value='Work'>Work</option>
                        <option value='Home'>Home</option>
                        <option value='Learning'>Learning</option>
                    </Select>
                    <SubmitButton type='submit'>ADD</SubmitButton>
                </Form>
                <ul>
                    {todoList.map(each => (
                        <TodoList 
                            todoDetails={each} 
                            key={each.id} 
                            onDelete={this.handleDelete} // Pass delete function
                            onCheckboxChange={this.handleCheckboxChange} // Pass checkbox change function
                        />
                    ))}
                </ul>
            </HomeContainer>
            </div>
        );
    }
}

export default Home;
