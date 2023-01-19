import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { saveData } from './RequestFunctions'

export const TodoListForm = ({ todoList, saveTodoList, displayMessage }) => {
  const [todos, setTodos] = useState(todoList.todos);

  const handleSubmit = (event) => {
    if (event != null) {
      event.preventDefault();
    }
    saveTodoList(todoList.id, { todos });
    saveData(todoList.id, todos)
      .then((res) => {
        displayMessage("Lists successfully saved on server.");
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((obj, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={obj.completed || false}
                onChange={(event) => {
                  setTodos([
                    ...todos.slice(0, index),
                    { "name": todos[index].name, "completed": event.target.checked },
                    ...todos.slice(index + 1),
                  ]);
                  handleSubmit();
                }}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={obj.name}
                onBlur={handleSubmit}
                onChange={(event) => {
                  setTodos([
                    ...todos.slice(0, index),
                    { "name": event.target.value, "completed": todos[index].completed },
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
