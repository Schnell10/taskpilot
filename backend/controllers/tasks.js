const Task = require('../models/Task.js')

exports.createTask = (req, res, next) => {
   try {
      const taskObject = req.body
      delete taskObject.userId
      taskObject.do = false //On initialise le fait que la tâche n'est pas encore faite

      const task = new Task({
         ...taskObject,
         userId: req.auth.userId,
      })

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
   Task.find({ userId: req.auth.userId })
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => res.status(400).json({ error }))
}

exports.modifyDo = (req, res, next) => {
   Task.findOne({ _id: req.params.id })
      .then((task) => {
         if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' })
         }
         if (task.userId != req.auth.userId) {
            //On vérifie si c'est bien l'utilisateur qui à crée cette objet
            res.status(403).json({ message: 'unauthorized request' })
         } else {
            task.do = req.body.do

            // Enregistrez les modifications apportées à la tâche
            return task.save()
         }
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

exports.modifyTask = (req, res, next) => {
   const taskObject = { ...req.body }

   delete taskObject.userId
   Task.findOne({ _id: req.params.id }) //On récupère l'objet de la base de donnée grâce à son id
      .then((task) => {
         if (task.userId != req.auth.userId) {
            //On vérifie si c'est bien l'utilisateur qui à crée cette objet
            res.status(403).json({ message: 'unauthorized request' })
         } else {
            //Si c'est le cas, on modifie l'objet
            Task.updateOne(
               { _id: req.params.id },
               { ...taskObject, _id: req.params.id }
            )
               .then(() => {
                  res.status(200).json({ message: 'Livre modifié !' })
               })
               .catch((error) => {
                  res.status(401).json({ error })
               })
         }
      })
      .catch((error) => {
         res.status(400).json({ error })
      })
}

exports.deleteTask = async (req, res, next) => {
   try {
      const task = await Task.findOne({ _id: req.params.id })

      if (!task) {
         return res.status(404).json({ message: 'Tâche non trouvée' })
      }

      if (task.userId != req.auth.userId) {
         return res.status(403).json({ message: 'Unauthorized request' })
      }

      await Task.deleteOne({ _id: req.params.id })
      return res.status(200).json({ message: 'Tâche supprimée !' })
   } catch (error) {
      console.error('Error deleting task:', error)
      return res.status(500).json({ error })
   }
}
