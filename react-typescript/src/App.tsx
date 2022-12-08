import React from 'react';

import TodoList from './components/TodoList';
import NewTodo from "./components/NewTodo";

function App() {
    const todos = [{id: '1', text: 'Finish the course'}];

    const addTodoHandler = (text: string) => {
        console.log(text);
    };

    return (
        <div className="App">
            <NewTodo onAddTodo={addTodoHandler} />
            <TodoList items={todos}/>
        </div>
    );
}

export default App;
