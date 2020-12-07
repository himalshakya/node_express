import { RequestHandler } from 'express'
import { v4 as uuid4 } from 'uuid'

import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text

  const newTodo = new Todo(uuid4().toString(), text)

  TODOS.push(newTodo)

  res.status(201).json({ message: 'Created new Todo', createdToDo: newTodo})
}

export const getAllTodos: RequestHandler = (req, res, next) => {
  return res.status(200).json({ todos: TODOS})
}

export const getTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const thisId = req.params.id
  const todo = findTodo(thisId)

  if (todo === null){
    res.status(404).json(null)
  } else {
    res.status(200).json(todo)
  }
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const thisId = req.params.id
  const todo = findTodo(thisId)

  if (todo === null){
    res.status(404).json(null)
  } else {
    const updatedText = (req.body as {text: string}).text
    todo.text = updatedText
    res.status(201).json({ message: 'Updated Todo', updatedToDo: todo})
  }
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const thisId = req.params.id
  const todoIndex = TODOS.findIndex(todo => todo.id === thisId)

  if (todoIndex >= 0){
    TODOS.splice(todoIndex, 1);
    res.status(204).json(null)
  } else {
    res.status(404).json(null)
  }
}

const findTodo = (searchId: string): Todo | null =>{
  const todos = TODOS.filter(todo => todo.id === searchId)
  if (todos.length > 0){
    return todos[0]
  } else {
    return null
  }
}