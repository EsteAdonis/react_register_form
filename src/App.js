// import Register from './Register';
import Layout from './components/Layout';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';

import Home from './components/Home';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Lounge from './components/Lounge';

import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';


function App() {

  return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* public routes */}
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="linkpage" element={<LinkPage  />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* we want to protect these routes */}
				<Route path="/" element={<Home />} />
				<Route path="editor" element={<Editor />}/>
				<Route path="admin" element={<Admin />} />
				<Route path="lounge" element={<Lounge />} />

				{/* catch all */}
				<Route path="*" element={<Missing />} />	
			</Route>	
		</Routes>
  );
}

export default App;