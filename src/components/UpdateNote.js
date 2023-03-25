import { useState, useEffect } from "react"
import './UpdateNote.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"

function UpdateNote() {

    let backendLink = require('../server/backendLink')
    let navigate = useNavigate()
    let [updateTitle, setUpdateTitle] = useState('')
    let [updateText, setUpdateText] = useState('')
    let noteId = localStorage.getItem('noteId')

    function updateNote() {
        axios.put(`${backendLink}/updateNote`, {
            title: updateTitle,
            text: updateText,
            noteId: noteId,
        }).then(res => {
            navigate('/homepage')
        })
    }

    return <>
        <NavBar />
        <div className="update-note">
            <div className="update-title">
                Title <br />
                <input type='text' placeholder="Title"
                    onChange={(e) => setUpdateTitle(e.target.value)}
                />
            </div>
            <div className="update-text">
                Description <br />
                <textarea placeholder="Description"
                    onChange={(e) => setUpdateText(e.target.value)}
                />
            </div>
            <button id="update-btn" onClick={updateNote}>Update Note</button>
        </div>
    </>

}

export default UpdateNote