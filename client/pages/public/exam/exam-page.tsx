import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DialogueImage } from '@/components/DialogueImage';
import { SpeechSample } from '@/components/SpeechSample';
import {
    Alert,
    AlertIcon,
    Flex,
    Heading,
    Checkbox,
    Stack,
    Box,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepStatus,
    Stepper,
    Text,
    Button,
} from "@chakra-ui/react";
import { resetExamData, IStudentAnswers } from '@/store/slices';
import { examSaveAnswer, examRefresh, finishExam } from '@/store/thunks';
import { AiFillFileText, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function ExamStarterPage() {
    const dispatch = useAppDispatch();
    const examStudent = useAppSelector((store) => store.examStudent);
    const appApi = useApi();
    const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);
    const [remainingTime, setRemainingTime] = useState(0);
    const [answers, setAnswers] = useState<IStudentAnswers[]>([]);
    const [stepIndex, setStepIndex] = useState(0);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (answers.length > 0) {
            setIsSaved(true);
            const timeout = setTimeout(() => setIsSaved(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [answers]);


    useEffect(() => {
        if (examStudent.examData) {
            setAnswers(examStudent.examData.studentAnswers)
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - examStudent.examData.startTime;
            const remainingTime = Math.max(0, examStudent.examData.timeLimit * 60 - elapsedTime);
            setRemainingTime(remainingTime);

            const timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        dispatch(resetExamData());
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
        else { dispatch(examRefresh()); }
    }, [examStudent.examData?.examId]);

    useEffect(() => {
        if (answers.length === 0) return;
        if (examStudent.examData) {
            dispatch(
                examSaveAnswer({
                    axios: appApi,
                    body: answers,
                }),
            );
        }
    }, [answers]);

    const previousQuestion = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    const nextQuestion = () => {
        if (stepIndex < examStudent.examData!.questions.length - 1) {
            setStepIndex(stepIndex + 1);
        }
    };

    const handleFinishExam = () => {
        dispatch(finishExam());
    };

    const questions = examStudent.examData?.questions.map((question, index) => {
        return (
            <Stack key={question.id} alignItems="left" height="auto" width="60%" maxW="xlg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                <Flex alignItems={'center'} justifyContent="space-between">
                    <Text whiteSpace="pre-line" fontSize={'xx-large'}>
                        <Text as="span" fontWeight="bold">{index + 1})</Text> {question.question}
                    </Text>
                </Flex>
                <Stack>
                    {question.options.map((option, optionIndex) => {
                        return (
                            <Flex key={optionIndex} fontSize={'x-large'} alignItems="center">
                                <Checkbox
                                    size="lg"
                                    colorScheme='green'
                                    isChecked={answers.some(answer => answer.questionId === question.id && answer.answer === question.options[optionIndex])}
                                    onChange={(e) => {
                                        const updatedAnswers = answers.map(answer => {
                                            if (answer.questionId === question.id) {
                                                return { ...answer, answer: question.options[optionIndex] };
                                            }
                                            return answer;
                                        });
                                        setAnswers(updatedAnswers);
                                    }}
                                />
                                <Text ml="6" as="span" fontWeight="bold">{String.fromCharCode(optionIndex + 65)})</Text>
                                <Text ml="6" as="span">{option}</Text>
                            </Flex>
                        );
                    })}
                </Stack>
            </Stack>
        );
    });

    const Navbar = () => {
        return (
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
                bg="#1A202C"
                color="white"
            >
                <Flex align="center" mr="auto">
                    <AiFillFileText fontSize="2rem" />
                    <Text ml={3} fontWeight="bold" fontSize="xl">
                        AI Listen Exam
                    </Text>
                </Flex>
                <Text ml={3}>{examStudent.examData?.studentName}</Text>
                <Text ml={3}>{examStudent.examData?.studentId}</Text>
            </Flex>
        );
    };


    return (
        <>
            <Navbar />
            {examStudent.examData ? (
                <>
                    {isSaved && (
                        <Alert width="10%" status="success" position="fixed" bottom="20px" right="20px">
                            <AlertIcon />
                            Your answer has been saved!
                        </Alert>
                    )}
                    <Flex justifyContent="flex-end">
                        <Box p="2" bg="gray.200">
                            <Heading as="h3" size="md">Remaining Time: {minutes} : {seconds}</Heading>
                        </Box>
                    </Flex>
                    <Flex>
                        {/* Resim */}

                        <Box flexWrap="wrap" alignItems="left" height="auto" w="60%" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                            <DialogueImage
                                image={examStudent.examData?.content.imageData?.image!}
                                faces={examStudent.examData?.content.imageData?.faces!}
                                displayedSegmentIndex={displayedSegmentIndex}
                                dialogues={examStudent.examData?.content.dialogues!}
                            />
                        </Box>
                        {/* Sorular */}
                        <Box w="40%">
                            <Stack spacing={8}>
                                <SpeechSample audio={examStudent.examData?.content.audio!} dialogues={examStudent.examData?.content.dialogues} onChange={setDisplayedSegmentIndex} />
                                <Flex alignItems="center" justifyContent="center" flexDirection="row">
                                    <Box paddingLeft={"5%"} />
                                    <Button onClick={previousQuestion} width="10%" disabled={stepIndex === 0} marginRight="1px"><AiOutlineArrowLeft /></Button>
                                    <Stepper colorScheme='green' index={stepIndex} flexWrap="wrap" alignItems="left" height="auto" width="100%" maxW="60%" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                                        {examStudent.examData.questions.map((step, index) => (
                                            <Step key={index}>
                                                <StepIndicator>
                                                    <StepStatus
                                                        complete={<StepIcon />}
                                                        incomplete={<StepNumber />}
                                                        active={<StepNumber />}
                                                    />
                                                </StepIndicator>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <Button onClick={nextQuestion} width="10%" disabled={stepIndex === examStudent.examData.questions.length - 1} marginLeft="1px"><AiOutlineArrowRight /></Button>
                                    <Box paddingLeft={"5%"} />
                                </Flex>
                                <Flex paddingBottom={"30%"} key={stepIndex} flexDirection="column" justifyContent="center" alignItems="center">
                                    {questions![stepIndex]}
                                    <Box paddingTop={"2%"} />
                                    <Button onClick={handleFinishExam} width="20%" >Finish Exam</Button>
                                </Flex>
                            </Stack>
                        </Box>
                    </Flex>
                </>
            ) : (
                <>Exam Is Over</>
            )}
        </>
    );

}
