import './NavBar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function NavBar() {
    let navigate = useNavigate()
    let userId = localStorage.getItem('userId')
    let backendLink = require('../server/backendLink')

    function logout() {
        localStorage.removeItem('userId')
        navigate('/')
    }

    function deleteNotes() {
        axios.delete(`${backendLink}/deleteAll/${userId}`)
            .then(res => {
                console.log(res.data)
            })
    }

    return <nav className='homepage-nav'>
        <button onClick={() => { navigate('/homepage') }}>Home</button>
        <button onClick={() => { navigate('/addNote') }}>+ Add Note</button>
        <button onClick={deleteNotes}>X Delete All</button>
        <button onClick={logout} id='navbar-logout'>Log Out</button>
    </nav>
}

export default NavBar