import Info from '@/components/info/info';
import Main from '@/components/main/main';
import { Box, Select, SimpleGrid } from '@chakra-ui/react';

export default function Page() {
  return (
    <div>
      <SimpleGrid columns={[1, 2]} spacing="40px">
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </div>
  );
}
