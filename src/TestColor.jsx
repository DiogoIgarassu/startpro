// src/TestColor.jsx
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  VStack,
  useColorMode,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

export default function TestColor() {
  // Hook para alternar claro/escuro
  const { colorMode, toggleColorMode } = useColorMode();

  // Valores dependentes do tema
  const bg = useColorModeValue("white", "gray.800");
  const fg = useColorModeValue("gray.800", "gray.100");
  const sub = useColorModeValue("gray.600", "gray.300");
  const card = useColorModeValue("gray.50", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box minH="60vh" display="grid" placeItems="center" px={4} py={8} bg={useColorModeValue("gray.50","gray.900")}>
      <Box
        w="100%"
        maxW="640px"
        bg={bg}
        color={fg}
        border="1px"
        borderColor={border}
        rounded="xl"
        shadow="sm"
        p={6}
      >
        <HStack justify="space-between" align="center" mb={4}>
          <Heading size="md">Teste de Tema — STARTPRO</Heading>
          <Badge colorScheme={colorMode === "light" ? "green" : "purple"}>{colorMode.toUpperCase()}</Badge>
        </HStack>

        <Text fontSize="sm" color={sub}>
          Este componente valida os hooks <code>useColorMode</code> e{" "}
          <code>useColorModeValue</code> do Chakra UI. Se as cores abaixo mudarem
          ao alternar o tema, está tudo OK. 😉
        </Text>

        <VStack align="stretch" spacing={4} mt={6}>
          <Box bg={card} border="1px" borderColor={border} rounded="lg" p={4}>
            <Text fontWeight="semibold" mb={2}>Cartão de exemplo</Text>
            <Text fontSize="sm" color={sub}>
              Fundo deste cartão usa <code>useColorModeValue</code>.
            </Text>
          </Box>

          <HStack spacing={4}>
            <Box flex="1" bg="red.600" color="white" rounded="md" p={3} textAlign="center">
              🔴 Crítico
            </Box>
            <Box flex="1" bg="orange.500" color="white" rounded="md" p={3} textAlign="center">
              🟡 Atenção
            </Box>
            <Box flex="1" bg="green.600" color="white" rounded="md" p={3} textAlign="center">
              🟢 OK
            </Box>
          </HStack>

          <Button onClick={toggleColorMode} colorScheme="facebook" alignSelf="flex-start">
            Alternar tema (claro/escuro)
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
