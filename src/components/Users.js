import { useState, useEffect } from 'react';
// import axios from '../api/axios';
// import useAuth from "../hooks/useAuth";
import useAuth from '../context/AuthProvider'
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState([]);
	const { auth } = useAuth();
	const refresh = useRefreshToken();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();	

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getusers = async () => {
			try{
				const response = await axiosPrivate.get('/getusers', {
					signal: controller.signal
					,headers: { Authorization: `Bearer ${auth?.accessToken}` }
				});
				console.log(response.data);
				isMounted && setUsers(response.data);
			} catch(err) {
				if (err.name === 'CanceledError') {
					console.log('Request was canceled');
					return;
				}
				console.error("Error Message => ",err.message);
				console.error("Error Details =>", err.response?.request?.statusText);
				
				navigate('/login', { state: { from: location }, replace: true });
			}
		}
		getusers();
		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [auth?.accessToken, axiosPrivate, location, navigate]);

	return (
		<article>
			<h2>Users List</h2>
			{users?.length
				? (<ul>
						{users.map((user, i) => <li key={i}>{user?.userName}</li>)}
					</ul>)
				: <p>No users to display</p>
			}
			<button onClick={()=> refresh()}>Refresh</button>
		</article>
	)
}

export default Users