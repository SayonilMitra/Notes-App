const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const notesModel = require('./models/notesModel')
const userModel = require('./models/userModel')
const privateKey = require('./privateKey')

app.use(express.json())
app.use(cors())

//----------- Add new user to database -----------
app.post('/signUp', cors(), (req, res) => {
    // process request information
    let { userName, password } = req.body
    let token = jwt.sign(password, privateKey)

    async function addUser() {
        let newUser = await new userModel({
            userName: userName,
            password: token
        })
        await newUser.save()
        res.end(JSON.stringify(newUser))
    }
    if (userName === '' || password === '') {
        res.end('username and password are required')
    } else {
        addUser()
    }
})

//----------- check user login data in database -----------
app.post('/login', cors(), (req, res) => {
    // process request information
    let { userName, password } = req.body
    let token = jwt.sign(password, privateKey)

    async function loginUser() {
        let user = await userModel.find({
            userName: userName,
            password: token
        })
        if (user.length === 0) {
            res.end('user not found')
        } else {
            res.end(JSON.stringify({
                status: 'ok',
                loggedInUserId: user[0]._id
            }))

        }

    }
    if (userName === '' || password === '') {
        res.end('username and password are required')
    } else {
        loginUser()
    }

})

//----------- Get List of All Notes from database -----------
app.post('/notes', cors(), (req, res) => {
    let { userId } = req.body
    async function getNotes() {
        let notesList = await notesModel.find({ userId: userId })
        res.end(JSON.stringify(notesList))
    }
    getNotes()
})

//----------- add new note to database -----------
app.post('/addNote', cors(), (req, res) => {
    let { title, text, userId } = req.body
    let currentDate = new Date()
    let date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`
    async function addNote() {
        let newNote = await new notesModel({
            title: title,
            text: text,
            date: date,
            time: time,
            userId: userId
        })
        await newNote.save()
        res.end(JSON.stringify(newNote))
    }
    addNote()
})

//----------- update note to database -----------
app.put('/updateNote', cors(), (req, res) => {
    // process request information
    let { title, text, noteId } = req.body
    async function updateNote() {
        let note = await notesModel.findOne({ _id: noteId })
        if (title !== '') {
            note.title = title
        }
        if (text !== '') {
            note.text = text
        }
        await note.save()
        res.end(JSON.stringify(note))
    }
    if (title === '' && text === '') {
        res.end('at least 1 field is required')
    } else {
        updateNote()
    }

})

//----------- delete note from database -----------
app.delete('/deleteNote/:noteId', cors(), (req, res) => {
    let noteId = req.params.noteId
    console.log(req.body)
    async function deleteNote() {
        try {
            await notesModel.deleteOne({ _id: noteId })
            res.end('ok')
        } catch (error) {
            res.end('note with id not found')
        }

    }
    deleteNote()
})

//----------- delete all notes of user from database -----------
app.delete('/deleteAll/:userId', cors(), (req, res) => {
    let userId = req.params.userId
    async function deleteAllNotes() {
        try {
            await notesModel.deleteMany({ userId: userId })
            res.end('ok')
        } catch (error) {
            res.end('user with id not found')
        }

    }
    deleteAllNotes()
})

mongoose.connect('mongodb+srv://root:sayonil@cluster0.vzcr6q5.mongodb.net/?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost:27017')

app.listen(8000, () => {
    console.log('Back End Running')
})

//module.exports = app