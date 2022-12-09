import { useEffect, useReducer } from "react";
import { todoReducer } from "../useReducer/todoReducer/todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  
  const handleNewTodo = (todo) => {
    const action = {
      type: 'ADD_TODO',
      payload: todo,
    }
    dispatchTodo(action)
  }

  const handleDeleteTodo = (id) => {
    dispatchTodo({
      type: 'DELETE_TODO',
      payload: id,
    })
  }

  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: 'TOGGLE_TODO',
      payload: id,
    })
  }

  return {
    todos,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodos: todos.filter(todo => !todo.done).length,
  }
}