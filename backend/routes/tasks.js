const express = require('express')
const router = express.Router()

const taskControllers = require('../controllers/tasks')

router.post('/', taskControllers.createTask)

router.get('/', taskControllers.getAllTasks)

router.put('/:id', taskControllers.modifyDo)

module.exports = router
