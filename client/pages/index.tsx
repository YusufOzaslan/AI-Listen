import { Flex, Box } from '@chakra-ui/react';
import Form from '@/components/Form';

export default function Home() {
  return (
    <Flex
      justify="center"
      gap="200px"
      bg="gray.200"
    >
      <Box>
        <Form />
      </Box>
    </Flex>
  );
}
