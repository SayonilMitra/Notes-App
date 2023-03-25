import './NotesListItem.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NotesListItem({ notesItem }) {

    let backendLink = require('../server/backendLink')
    let navigate = useNavigate()
    let [noteDeleted, setNoteDeleted] = useState('block')

    async function deleteNote() {
        axios.delete(`${backendLink}/deleteNote/${notesItem._id}`)
            .then(res => {
                setNoteDeleted('none')
            })
    }

    function updateNote() {
        localStorage.setItem('noteId', notesItem._id)
        navigate('/updateNote')
    }

    return <div className="note-item" style={{ display: `${noteDeleted}` }}>
        <div className='note-time-stamp'>
            {notesItem.date}, {notesItem.time}
        </div>
        <div className='note-title'>
            {notesItem.title}
        </div>
        <div className='note-text'>
            {notesItem.text.split('').slice(0, 100).join('')}...
        </div>
        <div className='note-item-buttons'>
            <button onClick={deleteNote}>Delete</button>
            <button onClick={updateNote}>Update</button>
        </div>

    </div>
}

export default NotesListItem