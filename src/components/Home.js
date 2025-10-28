import { useNavigate, NavLink } from "react-router-dom";
// import { useContext } from "react";
// import  AuthContext  from "../context/AuthProvider";
import useAuth from "../context/AuthProvider";

const Home = () => {
	// const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();
	// const useAuth = useAuth();

	const logout = async () => {
		// if used in more components, this should be in context 
		// axios to /logout endpoint 
		console.log('Authorization', auth);
		setAuth({});
		navigate('/linkpage');
	}

	const navLinkStyles = ({ isActive }) => {
		return {
			fontWeight: isActive ? 'bold': 'normal',
			TextDecoration: isActive ? 'none' : 'underline'
		}
	}

	return (
		<section>
			<h1>Home</h1>
			<br />
			<p>You are logged in!</p>
			<br />
			<NavLink to="/editor" style={navLinkStyles}>Go to the Editor page</NavLink>
			<br />
			<NavLink to="/admin" style={navLinkStyles}>Go to the Admin page</NavLink>
			<br />
			<NavLink to="/lounge" style={navLinkStyles}>Go to the Lounge</NavLink>
			<br />
			<NavLink to="/linkpage" style={navLinkStyles}>Go to the link page</NavLink>
			<div className="flexGrow">
					<button onClick={logout}>Sign Out</button>
			</div>
		</section>
	)
}

export default Home