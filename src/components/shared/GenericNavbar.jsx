import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const GenericNavbar = () => {
    const Navigate = useNavigate('');

    const cerrar = () => {
      localStorage.clear()
      Navigate("/")
    }
  
    return (
      <nav className='Navbar'>
          <h3>Burger Queen</h3>
          <Link to="/ManageOptions" className="Navbar-btn">Manage Options</Link>
          <button className="Navbar-btn" onClick={() => {cerrar()}}>LogOut</button>
      </nav>
    )
}

export default GenericNavbar