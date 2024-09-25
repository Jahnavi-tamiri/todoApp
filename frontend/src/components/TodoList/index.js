
import React from 'react';
import { TodoItem, TaskText, DeleteButton, Checkbox,TaskDetails } from './TodoListStyles';


const TodoList = (props) => {
    const { todoDetails, onDelete, onCheckboxChange } = props; // Destructure props
    const { id, task, category, status } = todoDetails;

    return (
        <TodoItem>
            <TaskDetails>
            <Checkbox 
                type='checkbox' 
                checked={status} 
                onChange={() => onCheckboxChange(id)} 
            />
            <div>

            <TaskText completed={status}>{task}</TaskText>
                <p className="task-text">{category}</p>
            </div>
            </TaskDetails>
            
            <DeleteButton onClick={() => onDelete(id)}>
                🗑️
            </DeleteButton>
        </TodoItem>
    );
};

export default TodoList;
