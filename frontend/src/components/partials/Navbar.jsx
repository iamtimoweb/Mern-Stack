import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import useLogout from "../../hooks/useLogout";

function Navbar() {
    // logout the user using the useLogout custom hook.
    const { logout } = useLogout();
    // Get the user from the global state
    const { user } = useContext(AuthContext);

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Workout Buddy
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {user && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active me-4" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active me-4" aria-current="page" to="/create">
                                    Create workout
                                </Link>
                            </li>
                        </ul>
                    )}
                    {!user && (
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active me-4" aria-current="page" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active me-4" aria-current="page" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                    {user && (
                        <form className="d-flex" onSubmit={handleLogout}>
                            <input type="text" readOnly className="text-white form-control-plaintext" id="staticEmail" value={user.email}></input>
                            <button className="btn btn-outline-success" type="submit">
                                Logout
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
