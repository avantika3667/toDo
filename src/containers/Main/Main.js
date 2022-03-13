import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { connect } from 'react-redux';

import AddToDo  from '../../components/AddToDo/AddToDo';
import ToDoList from '../../components/ToDoList/ToDoList';
import * as Actions from '../../store/actions';

import './Main.css';

class Main extends Component {

  constructor(props){
    super(props);
    this.props.getInitialState();
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  /**
   * Delete a task from the list of todos
   * @param todo - The todo object that is being deleted.
   */
  deleteTask(todo) {    
    this.props.onDeleteTodo(todo.taskId);
  }

  /**
   * It toggles the complete state of the todo.
   * @param todo - The task that was clicked.
   */
  handleToggle(todo) {
    this.props.onCompleteTodo(todo);
  }

  /**
   * Add a todo to the todo list
   * @param todoTitle - The title of the todo item.
   */
  addTask(todoTitle) {
    this.props.onAddTodo(todoTitle);
  }

  /**
   * This function renders the to-do list, add-todo 
   * @returns A Card with a CardHeader, a CardContent, and a ToDoList.
   */
  render(){
    const loader = (<div className='loader'><CircularProgress size={100} /></div>);
    const error = (<div className='message error'>Something went wrong</div>);
    const todoList = (
      <ToDoList 
        todos={this.props.todos} 
        deleteTask={this.deleteTask} 
        handleToggle={this.handleToggle}/>
    )
    return (
      <Card className='card'>
        <CardHeader className='card-header' title='To-Do List' />
        <CardContent className='card-content'>
          <AddToDo addTask={this.addTask}/>
          { this.props.error ? error : ( this.props.loading ? loader : todoList)}
        </CardContent>
      </Card>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (title) => dispatch(Actions.addTodo(title)),
    onDeleteTodo: (id) => dispatch(Actions.deleteTodo(id)),
    onCompleteTodo: (id) => dispatch(Actions.completeTodo(id)),
    getInitialState: () => dispatch(Actions.fetchInitialState()),
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos,
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
