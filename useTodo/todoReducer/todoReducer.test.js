import { todoReducer } from "./todoReducer"

describe('Test on todoReducer', () => {

  const initialState = [{
    id: 1,
    description: 'Learn React',
    done: false,
  }]

  test('Return initial values', () => {
    const newState = todoReducer(initialState, {});
    expect(newState).toEqual(initialState);
  })

  test('Add a new todo', () => {
    const newTodo = {
      id: 2,
      description: 'Learn Node',
      done: false,
    }
    const action = {
      type: 'ADD_TODO',
      payload: newTodo,
    }
    const newState = todoReducer(initialState, action);
    expect(newState.length).toBe(2);
    expect(newState).toContain(action.payload);
    expect(newState).toEqual([...initialState, newTodo]);
  })

  test('Delete a to do', () => {
    const action = {
      type: 'DELETE_TODO',
      payload: 1,
    }
    const newState = todoReducer(initialState, action);
    expect(newState.length).toBe(0);
    expect(newState).toEqual([]);
  })

  test('Toggle a to do', () => {
    const action = {
      type: 'TOGGLE_TODO',
      payload: 1,
    }
    const newState = todoReducer(initialState, action);
    expect(newState[0].done).toBe(true);
    expect(newState).toEqual([{
      id: 1,
      description: 'Learn React',
      done: true,
    }]);
    const newState2 = todoReducer(newState, action);
    expect(newState2[0].done).toBe(false);
  })
})