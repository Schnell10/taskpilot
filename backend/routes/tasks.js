const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const taskControllers = require('../controllers/tasks')

router.post('/', auth, taskControllers.createTask)

router.get('/', auth, taskControllers.getAllTasks)

router.put('/modifyDo/:id', auth, taskControllers.modifyDo)
router.put('/modifyTask/:id', auth, taskControllers.modifyTask)

router.delete('/:id', auth, taskControllers.deleteTask)

module.exports = router
