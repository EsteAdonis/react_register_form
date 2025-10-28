// import Register from './Register';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Profile from './components/Profile';

import Home from './components/Home';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Lounge from './components/Lounge';

import RequireAuth from './components/RequireAuth';

const LazyUnauthorized = React.lazy(() => './components/Unauthorized.js');

const ROLES = {
	'User': 2001,
	'Editor': 1984,
	'Admin': 5150
}

function App() {

  return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* public routes */}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="linkpage" element={<LinkPage  />} />
				<Route path="profile" element={<Profile />} />
				<Route index path="home" element={<Home />} />				
				<Route 
					path="unauthorized" 
					element={
						<React.Suspense fallback='Loading...'>
							<LazyUnauthorized />
						</React.Suspense>
					} 
				/>

				{/* we want to protect these routes */}
				{/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />} >
					<Route path="/" element={<Home />} />
				</Route> */}

				<Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />} >
					<Route path="editor" element={<Editor />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
					<Route path="admin" element={<Admin />} />
				</Route>

				<Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />} >
					<Route path="lounge" element={<Lounge />} />
				</Route>

				{/* catch all */}
				<Route path="*" element={<Missing />} />	
			</Route>	
		</Routes>
  );
}

export default App;