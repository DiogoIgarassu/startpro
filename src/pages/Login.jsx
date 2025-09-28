// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input,
  InputGroup, InputRightElement, Link, Text, useToast, Icon
} from "@chakra-ui/react";
import { Lock, Building2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.jsx";
import logo from "../assets/logo.png";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // valores demo para facilitar testes
  const [companyId, setCompanyId] = useState("minx");
  const [email, setEmail] = useState("carlos@minx.com");
  const [password, setPassword] = useState("123456");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const sess = await login({ companyId, email, password });
      toast({ title: `Bem-vindo, ${sess.user.name}`, status: "success", duration: 2000 });
      // redireciona conforme papel
      if (sess.user.role === "TECH") nav("/technician", { replace: true });
      else nav("/dashboard", { replace: true });
    } catch (err) {
      toast({ title: "Falha no login", description: err.message, status: "error", duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="70vh" align="center" justify="center" px={4}>
      <Box w="100%" maxW="420px" bg="white" border="1px" borderColor="gray.200" rounded="xl" shadow="sm" p={6}>
        <Flex direction="column" align="center" gap={2} mb={4}>
          <Box as="img" src={logo} alt="Logo StartPro" w="56px" h="56px" rounded="full" />
          <Heading size="md">Entrar no StartPro</Heading>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Acesse com sua empresa e credenciais. (Demo: <b>minx</b> / carlos@minx.com / 123456 ou ana@minx.com / 123456)
          </Text>
        </Flex>

        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={3} isRequired>
            <FormLabel>Empresa</FormLabel>
            <InputGroup>
              <InputLeftIcon icon={<Building2 />} />
              <Input  ps="10" value={companyId} onChange={(e) => setCompanyId(e.target.value)} placeholder="ex.: minx" />
            </InputGroup>
          </FormControl>

          <FormControl mb={3} isRequired>
            <FormLabel>E-mail</FormLabel>
            <InputGroup>
              <InputLeftIcon icon={<Mail />} />
              <Input  ps="10" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@empresa.com" />
            </InputGroup>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="3rem">
                <Button size="sm" variant="ghost" onClick={() => setShowPass(v => !v)}>
                  {showPass ? "Ocultar" : "Ver"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Flex align="center" justify="space-between" mb={4}>
            <Checkbox defaultChecked>Manter conectado</Checkbox>
            <Link fontSize="sm" color="brand.700">Esqueci minha senha</Link>
          </Flex>

          <Button type="submit" colorScheme="facebook" w="100%" isLoading={loading} leftIcon={<Icon as={Lock} />}>
            Entrar
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

/** helpers locais para InputLeftIcon */
function InputLeftIcon({ icon }) {
  return (
    <InputRightElement left="0" right="auto" width="2.5rem" pointerEvents="none">
      <Icon as={icon.type} />
    </InputRightElement>
  );
}
