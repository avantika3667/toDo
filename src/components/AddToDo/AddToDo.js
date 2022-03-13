import React, { useState } from "react"
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const useStyles = makeStyles({
  addTodoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  taskInput: {
    width: '100%'
  },

  addButton:{
    paddingBlock: 0,
  },
  
  addButtonIcon: {
    height: '2rem !important',
    width: '2rem !important',
  },
});

const AddToDo = (props) => {
  const classes = useStyles();
  const [enteredTask, setEnteredTask] = useState('');

  /**
   * It adds the enteredTask to the toDoList
   * @returns Nothing.
   */
  const addToDoHandler = () => {
    if(enteredTask.trim().length === 0){
      return;
    }
    props.addTask(enteredTask);
    setEnteredTask('');
  }

  /**
   * It sets the value of the enteredTask state to the value of the text input.
   * @param event - The event that triggered the function.
   */
  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  }

  /* Returning a div with the className `add-todo-container` and the children of that div are the
  TextField and the IconButton. */
  return (
    <div className={classes.addTodoContainer}>
      <TextField 
        className={classes.taskInput} label="Add task to do" 
        variant="standard" size="small" 
        value={enteredTask} 
        onChange={taskChangeHandler} />
      <IconButton className={classes.addButton} onClick={addToDoHandler}>
        <AddCircleOutlineOutlinedIcon className={classes.addButtonIcon} />
      </IconButton>
    </div>
  )
}

export default AddToDo;