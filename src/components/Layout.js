import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<main className="App">
			<Outlet />
		</main>
	)
}

export default Layout







// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Dashboard from "./Dashboard";

// const Layout = () => {
//   return (
//     <div>
//       <header>
//         <h1>My App</h1>
//         <nav>
//           <a href="/">Home</a> | <a href="/about">About</a> | <a href="/dashboard">Dashboard</a>
//         </nav>
//       </header>
//       <main>
//         {/* Child routes will be rendered here */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="dashboard" element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;