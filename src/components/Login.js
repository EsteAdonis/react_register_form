import {useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate } from 'react-router-dom';

const LOGING_URL = 'http://localhost:5078/login';

const Login = () => {
	const { setAuth } = useAuth();
	//const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const usernameRef = useRef();
	const errorRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');	
	const [errMsg, setErrMsg] = useState('');
	//const [success, setSuccess] = useState(false);

	useEffect(() => {
		usernameRef.current.focus();
	}, []);
	
	useEffect(() => {
		setErrMsg('');
	}, [username, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();	
		try {	
				const response = await axios.post(LOGING_URL,
					JSON.stringify({ username, password }),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				);
				console.log(JSON.stringify(response?.data));
				const accessToken = response?.data?.accessToken;
				const refreshToken = response?.data?.refreshToken;
				// const roles = response?.data?.roles;
				// Normalize roles as array; example uses Admin role numeric value
				const roles = [5150]; // should come from response.data.roles in real API
				setAuth({ username, password, roles, accessToken, refreshToken });
				//clear state and controlled inputs
				//need value attrib on inputs for this
				setUsername('');
				setPassword('');	
				// navigate(from, { replace: true });
				navigate('/Admin')
				// setSuccess(true);
			} catch (err) {
				if (!err?.response) {
					setErrMsg('No Server Response');
				} else if (err.response?.status === 400) {
					setErrMsg('Missing Username or Password');
				} else if (err.response?.status === 401) {
					setErrMsg('Unauthorized');
				} else{
					setErrMsg('Login Failed');
				}
				// setSuccess(false);
				errorRef.current.focus();
				console.log(err);
			}
	};

	return (
		<>
			<section>
				<p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						autoComplete="off"
						ref={usernameRef}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit">Login</button>
				</form>
				<p>
					need an Account?<br />
					<span className="line">
						<Link to="/register">Sign Up</Link>
					</span>
				</p>
			</section>
		</>
	)
}

export default Login

