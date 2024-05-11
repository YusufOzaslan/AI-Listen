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
    StepSeparator,
    StepStatus,
    Stepper,
    Text,
} from "@chakra-ui/react";
import { examRefresh } from '@/store/thunks';
import { resetExamData } from '@/store/slices';
import { IStudentAnswers } from '@/store/slices';

export default function ExamStarterPage() {
    const dispatch = useAppDispatch();
    const examStudent = useAppSelector((store) => store.examStudent);
    const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);
    const [remainingTime, setRemainingTime] = useState(0);
    const [answers, setAnswers] = useState<IStudentAnswers[]>([]);

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

    const questions = examStudent.examData?.questions.map((question, index) => {
        return (
            <Stack key={question.id} alignItems="left" height="auto" width="100%" maxW="lg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                <Flex alignItems={'center'} justifyContent="space-between">
                    <Text whiteSpace="pre-line" fontWeight="semibold" maxW="80%">
                        <Text as="span" fontWeight="bold">{index + 1})</Text> {question.question}
                    </Text>
                </Flex>
                <Stack>
                    {question.options.map((option, optionIndex) => {
                        return (
                            <Text key={optionIndex}>
                                <Checkbox
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
                                <Text as="span" fontWeight="bold">{String.fromCharCode(optionIndex + 65)})</Text> {option}
                            </Text>
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

                <Stepper colorScheme='green' index={examStudent.examStepIndex}>
                    {examStudent.examData.questions.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <Flex key={examStudent.examStepIndex} justifyContent="center" alignItems="center">
                    {questions![examStudent.examStepIndex]}
                </Flex>
            </Stack>
        </>) : (<>Exam Is Over</>)
        }
        </>
    );
}
