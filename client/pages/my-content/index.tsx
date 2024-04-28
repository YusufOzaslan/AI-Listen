import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, } from '@/store';
import { getContents } from '@/store/thunks';
import { useApi } from '@/hooks';
import {
  Box,
  Flex,
  Text,
  Input,
  SimpleGrid,
  useColorModeValue,
  useToast,
  useBoolean,
  Button,
  Stack
} from '@chakra-ui/react';

export default function MyContent() {
  const content = useAppSelector((store) => store.content);
  const dispatch = useAppDispatch();
  const appApi = useApi();
  const router = useRouter();

  useEffect(() => {
    dispatch(getContents(appApi));
  }, []);

  const redirectToDialogueGeneratorPage = () => {
    router.push('/dialogue-generator');
  };

  const renderContents = content.myData?.map((item: any) => (
    <Box
      key={item?._id}
      id={item?._id}
      p={4}
      bg={useColorModeValue('gray.100', 'gray.800')}
      borderRadius="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="relative"
    >
      <Text fontSize="xl" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>
        {item?.title}
      </Text>
      <Text mt={2} color={useColorModeValue('gray.600', 'gray.400')}>
        Level: {item?.level}
      </Text>
      <Button
        colorScheme="green"
        onClick={() => router.push(`/my-content/${item?._id}`)}
        position="absolute"
        bottom={2}
        right={2}
      >
        View Content
      </Button>
    </Box>
  ));

  return (
    <Stack spacing={8}>
      {!content.myData ? (
        <button onClick={redirectToDialogueGeneratorPage}>No dialogue found, go to the dialogue generator page</button>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="20px">
          {renderContents}
        </SimpleGrid>
      )}\
    </Stack>
  );
};
