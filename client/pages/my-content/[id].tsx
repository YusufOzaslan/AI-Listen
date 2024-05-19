import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getContent, getQuestion, generateExam, getExamUrl } from '@/store/thunks';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector, } from '@/store';
import { resetData, resetExamUrl, resetQuestion } from '@/store/slices';
import { SpeechSample } from '@/components/SpeechSample';
import { DialogueImage } from '@/components/DialogueImage';
import GenerateExam from '@/components/GenerateExam';
import {
  HStack,
  Box,
  Stack,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
export interface IExamFormData {
  examName: string;
  school: string;
  class: string;
  capacity: number;
  timeLimitInMinutes: number;
}
export default function MyContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const content = useAppSelector((store) => store.content);
  const examTeacher = useAppSelector((store) => store.examTeacher);
  const questions = content.dataQuestions;
  const appApi = useApi();
  const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);

  useEffect(() => {
    const id = router.query.id as any;
    if (id) {
      dispatch(getContent({ axios: appApi, contentId: id }));
      dispatch(getQuestion({ axios: appApi, contentId: id }));
      dispatch(getExamUrl({ axios: appApi, contentId: id }));
    }
    return () => {
      dispatch(resetQuestion());
      dispatch(resetData());
      dispatch(resetExamUrl());
    };
  }, []);

  const renderedContent = content.data?.dialogues.map((item: any, index: number) => {
    return (
      <HStack spacing={4} alignItems="center" key={index}>
        <Box borderRadius="lg" maxWidth="100%" p={3}>
          <Text>
            <b>{item.speaker}</b> {item.text}
          </Text>
        </Box>
      </HStack>
    );
  });

  const handleCreateExam = async (formData: IExamFormData) => {
    const contentId = router.query.id as any;
    await dispatch(
      generateExam({
        body: formData,
        axios: appApi,
        contentId
      }),
    );
  };
  const copyToClipboard = () => {
    if (examTeacher.examUrl != undefined && examTeacher.examUrl != null) {
      navigator.clipboard.writeText(examTeacher.examUrl);
    }
  };
  const renderedQuestions = questions?.map((question, index) => {
    return (
      <Stack key={question._id} alignItems="left" height="auto" width="100%" maxW="lg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
        <Flex alignItems={'center'} justifyContent="space-between">
          <Text whiteSpace="pre-line" fontWeight="semibold" maxW="80%">
            <Text as="span" fontWeight="bold">{index + 1})</Text> {question.question}
          </Text>
        </Flex>
        <Stack>
          {question.options.map((option, optionIndex) => {
            return (
              <Text key={Math.random().toString(36).substr(2, 9)}>
                <Text as="span" fontWeight="bold">{String.fromCharCode(optionIndex + 65)})</Text> {option}
              </Text>
            );
          })}
        </Stack>
      </Stack>
    );
  })
  return (
    <Box>
      {!!content.data && content.dataQuestions && (
        <>
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
              <>
                {!!examTeacher.examUrl && (
                  <Flex mt={4} mb={2} alignItems="center" justifyContent="center">
                    <Box>
                      <Button variant="outline" onClick={copyToClipboard}>
                        Copy Exam URL
                      </Button>
                    </Box>
                    <Box ml={2}>
                      <Text border="1px solid #ccc" borderRadius="md" p={2} whiteSpace="nowrap" >
                        {examTeacher.examUrl}
                      </Text>
                    </Box>
                  </Flex>
                )}

                <Box mt={4} mb={2}>
                  <GenerateExam onCreateExam={handleCreateExam} />
                </Box>
              </>
            )}
          </Box>

          <Flex>
            <Box flex="1" textAlign="center" borderRadius="lg" w="60%" p={3} borderWidth="2px" borderColor="gray.200">
              <DialogueImage
                image={content.data?.imageData?.image!}
                faces={content.data?.imageData?.faces!}
                displayedSegmentIndex={displayedSegmentIndex}
                dialogues={content.data?.dialogues!}
              />
            </Box>
            <Box flex="1" borderRadius="lg" w="40%" p={3} borderWidth="2px" borderColor="gray.200">
              <Box mt={4} mb={2}>
                <SpeechSample audio={content.data.audio!} dialogues={content.data.dialogues} onChange={setDisplayedSegmentIndex} />
              </Box>
              {renderedContent}
            </Box>
          </Flex>

          <Flex flexWrap="wrap">
            {renderedQuestions!.map((question, index) => (
              <Box key={index} flex={{ base: '100%', md: '50%', lg: '33.33%' }} p={3}>
                {question}
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );

}