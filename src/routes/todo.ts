import { Router } from 'express'

import { createTodo, getTodo, getAllTodos, updateTodo, deleteTodo } from '../controllers/todo'

const router = Router()

router.get('/:id', getTodo)

router.get('/', getAllTodos)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router