import { Flex, Box } from '@chakra-ui/react'; import {
  useAppSelector,
} from '@/store';
import Form from '@/components/Form';

export default function Home() {
  const content = useAppSelector((store) => store.content);
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
