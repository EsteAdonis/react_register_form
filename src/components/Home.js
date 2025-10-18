import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <NavLink to="/editor">Go to the Editor page</NavLink>
            <br />
            <NavLink to="/admin">Go to the Admin page</NavLink>
            <br />
            <NavLink to="/lounge">Go to the Lounge</NavLink>
            <br />
            <NavLink to="/linkpage">Go to the link page</NavLink>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home