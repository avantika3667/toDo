import * as ActionTypes from './actionTypes';


/**
 * This function is used to dispatch an action to the store. 
 * 
 * The action is an object that has a type property. 
 * 
 * The type property is used by the reducer to determine what to do with the action
 * @returns An action object.
 */
export const todoRequest = () => {
  return {
    type: ActionTypes.TODO_REQUEST,
  }
}

/**
 * The function takes an error object as a parameter and returns an action object
 * @param error - The error object.
 * @returns An action object with a type of TODO_REQUEST_SUCCESS and a payload of the todo.
 */
export const todoFailure = (error) => {
  return {
    type: ActionTypes.TODO_REQUEST_FAILURE,
    payload: error
  }
}

/**
 * This function is used to add a new todo to the store
 * @param task - The task that was added to the todo list.
 * @returns An action object with a type of ADD_TODO_SUCCESS and a payload of the task that was just
 * added.
 */
export const addTodoSuccess = (task) => {
  return {
    type: ActionTypes.ADD_TODO_SUCCESS,
    payload: task
  }
}

/**
 * This function is used to delete a todo item from the store
 * @param taskId - The taskId of the task that was deleted.
 * @returns An action object with a type of DELETE_TODO_SUCCESS and a payload of the taskId.
 */
export const deleteTodoSuccess = (taskId) => {
  return {
    type: ActionTypes.DELETE_TODO_SUCCESS,
    payload: taskId
  }
}

/**
 * It creates an action that is used to update the state of the task.
 * @param task - The task that was completed.
 * @returns An action object
 */
export const completeTodoSuccess = (task) => {
  return {
    type: ActionTypes.COMPLETE_TODO_SUCCESS,
    payload: task
  }
}

/**
 * This function is used to fetch the initial state of the application
 * @returns An action object with a type of INITIAL_STATE.
 */
export const fetchInitialState = () => {
  return {
    type: ActionTypes.INITIAL_STATE
  }
}

/**
 * It returns a URL to a specific resource on the API.
 * @param params - the id of the todo we want to get
 */
const getApi = (params) => `https://jsonplaceholder.typicode.com/todos/${params}`;

/**
 * It takes in a set of parameters, a method, a body, and a success handler. It then makes a request to
 * the API with those parameters, and if the request is successful, it calls the success handler with
 * the response
 * @param params - The URL parameters to be added to the URL.
 * @param method - The HTTP method to use.
 * @param body - The body of the request.
 * @param successHandler - a function that takes the response from the server and returns an action.
 * @returns A function that dispatches the request action.
 */
const executeRequest = (params, method, body, successHandler) => {
  return (dispatch) => {
    dispatch(todoRequest());
    fetch(getApi(params), {
        method: method,
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(response => response.json())
      .then((response) => {
        dispatch(successHandler(response));
      })
      .catch(error => {
        dispatch(todoFailure(error.message));
      })
  }
}

/**
 * It sends a POST request to the server with the taskId, title, and completed properties.
 * @param title - The title of the todo item.
 * @returns Nothing.
 */
export const addTodo = (title) => {
  return executeRequest('', 'POST', {
      taskId: Date.now(),
      title: title,
      completed: false
    },
    addTodoSuccess);
};

/**
 * `completeTodo` is a function that takes a task and completes it
 * @param task - The task that we want to complete or incomplete.
 * @returns Nothing.
 */
export const completeTodo = (task) => {
  return executeRequest(task.taskId, 'PATCH', {
      taskId: task.taskId,
      completed: !task.completed
    },
    completeTodoSuccess);
};

/**
 * It makes a DELETE request to the API to delete a task.
 * @param taskId - The id of the task to delete.
 * @returns A function that dispatches the action.
 */
export const deleteTodo = (taskId) => {
  return (dispatch) => {
    dispatch(todoRequest());
    fetch(getApi(taskId), {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then((response) => {
        dispatch(deleteTodoSuccess(taskId));
      })
      .catch(error => {
        dispatch(todoFailure(error.message));
      });
  }
};