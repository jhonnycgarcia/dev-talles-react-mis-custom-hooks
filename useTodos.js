import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del Alma',
    //     done: false,
    // },
    // {
    //     id: new Date().getTime() * 3,
    //     description: 'Recolectar la piedra del Poder',
    //     done: false,
    // },
    // {
    //     id: new Date().getTime() * 6,
    //     description: 'Recolectar la piedra de la Mente',
    //     done: false,
    // },
];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || initialState;
}

export const useTodos = () => {
    const [todos, dispatchTodos] = useReducer(todoReducer, initialState, init);

    // Guardar en localStorage los todos cuando cambien
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handlerNewTodo = (todo) => {
        const action = { type: 'ADD', payload: todo };
        dispatchTodos(action);
    };

    const handlerDeleteTodo = (id) => {
        const action = { type: 'DELETE', payload: id };
        dispatchTodos(action);
    };

    const handlerToggleTodo = (id) => {
        const action = { type: 'TOGGLE', payload: id };
        dispatchTodos(action);
    };


    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handlerNewTodo,
        handlerDeleteTodo,
        handlerToggleTodo,
    }
}
