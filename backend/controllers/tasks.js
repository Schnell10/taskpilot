const Task = require('../models/Task.js')

exports.createTask = (req, res, next) => {
   try {
      const taskObject = req.body

      // Ajoutez la propriété 'do' avec la valeur par défaut 'false'
      taskObject.do = false

      const task = new Task(taskObject)

      task
         .save()
         .then(() =>
            res.status(201).json({ message: 'Tâche enregistrée avec succès !' })
         )
         .catch((error) => {
            res.status(400).json({
               message: 'Erreur lors de la création de la tâche',
               error: error.message,
            })
         })
   } catch (error) {
      res.status(500).json({
         message: 'Erreur serveur',
         error: error.message,
      })
   }
}

exports.getAllTasks = (req, res, next) => {
   Task.find()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json({ error }))
}

exports.modifyDo = (req, res, next) => {
   Task.findOne({ _id: req.params.id })
      .then((task) => {
         if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' })
         }

         task.do = req.body.do

         // Enregistrez les modifications apportées à la tâche
         return task.save()
      })
      .then(() => {
         res.status(200).json({
            message: 'Statut de la tâche modifié avec succès',
         })
      })
      .catch((error) => {
         res.status(500).json({ error })
      })
}
