import './HomePage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NotesListItem from './NotesListItem'
import NavBar from './NavBar'

function HomePage() {

    //let [search, setSearch] = useState('')
    let userId = localStorage.getItem('userId')
    let [notesList, setNotesList] = useState([])
    let backendLink = require('../server/backendLink')

    useEffect(() => {
        axios.post(`${backendLink}/notes`, {
            userId: userId
        }).then(res => {
            setNotesList(res.data)
        })
    }, [])

    function searchText(e) {
        let search = e.target.value
        let arr = []
        if (notesList.length > 0) {
            if (search === '') {
                axios.post(`${backendLink}/notes`, {
                    userId: userId
                }).then(res => {
                    setNotesList(res.data)
                })
            } else {
                for (let i = 0; i < notesList.length; i++) {
                    let title = notesList[i].title
                    //for (let j = 0; j < title.length - search.length; j++) {
                    //    let temp = title.subString(j, search.length)
                    //    if (temp === search) {
                    //        arr.push(notesList[i])
                    //        break
                    //    }
                    //}
                }
                setNotesList([...arr])
            }

        }
    }

    return <div className='homepage'>
        <NavBar />
        <div className='homepage-search-bar'>
            <input type='text' placeholder='Search'
                onChange={(e) => {
                    searchText(e)
                }} />
        </div>
        <div>
            <ul>
                {notesList.map((item, index) => {
                    return <li key={index}>
                        <NotesListItem notesItem={item} />
                    </li>
                })}
            </ul>
        </div>
    </div>
}

export default HomePage