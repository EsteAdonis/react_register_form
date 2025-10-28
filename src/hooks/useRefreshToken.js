import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();
	const controller = new AbortController();
	
	const refresh = async () => {
		try {
			// send a plain object (axios will set Content-Type)
			const payload = {
				username: auth?.username,
				accessToken: auth?.accessToken,
				refreshToken:auth?.refreshToken
			};

			const response = await axios.post('/refresh', JSON.stringify(payload), {
				signal: controller.signal,
				headers: { 
					'Content-Type': 'application/json',
					 Authorization: `Bearer ${auth?.accessToken}` 
				},
				// enable cookies if your refresh token is stored in httpOnly cookie
				// withCredentials: true
			});

			setAuth(prev => {
				console.log('Old Access Token: ', prev?.accessToken);
				console.log('New Access Token: ', response.data?.accessToken);
				return { ...prev, accessToken: response.data?.accessToken };
			});

			return response.data.accessToken;
		} catch (err) {
			console.error('Refresh token request failed:', err?.response ?? err.message ?? err);
			throw err;
		}
	};

	return refresh;
};

export default useRefreshToken