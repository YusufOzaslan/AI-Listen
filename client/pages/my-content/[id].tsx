import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getContent, getQuestion } from '@/store/thunks';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector, } from '@/store';
import { resetData, resetQuestion } from '@/store/slices';
import { SpeechSample } from '@/components/SpeechSample';
import {
  Avatar,
  HStack,
  Box,
  Stack,
  Text,
  TextareaProps,
  Flex
} from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const content = useAppSelector((store) => store.content);
  const appApi = useApi();

  const redirectToDialogueGeneratorPage = () => {
    router.push('/dialogue-generator');
  };

  useEffect(() => {
    const id = router.query.id as any;
    if (id) {
      dispatch(getContent({ axios: appApi, contentId: id }));
      dispatch(getQuestion({ axios: appApi, contentId: id }));
    }
    return () => {
      dispatch(resetQuestion());
      dispatch(resetData());
    };
  }, []);

  const renderedContent = content.data?.dialogues && content.data.dialogues.map((item: any, index: number) => (
    <HStack spacing={4} alignItems="center" key={index}>
      <Box borderRadius="lg" maxWidth="100%" p={3}>
        <Text>
          <b>{item.speaker}</b> {item.text}
        </Text>
      </Box>
    </HStack>
  ));


  return (
    <Stack>
      {!!content.data && content.dataQuestions && (
        <Box mr={2} textAlign="center">
          <Text
            display="inline"
            fontSize={24}
            fontWeight="bold"
            mr={2}
          >
            {content.data?.title}
          </Text>
          {content.data?.level && (
            <Flex
              alignItems="center"
              justifyContent="center"
              fontWeight={800}
              fontSize={14}
              display={'inline'}
              ml={2}
            >
              {content.data?.level}
            </Flex>
          )}
          {!!content.data.audio && (
            <Box mt={4} mb={2}>
              <SpeechSample audio={content.data.audio} />
            </Box>
          )}
        </Box>
      )}
      {renderedContent}
    </Stack>
  );

}