import * as ActionsTypes from './actionTypes';

/* Initializing the state of the application. */
const initialState = {
  todos: [],
  loading: false,
  error: ''
};

/**
 * The reducer takes the current state and an action, and returns the new state
 * @param [state] - The current state of the reducer.
 * @param action - The action that was dispatched.
 * @returns The reducer is returning a new state object.
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.INITIAL_STATE:
      return initialState
    case ActionsTypes.TODO_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionsTypes.TODO_REQUEST_FAILURE:
      return {
        todos: [...state.todos],
        loading: false,
        error: action.payload
      }

    case ActionsTypes.ADD_TODO_SUCCESS:
      return {
        todos: [action.payload, ...state.todos],
        loading: false,
        error: ''
      }
    
    case ActionsTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(item => item.taskId !== action.payload),
        loading: false,
        error: ''
      }

    case ActionsTypes.COMPLETE_TODO_SUCCESS:
      const todos = [...state.todos];
      const index = todos.findIndex(item => item.taskId === action.payload.taskId);
      todos[index].completed = action.payload.completed;
      return {
        todos: todos,
        loading: false,
        error: ''
      }

    default:
      return state;
  }
}

export default reducer;