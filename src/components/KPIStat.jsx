import { Flex, Text } from "@chakra-ui/react";
import Card from "./Card.jsx";
export default function KPIStat({ label, value, hint, right }) {
  return (
    <Card>
      <Text fontSize="sm" color="gray.600">{label}</Text>
      <Flex mt={1} align="baseline" justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold">{value}</Text>
        {right}
      </Flex>
      {hint && <Text mt={1} fontSize="xs" color="gray.500">{hint}</Text>}
    </Card>
  );
}
