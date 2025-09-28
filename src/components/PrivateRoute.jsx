// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, hasRole } from "../auth/auth.jsx";

export default function PrivateRoute({ roles }) {
  const { session } = useAuth();

  if (!session) return <Navigate to="/login" replace />;

  if (roles && !hasRole(session, ...roles)) {
    // sem permissão → redireciona para home (ou dashboard)
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
