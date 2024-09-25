import styled from 'styled-components';


export const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
    background-color: ${props => (props.completed ? '#d3ffd3' : '#fffbe6')};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    width:75vw
    
`;

export const TaskDetails = styled.div`
    display: flex;
    align-items: center;
`;

export const TaskText = styled.p`
    margin: 0;
    margin-right: 10px;
    font-size: 1.2rem;
    text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
    color: ${props => (props.completed ? '#a9a9a9' : '#333')};
`;

export const CategoryText = styled.p`
    margin: 0;
    font-size: 0.9rem;
    color: #007bff;
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #ff4d4d;
    font-size: 1.5rem;
`;

export const Checkbox = styled.input`
    margin-right: 10px;
    cursor: pointer;
    padding-right:20px;

    &:checked {
        accent-color: #007bff;
    }
`;

