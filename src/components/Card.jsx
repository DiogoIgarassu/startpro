import { Box } from "@chakra-ui/react";

export default function Card({ children, ...props }) {
  return (
    <Box bg="white" border="1px" borderColor="gray.200" rounded="xl" shadow="sm" p={4} {...props}>
      {children}
    </Box>
  );
}
