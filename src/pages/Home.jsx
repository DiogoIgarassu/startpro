import React from "react";
import {
  Box, Button, Flex, Heading, Icon, SimpleGrid, Text, Link as ChakraLink,
  HStack, Stack, Divider
} from "@chakra-ui/react";
import { Smartphone, Monitor, Users, ClipboardCheck, Gauge, Wrench } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import Card from "../components/Card.jsx";
import KPIStat from "../components/KPIStat.jsx";

function Bullet({ color, children }) {
  return (
    <HStack spacing={2}>
      <Box boxSize="8px" rounded="full" bg={color} />
      <Text>{children}</Text>
    </HStack>
  );
}

export default function Home() {
  return (
    <Box>
      {/* Fundo suave como no Figma */}
      <Box
        bgGradient="linear(to-b, white, brand.50)"
        rounded="2xl"
        px={{ base: 4, md: 10 }}
        py={{ base: 8, md: 12 }}
        border="1px"
        borderColor="transparent"
      >
        {/* Pílula STARTPRO */}
        <Flex justify="center">
          <HStack
            spacing={2}
            px={4}
            py={1.5}
            rounded="full"
            bg="brand.700"
            color="white"
            shadow="sm"
          >
            <Icon as={Wrench} boxSize={4} aria-hidden="true" />
            <Text fontSize="sm" fontWeight="semibold" letterSpacing=".02em">STARTPRO</Text>
          </HStack>
        </Flex>

        {/* Título e subtítulo */}
        <Heading
          mt={5}
          textAlign="center"
          size="lg"
          lineHeight="1.2"
        >
          Sistema de Gestão de Manutenção Industrial
        </Heading>
        <Text mt={2} color="gray.600" textAlign="center" fontSize={{ base: "sm", md: "md" }}>
          Otimize o início dos turnos de manutenção com ferramentas dedicadas para
          técnicos e supervisores.
        </Text>

        {/* Cards principais */}
        <SimpleGrid mt={8} columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Card Técnico */}
          <Card p={6}>
            <Stack direction="row" spacing={3} align="start">
              <Box bg="brand.50" p={3} rounded="xl">
                <Icon as={Smartphone} color="brand.700" aria-label="Interface Técnico" title="Interface Técnico" />
              </Box>
              <Box flex="1">
                <Heading size="md">Interface Técnico</Heading>
                <Text color="gray.600">Visualização otimizada para dispositivos móveis</Text>

                <Stack mt={3} spacing={1.5} color="gray.700" fontSize="sm">
                  <Bullet color="blue.500">Ordens de serviço atribuídas</Bullet>
                  <Bullet color="orange.500">Status dos equipamentos</Bullet>
                  <Bullet color="gray.500">Interface intuitiva e rápida</Bullet>
                </Stack>

                <Button
                  mt={4}
                  colorScheme="facebook"
                  as={ChakraLink}
                  asChild
                  w={{ base: "100%", sm: "auto" }}
                >
                  <RouterLink to="/technician">Acessar como Técnico →</RouterLink>
                </Button>
              </Box>
            </Stack>
          </Card>

          {/* Card Supervisor */}
          <Card p={6}>
            <Stack direction="row" spacing={3} align="start">
              <Box bg="orange.50" p={3} rounded="xl">
                <Icon as={Monitor} color="orange.600" aria-label="Painel Supervisor" title="Painel Supervisor" />
              </Box>
              <Box flex="1">
                <Heading size="md">Painel Supervisor</Heading>
                <Text color="gray.600">Dashboard completo para gestão e supervisão</Text>

                <Stack mt={3} spacing={1.5} color="gray.700" fontSize="sm">
                  <Bullet color="orange.500">Analytics e relatórios</Bullet>
                  <Bullet color="orange.500">Gestão de equipe</Bullet>
                  <Bullet color="orange.500">Controle de ordens de serviço</Bullet>
                </Stack>

                <Button
                  mt={4}
                  bg="orange.600"
                  _hover={{ bg: "orange.500" }}
                  color="white"
                  as={ChakraLink}
                  asChild
                  w={{ base: "100%", sm: "auto" }}
                >
                  <RouterLink to="/dashboard">Acessar como Supervisor →</RouterLink>
                </Button>
              </Box>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* KPIs em estilo cartão fino, como no Figma */}
        <SimpleGrid mt={6} columns={{ base: 1, md: 4 }} spacing={4}>
          <Card p={4}>
            <Text fontSize="sm" color="gray.600">Técnicos Ativos</Text>
            <Heading size="lg" mt={1}>7</Heading>
          </Card>

          <Card p={4}>
            <Text fontSize="sm" color="gray.600">Ordens Pendentes</Text>
            <Heading size="lg" mt={1}>2</Heading>
          </Card>

          <Card p={4}>
            <Text fontSize="sm" color="gray.600">Eficiência</Text>
            <HStack mt={1} align="baseline" spacing={2}>
              <Heading size="lg" color="green.600">87%</Heading>
              <Text fontSize="xs" color="gray.500">Meta 85%</Text>
            </HStack>
          </Card>

          <Card p={4}>
            <Text fontSize="sm" color="gray.600">Equipamentos em Atenção</Text>
            <Heading size="lg" mt={1} color="orange.600">3</Heading>
          </Card>
        </SimpleGrid>

        {/* Faixa “Versão Demo” */}
        <Flex mt={5} justify="center">
          <HStack
            spacing={2}
            px={3}
            py={1}
            rounded="full"
            border="1px solid"
            borderColor="gray.200"
            bg="whiteAlpha.900"
          >
            <Text fontSize="xs" color="gray.600">Versão Demo — Dados Simulados</Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
