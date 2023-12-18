import {NavLink} from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h2>My navbar</h2>
            <div className="links">
                <NavLink to="/">Main page (Zad1)</NavLink>
                <NavLink to="/products">Zad 2</NavLink>
                <NavLink to="/protected">Secret</NavLink>
            </div>
        </nav>
     );
}
 
export default Navbar;