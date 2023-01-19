import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import InfoIcon from '@mui/icons-material/Info'
import { TodoListForm } from './TodoListForm'
import { fetchData } from './RequestFunctions'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState(null);
  const [activeList, setActiveList] = useState();
  const [message, setMessage] = useState(null);

  const displayMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2500);
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        setTodoLists(res);
        displayMessage("Lists successfully fetched from server");
      })
      .catch((e) => {
        console.log(e.message);
      })
  }, [])

  return (
    <>
      {
        todoLists == null ?
          (
            <Fragment>
              <Card style={style}>
                <Typography component='h2'>Loading todo-lists</Typography>
              </Card>
            </Fragment>
          )
          :
          (
            <Fragment>
              <Card style={style}>
                <CardContent>
                  <Typography component='h2'>My Todo Lists {message && <span style={{float:"right"}}><InfoIcon style={{position:"relative",top:"5px"}} /> {message}</span>} </Typography>
                  <List>
                    {Object.keys(todoLists).map((key) => (
                      <ListItem key={key} button onClick={() => setActiveList(key)}>
                        <ListItemIcon>
                          <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={todoLists[key].title} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
              {todoLists[activeList] && (
                <TodoListForm
                  key={activeList} // use key to make React recreate component to reset internal state
                  todoList={todoLists[activeList]}
                  displayMessage={displayMessage}
                  saveTodoList={(id, { todos }) => {
                    const listToUpdate = todoLists[id];
                    setTodoLists({
                      ...todoLists,
                      [id]: { ...listToUpdate, todos }
                    })
                  }}
                />
              )}
            </Fragment>
          )
      }
    </>
  )
}
