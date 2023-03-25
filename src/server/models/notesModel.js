const mongoose = require('mongoose')

let notesSchema = mongoose.Schema({
    title: String,
    text: String,
    date: String,
    time: String,
    userId: String
})

let notesModel = mongoose.model('notes', notesSchema)

module.exports = notesModel