const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')

//On récupére le mdp mongoDb du fichier .env
const mongoDbPassword = process.env.mongoDbPassword

//On connecte notre serveur à mongoDB
mongoose
   .connect(mongoDbPassword)
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express() //On crée une instance de l'application Express

// Utilisation de Helmet comme middleware
app.use(helmet())

// Configuration du CORS pour autoriser les requêtes provenant du frontend hébergé sur Vercel
app.use(
   cors({
      origin: 'https://taskpilot-theta.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: [
         'Origin',
         'X-Requested-With',
         'Content',
         'Accept',
         'Content-Type',
         'Authorization',
      ],
   })
)

// Utilisation d'express.json() au lieu de bodyParser
//(extrait les données JSON de la demande entrante et les rend disponibles dans un format JavaScript)
app.use(express.json())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

module.exports = app
