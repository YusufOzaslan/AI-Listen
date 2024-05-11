import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DialogueImage } from '@/components/DialogueImage';
import { SpeechSample } from '@/components/SpeechSample';
import {
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
import { examSaveAnswer, examRefresh } from '@/store/thunks';

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

    const finishExam = () => {
        
    };

    const questions = examStudent.examData?.questions.map((question, index) => {
        return (
            <Stack key={question.id} alignItems="left" height="auto" width="60%" maxW="xlg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                <Flex alignItems={'center'} justifyContent="space-between">
                    <Text whiteSpace="pre-line" fontSize={'xxx-large'}>
                        <Text as="span" fontWeight="bold">{index + 1})</Text> {question.question}
                    </Text>
                </Flex>
                <Stack>
                    {question.options.map((option, optionIndex) => {
                        return (
                            <Flex key={optionIndex} fontSize={'xx-large'} alignItems="center">
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

    return (
        <>{examStudent.examData ? (<>
            <Flex justifyContent="flex-end">
                <Box p="2" bg="gray.200">
                    <Heading as="h3" size="md">Remaining Time: {minutes} : {seconds}</Heading>
                </Box>
            </Flex>

            <Stack spacing={8}>
                <DialogueImage
                    image={examStudent.examData?.content.imageData?.image!}
                    faces={examStudent.examData?.content.imageData?.faces!}
                    displayedSegmentIndex={displayedSegmentIndex}
                    dialogues={examStudent.examData?.content.dialogues!}
                />
                <SpeechSample audio={examStudent.examData?.content.audio!} dialogues={examStudent.examData?.content.dialogues} onChange={setDisplayedSegmentIndex} />

                <Flex alignItems="center" justifyContent="center" flexDirection="row">
                    <Box paddingLeft={"5%"} />
                    <Button onClick={previousQuestion} width="10%" disabled={stepIndex === 0} marginRight="1px">Previous</Button>
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
                    <Button onClick={nextQuestion} width="10%" disabled={stepIndex === examStudent.examData.questions.length - 1} marginLeft="1px">Next</Button>
                    <Box paddingLeft={"5%"} />
                </Flex>

                <Flex paddingBottom={"30%"} key={stepIndex} flexDirection="column" justifyContent="center" alignItems="center">
                    {questions![stepIndex]}
                    <Box paddingTop={"2%"} />
                    <Button onClick={finishExam} width="10%" >Finish Exam</Button>
                </Flex>
            </Stack>
        </>) : (<>Exam Is Over</>)
        }
        </>
    );
}
