import { Box } from "@chakra-ui/react";
export default function ProgressBar({ value }) {
  return (
    <Box h="2" w="100%" bg="gray.200" rounded="full">
      <Box h="2" bg="brand.600" rounded="full" w={`${Math.min(100, Math.max(0, value))}%`} />
    </Box>
  );
}
