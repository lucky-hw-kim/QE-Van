import express from 'express'
import { deleteUser, getUser, updateUser, getAllUsers } from '../Controllers/UserController.js'

// User routes

const router = express.Router()

  router.get('/:id', getUser)
  router.put('/:id', updateUser)
  router.delete('/:id', deleteUser)
  router.get('/', getAllUsers)


export default router;