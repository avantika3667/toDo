import React from "react"
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  completed: {
    textDecoration: 'line-through',
    color: 'lightgray',
  }
});


const ToDoList = (props) => {
  const classes = useStyles();

  /**
   * Given a task, toggle its completed status
   * @param task - The task that is being toggled.
   */
  const handleToggle = (task) => {
    props.handleToggle(task)
  };

  /**
   * Given a task, delete it from the database
   * @param task - The task that was deleted.
   */
  const deleteTask = (task) => {
    props.deleteTask(task);
  }

  return (    
      props.todos.length === 0 ?
        <h3>No Task to do </h3>
      : <List 
          sx={{
            overflow: 'auto',
            maxHeight: 'calc(100% - 40px)',
          }}>
          {props.todos.map((task) => {
            return (
              <ListItem
                key={task.taskId}
                secondaryAction={
                  <IconButton edge="end" onClick={deleteTask.bind(this, task)}>
                    <DeleteIcon/>
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton onClick={handleToggle.bind(this, task)} className={task.completed ? classes.completed: ''}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      disableRipple
                      sx={{
                        '&.Mui-checked': {
                          color:'lightgray',
                        },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText className={classes.taskTitle} primary={task.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
    
  )
}

export default ToDoList;