import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import useAuth from '../context/AuthProvider'

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	// Normalize roles into an array for safe checking
	const userRoles = React.useMemo(() => {
		const r = auth?.roles;
		if (!r) return [];
		return Array.isArray(r) ? r : [r];
	}, [auth?.roles]);

	const hasAccess = userRoles.some(role => allowedRoles?.includes(role));

	return (
		hasAccess
			? <Outlet />
			: auth?.user
				? <Navigate to="/unauthorized" state={{ from: location }} replace />
				: <Navigate to="/login" state={{ from: location }} replace />
	);
}

export default RequireAuth;