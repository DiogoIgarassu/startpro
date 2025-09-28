import { HStack, Button } from "@chakra-ui/react";
export default function Tabs({ tabs=[], active, onChange }) {
  return (
    <HStack spacing="1" borderBottom="1px" borderColor="gray.200">
      {tabs.map(t=>(
        <Button key={t.value} variant="ghost" size="sm"
          borderBottom="2px" borderColor={active===t.value ? "brand.600":"transparent"}
          color={active===t.value ? "brand.700":"gray.500"}
          onClick={()=>onChange(t.value)} rounded="none">
          {t.label}
        </Button>
      ))}
    </HStack>
  );
}
