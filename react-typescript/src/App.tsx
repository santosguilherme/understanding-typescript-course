import React from 'react';
// import { Route } from 'react-router-dom';

import TodoList from './components/TodoList';
import NewTodo from "./components/NewTodo";
import {Todo} from "./models/todo";

function App() {
    const [todos, setTodos] = React.useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        setTodos(prev => [...prev, {id: Date.now().toString(), text}]);
    };

    const deleteTodoHandler = (todoId: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
    };

    return (
        <div className="App">
            <NewTodo onAddTodo={addTodoHandler}/>
            <TodoList items={todos} onDeleteTodo={deleteTodoHandler}/>
        </div>
    );
}

export default App;
