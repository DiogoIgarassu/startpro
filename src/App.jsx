import React from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Flex, Icon, Image, Link, Text, HStack, Button } from "@chakra-ui/react";
import { Bell, Menu, LogOut } from "lucide-react";

import Home from "./pages/Home.jsx";
import Technician from "./pages/Technician.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Equipments from "./pages/Equipments.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useAuth } from "./auth/auth.jsx";
import logo from "./assets/logo.png";

export default function App() {
  const { pathname } = useLocation();
  const { session, logout } = useAuth();
  const crumb =
    pathname === "/" ? "Início" :
    pathname.includes("technician") ? "Técnico" :
    pathname.includes("dashboard") ? "Dashboard" :
    pathname.includes("equipments") ? "Equipamentos" :
    pathname.includes("login") ? "Login" : "";
  const nav = useNavigate();  

  return (
    <Box minH="100vh" bg="gray.50" color="gray.900">
      {/* Header */}
      <Box bg="brand.900" color="white">
        <Flex maxW="7xl" mx="auto" px={{ base: 3, md: 4 }} py={3} align="center" gap={3}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <HStack spacing={3}>
              <Image src={logo} alt="StartPro — Gestão de Manutenção" boxSize="32px" rounded="full"
                     shadow="sm" border="1px solid rgba(255,255,255,.25)" />
              <Text fontWeight="semibold" letterSpacing=".02em">STARTPRO</Text>
            </HStack>
          </Link>

          <Flex ml="auto" gap={3} align="center" opacity={0.9}>
            {session ? (
              <>
                <Text fontSize="sm" mr={2} opacity={0.9}>
                  {session.user.name} • {session.user.role === "TECH" ? "Técnico" : "Supervisor"}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  leftIcon={<Icon as={LogOut} color="currentColor" />}
                  _hover={{ bg: "whiteAlpha.300", borderColor: "white" }}
                  onClick={() => {
                    logout();                  // limpa contexto + localStorage
                    nav("/login", { replace: true }); // manda para login imediatamente
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Link as={RouterLink} to="/login" color="white">Entrar</Link>
            )}
            <Icon as={Bell} boxSize={5} aria-label="Notificações" title="Notificações" />
            <Icon as={Menu} boxSize={5} aria-hidden="true" focusable="false" />
          </Flex>
        </Flex>
      </Box>

      {/* Crumb */}
      <Box bg="brand.800" color="whiteAlpha.900">
        <Box maxW="7xl" mx="auto" px={{ base: 3, md: 4 }} py={2} fontSize="sm">{crumb}</Box>
      </Box>

      {/* Rotas */}
      <Box maxW="7xl" mx="auto" px={{ base: 3, md: 4 }} py={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protegidas */}
          <Route element={<PrivateRoute roles={["TECH"]} />}>
            <Route path="/technician" element={<Technician />} />
          </Route>
          <Route element={<PrivateRoute roles={["SUP"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Livre (se quiser manter aberta) */}
          <Route path="/equipments" element={<Equipments />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}
