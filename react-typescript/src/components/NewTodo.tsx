import React from 'react';

import './NewTodo.css';

interface NewTodoProps {
    onAddTodo: (text: string) => void;
}

function NewTodo(props: NewTodoProps) {
    const textInputRef = React.useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInputRef}/>
            </div>
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default NewTodo;
