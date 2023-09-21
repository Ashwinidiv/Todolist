import React, { useState } from 'react';
import './Todo.css'

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editid, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const editTodo = (id, text) => {
        setEdit(true);
        setEditId(id);
        setEditValue(text);
    };

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === editid) {
                return { ...todo, text: editValue };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEdit(false);
        setEditId(null);
        setEditValue('');
    };

    return (
        <div className='todo-container'>
            <h1>Todo List - Add your items</h1>
            <input
                type='text'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            {edit ? (
                <div>
                    <input
                        type='text'
                        value={editValue}
                        onChange={(event) => setEditValue(event.target.value)}
                    />
                    <button onClick={updateTodo}>Update</button>
                </div>
            ) : (
                <button onClick={addTodo}>Add the item</button>
            )}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                        <button onClick={() => deleteTodo(todo.id)}>Delete item</button>
                        <button onClick={() => editTodo(todo.id, todo.text)}>Edit item</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
