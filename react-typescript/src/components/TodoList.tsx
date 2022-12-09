import React from 'react';

import './TodoList.css';

interface TodoListProps {
    items: { id: string, text: string }[];
    onDeleteTodo: (text: string) => void;
}

function TodoList(props: TodoListProps) {
    return (
        <ul>
            {props.items.map(todo => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => props.onDeleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
