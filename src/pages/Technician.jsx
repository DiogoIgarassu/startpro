import React, { useMemo, useState } from "react";
import { Box, Button, Flex, Heading, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { MapPin, Timer, User } from "lucide-react";
import Card from "../components/Card.jsx";
import Tabs from "../components/Tabs.jsx";
import {
  technicians,
  orders,
  OS_STATUS,
  PRIORIDADE,
  CRITICIDADE,
} from "../mock.js";

export default function Technician() {
  const me = technicians[0]; // Carlos Silva (mock)
  const myOrders = useMemo(() => orders.filter((o) => o.assigneeId === me.id), [me.id]);
  const [tab, setTab] = useState("orders");

  const kpis = {
    pending: myOrders.filter((o) => o.status === OS_STATUS.PENDENTE).length,
    running: myOrders.filter((o) => o.status === OS_STATUS.EM_EXECUCAO).length,
    done: myOrders.filter((o) => o.status === OS_STATUS.CONCLUIDO).length,
  };

  return (
    <Box>
      {/* Faixa superior */}
      <Box bg="brand.800" color="white" p={5} rounded="xl">
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Heading size="md">{me.name}</Heading>
            <Text color="whiteAlpha.800">Turno {me.shift}</Text>
          </Box>
          <HStack spacing={8}>
            <Box textAlign="center">
              <Heading size="lg">{kpis.pending}</Heading>
              <Text>Pendentes</Text>
            </Box>
            <Box textAlign="center">
              <Heading size="lg">{kpis.running}</Heading>
              <Text>Em Andamento</Text>
            </Box>
            <Box textAlign="center">
              <Heading size="lg">{kpis.done}</Heading>
              <Text>Concluídas</Text>
            </Box>
          </HStack>
        </Flex>

        <Box mt={4}>
          <Tabs
            tabs={[
              { value: "orders", label: "Minhas Ordens" },
              { value: "equip", label: "Equipamentos" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </Box>
      </Box>

      {tab === "orders" ? <OrdersList items={myOrders} /> : <EquipShortcut />}
    </Box>
  );
}

function OrdersList({ items }) {
  const visible = items.filter((i) => i.status !== OS_STATUS.CONCLUIDO);

  const critToColor = (c) => {
    switch (c) {
      case CRITICIDADE.VERMELHO:
        return "red.600";
      case CRITICIDADE.AMARELO:
        return "orange.500";
      case CRITICIDADE.VERDE:
      default:
        return "green.600";
    }
  };

  return (
    <SimpleGrid mt={6} spacing={4} columns={1}>
      {visible.map((o) => (
        <Card key={o.id}>
          <Flex
            align="start"
            justify="space-between"
            gap={4}
            direction={{ base: "column", md: "row" }}
          >
            <Box>
              <Heading size="sm">{o.title}</Heading>
              <Text color="gray.600" fontSize="sm">
                {o.equipment}
              </Text>
              <HStack mt={3} spacing={5} fontSize="sm" color="gray.700">
                <HStack>
                  <Icon as={MapPin} /> <Text>{o.sector}</Text>
                </HStack>
                <HStack>
                  <Icon as={Timer} />{" "}
                  <Text>
                    {(o.estimateMin / 60) | 0}h {o.estimateMin % 60}min
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={User} />{" "}
                  <Text>{o.assigneeId === 1 ? "Carlos Silva" : "Técnico"}</Text>
                </HStack>
              </HStack>
            </Box>

            <Box textAlign={{ base: "left", md: "right" }}>
              <HStack spacing={2} justify={{ base: "flex-start", md: "flex-end" }}>
                {o.priority === PRIORIDADE.ALTA && <BadgePill color="red.600">ALTA</BadgePill>}
                {o.priority === PRIORIDADE.BAIXA && <BadgePill color="gray.600">BAIXA</BadgePill>}

                {o.status === OS_STATUS.PENDENTE && (
                  <BadgePill color="gray.500">PENDENTE</BadgePill>
                )}
                {o.status === OS_STATUS.EM_EXECUCAO && (
                  <BadgePill color="orange.500">EM EXECUÇÃO</BadgePill>
                )}
                {o.status === OS_STATUS.CONCLUIDO && (
                  <BadgePill color="green.600">CONCLUÍDO</BadgePill>
                )}
              </HStack>

              {/* Semáforo simples (criticidade) */}
              <HStack mt={2} justify={{ base: "flex-start", md: "flex-end" }} spacing={2}>
  <Box boxSize="8px" rounded="full" bg={critToColor(o.criticLight)} />
  <Text fontSize="xs" color="gray.600">Criticidade</Text>
</HStack>

              <Button mt={2} colorScheme="facebook">
                {o.status === OS_STATUS.PENDENTE ? "Iniciar" : "Continuar"}
              </Button>
            </Box>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  );
}

function EquipShortcut() {
  return (
    <Card mt={6}>
      <Heading size="sm" color="gray.700">
        Status dos Equipamentos
      </Heading>
      <Text mt={2} fontSize="sm" color="gray.600">
        Veja a disponibilidade (Uptime) e alertas por ativo.
      </Text>
      <Button mt={4} colorScheme="facebook" as="a" href="/equipments">
        Abrir lista completa →
      </Button>
    </Card>
  );
}

function BadgePill({ color, children }) {
  return (
    <Box
      px={2}
      py={0.5}
      rounded="full"
      bg={color}
      color="white"
      fontSize="xs"
      fontWeight="semibold"
      display="inline-block"
    >
      {children}
    </Box>
  );
}
