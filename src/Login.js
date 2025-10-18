import {useState, useEffect, useRef, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import axios from './api/axios';

const LOGING_URL = 'http://localhost:5078/login';

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const usernameRef = useRef();
	const errorRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');	
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

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
				const accessToken = response?.data?.token;
				setAuth({ username, password, accessToken });
				//clear state and controlled inputs
				//need value attrib on inputs for this
				setUsername('');
				setPassword('');	
				setSuccess(true);
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
				setSuccess(false);
				errorRef.current.focus();
				console.log(err);
			}
	};

	return (
		<>
			{success ? (
				<section>	
					<h1>You are logged in!</h1>
					<br />
					<p>Go to <a href="#">Home</a></p>
				</section>
			) : (
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
						<a href="#">Sign Up</a>
					</span>
				</p>
			</section>
			)}
		</>
	)
}

export default Login

