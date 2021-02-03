const { age, date } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    filter,
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render('students/index', { students, filter, pagination })
            }
        }

        Student.paginate(params)
    },
    create(req, res){
        Student.teacherSelectOptions(function(options){
            return res.render('students/create', { teacherOptions: options })
        })
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos!")
            }
        }
    
        Student.create(req.body, function(student){
            return res.redirect(`/estudantes/${student.id}`)
        })
        
    },
    show(req, res){
        Student.find(req.params.id, function(student){
            
            student.birth = age(student.birth)
            student.created_at = date(student.created_at).format

            return res.render('students/show', { student })
        })
    },
    edit(req, res){
        Student.find(req.params.id, function(student){

            student.birth = date(student.birth).iso

            Student.teacherSelectOptions(function(options){
                return res.render('students/edit', { student, teacherOptions: options })
            })

        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos!")
            }
        }

        Student.update(req.body, function(){
            return res.redirect(`/estudantes/${req.body.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/estudantes`)
        })
    }
}

