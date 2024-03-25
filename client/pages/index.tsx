import { Flex, Box } from '@chakra-ui/react'; import {
  useAppSelector,
} from '@/store';
import Form from '@/components/Form';
import Dialogue from '@/components/Dialogue';

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
      {content.data &&
        <Box>
          <Dialogue dialogues={content.data?.dialogues} title={content.data?.title} />
        </Box>
      }
    </Flex>
  );
}
