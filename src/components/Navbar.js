import React from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'


const Navbar = (props) => {
    const location=useLocation();
    let history=useNavigate();
    const {showAlert}=props;
    const handleOnClick=()=>{
        localStorage.removeItem('token');
        history('/Login');
        showAlert({type:'success',message:'Successfully logged out'});
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Home"?"Active":""}`} aria-current="page" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/About"?"Active":""}`} aria-current="page" to="/About">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="btn btn-dark mx-1" to="/Login" role="button">Login</Link>
                        <Link className="btn btn-dark mx-1" to="/Signup" role="button">Sign Up</Link>
                    </form>:<button className="btn btn-dark" onClick={handleOnClick}>Log Out</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
