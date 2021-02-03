const express = require('express')
const routes = express.Router()
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

routes.get('/', function(req, res){
    return res.redirect('/professores')
})

// TEACHERS

routes.get('/professores', teachers.index)
routes.get('/professores/criar', teachers.create)
routes.get('/professores/:id', teachers.show)
routes.get('/professores/:id/editar', teachers.edit)
routes.post('/professores', teachers.post)
routes.put('/professores', teachers.put)
routes.delete('/professores', teachers.delete)

// STUDENTS

routes.get('/estudantes', students.index)
routes.get('/estudantes/criar', students.create)
routes.get('/estudantes/:id', students.show)
routes.get('/estudantes/:id/editar', students.edit)
routes.post('/estudantes', students.post)
routes.put('/estudantes', students.put)
routes.delete('/estudantes', students.delete)

module.exports = routes