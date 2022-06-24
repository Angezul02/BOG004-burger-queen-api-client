import '../../assets/css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

  const Navigate = useNavigate('');

  const cerrar = () => {
    localStorage.clear()
    Navigate("/")
  }

  return (
    <nav className='Navbar'>
        <h3>Burger Queen</h3>
        <Link to="/SelectorRol" className="Navbar-btn">Selector Rol</Link>
        <Link to="/PruebaCruds" className="Navbar-btn">New order</Link>
        <Link to="/WaiterOrders" className="Navbar-btn">View Orders</Link>
        <button className="Navbar-btn" onClick={() => {cerrar()}}>LogOut</button>
    </nav>
  )
}

export default Navbar