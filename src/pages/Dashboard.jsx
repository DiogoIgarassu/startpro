import React from "react";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "../components/Card.jsx";
import KPIStat from "../components/KPIStat.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { technicians, orders, equipments, ordersPerDay } from "../mock.js";

import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const active = technicians.filter(t => t.active).length;
  const totalTech = technicians.length;
  const done = orders.filter(o => o.status === "DONE").length;
  const totalOs = orders.length;
  const running = orders.filter(o => o.status === "RUNNING").length;
  const pending = orders.filter(o => o.status === "PENDING").length;
  const efficiency = Math.round((done / totalOs) * 100);

  const alerts = [
    { title: "Manutenção preventiva - Compressor A1", tag: "Alta Prioridade" },
    { title: "Reparo urgente - Esteira transportadora", tag: "Alta Prioridade" },
    { title: "Compressor de Ar CP-001 - Setor A - Linha 1", tag: "1 alerta" },
    { title: "Esteira EST-003 - Setor B - Linha 2", tag: "2 alertas" },
  ];

  const agg = { OK: 0, MAINT: 0, ATTENTION: 0, OFF: 0 };
  equipments.forEach(e => agg[e.status]++);

  const barData = {
    labels: ordersPerDay.labels,
    datasets: [
      { label: "Concluídas", data: ordersPerDay.done, backgroundColor: "#315ff1" },
      { label: "Pendentes",  data: ordersPerDay.pending, backgroundColor: "#f59e0b" },
    ],
  };

  const pieData = {
    labels: ["Operacional", "Em Manutenção", "Atenção", "Offline"],
    datasets: [{
      data: [agg.OK, agg.MAINT, agg.ATTENTION, agg.OFF],
      backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"],
    }],
  };

  return (
    <Box>
      {/* Turno */}
      <Card>
        <Flex wrap="wrap" gap={3} fontSize="sm" align="center">
          <Box bg="orange.100" color="orange.800" rounded="full" px={2} py={1} fontWeight="semibold">
            ● Turno Manhã
          </Box>
          <Text color="gray.600">06:00 - 14:00</Text>
        </Flex>
      </Card>

      {/* KPIs */}
      <SimpleGrid mt={4} columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <KPIStat label="Técnicos" value={`${active}/${totalTech}`} hint="Ativos / Total" />
        <KPIStat label="Ordens" value={`${done}/${totalOs}`} />
        <Card>
          <Text fontSize="sm" color="gray.600">Eficiência</Text>
          <Flex mt={1} align="center" gap={2}>
            <Heading size="md">{efficiency}%</Heading>
            <Box bg="green.100" color="green.700" rounded="full" px={2} py={0.5} fontSize="xs" fontWeight="semibold">
              Meta: 85%
            </Box>
          </Flex>
          <Box mt={2}><ProgressBar value={efficiency} /></Box>
        </Card>
        <KPIStat label="Em Andamento" value={`${running}`} hint={`${pending} pendentes`} />
      </SimpleGrid>

      {/* Alertas críticos */}
      <Card mt={4} p={0}>
        <Box bg="red.50" color="red.700" px={4} py={2} roundedTop="xl" fontWeight="semibold" fontSize="sm">
          Alertas Críticos
        </Box>
        <Box as="ul">
          {alerts.map((a, i) => (
            <Flex as="li" key={i} px={4} py={3} align="center" justify="space-between"
                  borderTop="1px" borderColor="gray.100">
              <Text color="gray.700">{a.title}</Text>
              <Box bg="red.600" color="white" rounded="full" px={2} py={0.5} fontSize="xs" fontWeight="semibold">
                {a.tag}
              </Box>
            </Flex>
          ))}
        </Box>
      </Card>

      {/* Gráficos */}
      <SimpleGrid mt={6} columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <Text fontWeight="semibold" color="gray.700" mb={2}>Ordens por Dia</Text>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } }} />
        </Card>
        <Card>
          <Text fontWeight="semibold" color="gray.700" mb={2}>Status dos Equipamentos</Text>
          <Pie data={pieData} />
        </Card>
      </SimpleGrid>
    </Box>
  );
}
