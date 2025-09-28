import React from "react";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Card from "../components/Card.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { equipments } from "../mock.js";

const STATUS = {
  OK:        { label: "Operacional",       bg: "green.600"  },
  ATTENTION: { label: "Atenção",           bg: "orange.500" },
  MAINT:     { label: "Em Manutenção",     bg: "blue.600"   },
  OFF:       { label: "Offline",           bg: "gray.600"   },
};

export default function Equipments() {
  return (
    <Box>
      <Heading size="md" mb={4}>Status dos Equipamentos</Heading>

      <SimpleGrid spacing={4} columns={1}>
        {equipments.map(eq => {
          const st = STATUS[eq.status];
          return (
            <Card key={eq.id}>
              <Flex align="start" justify="space-between" gap={4} direction={{ base: "column", md: "row" }}>
                <Box>
                  <Heading size="sm">{eq.name}</Heading>
                  <Text color="gray.600" fontSize="sm">{eq.sector}</Text>

                  <Box mt={4}>
                    <Text mb={1} fontSize="sm" color="gray.600">Uptime</Text>
                    <ProgressBar value={eq.uptime} />
                  </Box>
                </Box>

                <Box textAlign={{ base: "left", md: "right" }}>
                  {eq.alerts > 0 && (
                    <Box px={2} py={0.5} rounded="full" bg="red.600" color="white"
                         fontSize="xs" fontWeight="semibold" display="inline-block">
                      {eq.alerts} alerta{eq.alerts > 1 ? "s" : ""}
                    </Box>
                  )}
                  <Box mt={2} px={2} py={0.5} rounded="full" bg={st.bg} color="white"
                       fontSize="xs" fontWeight="semibold" display="inline-block">
                    {st.label}
                  </Box>
                  <Text mt={2} fontSize="sm" fontWeight="medium">{eq.uptime}%</Text>
                </Box>
              </Flex>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
