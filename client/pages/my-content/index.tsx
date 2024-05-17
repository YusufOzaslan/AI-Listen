import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, } from '@/store';
import { getContents } from '@/store/thunks';
import { useApi } from '@/hooks';
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Stack
} from '@chakra-ui/react';
export default function MyContent() {
  const content = useAppSelector((store) => store.content);
  const dispatch = useAppDispatch();
  const appApi = useApi();
  const router = useRouter();

  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      position="relative"
      onClick={() => router.push(`/my-content/${item?._id}`)}
      _hover={{
        bg: useColorModeValue('green.50', 'gray.600'),
        cursor: 'pointer',
        boxShadow: 'md'
      }}
    >
      <Text fontSize="xl" fontWeight="semibold" color={textColor}>
        {item?.title}
      </Text>
      <Text mt={2} color={secondaryTextColor}>
        Level: {item?.level}
      </Text>
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
      )}
    </Stack>
  );
};
