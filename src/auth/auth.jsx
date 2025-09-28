// src/auth/auth.js
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// DEMO: base multitenant (empresa) + usuários mockados
const MOCK_TENANTS = [
  {
    companyId: "minx", companyName: "Mineração X",
    users: [
      { id: 1, name: "Carlos Silva", email: "carlos@minx.com", role: "TECH", password: "123456" },
      { id: 2, name: "Ana Souza",    email: "ana@minx.com",    role: "SUP",  password: "123456" },
    ],
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null); // {companyId, companyName, user:{...}}

  // carrega do localStorage
  useEffect(() => {
    const raw = localStorage.getItem("startpro.session");
    if (raw) setSession(JSON.parse(raw));
  }, []);

  const login = async ({ companyId, email, password }) => {
    // encontra empresa
    const tenant = MOCK_TENANTS.find(t => t.companyId.toLowerCase() === companyId.toLowerCase());
    if (!tenant) throw new Error("Empresa não encontrada.");

    // encontra usuário
    const user = tenant.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error("Usuário não encontrado.");

    // senha mock
    if (user.password !== password) throw new Error("Senha inválida.");

    const sess = { companyId: tenant.companyId, companyName: tenant.companyName, user: { ...user, password: undefined } };
    setSession(sess);
    localStorage.setItem("startpro.session", JSON.stringify(sess));
    return sess;
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("startpro.session");
  };

  const value = useMemo(() => ({ session, login, logout }), [session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de <AuthProvider>");
  return ctx;
}

// helpers de autorização
export function hasRole(session, ...roles) {
  return !!session && roles.includes(session.user?.role);
}
