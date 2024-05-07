import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import { DialogueImage } from '@/components/DialogueImage';
import { SpeechSample } from '@/components/SpeechSample';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    FormControl,
} from "@chakra-ui/react";
import { examRefresh } from '@/store/thunks';

export default function ExamStarterPage() {
    const dispatch = useAppDispatch();
    const examStudent = useAppSelector((store) => store.examStudent);
    const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);
    const [remainingTime, setRemainingTime] = useState(0);

    
    const steps = [
        {
            title: 'First',
            description: 'Listening Dialogue',
            component: <>
                <SpeechSample audio={examStudent.examData?.content.audio!} dialogues={examStudent.examData?.content.dialogues} onChange={setDisplayedSegmentIndex} />
                <DialogueImage
                    image={examStudent.examData?.content.imageData?.image!}
                    faces={examStudent.examData?.content.imageData?.faces!}
                    displayedSegmentIndex={displayedSegmentIndex}
                    dialogues={examStudent.examData?.content.dialogues!}
                /></>
        },
        {
            title: 'Second',
            description: 'Add Narration',
            component: <></>
        },
        {
            title: 'Third',
            description: 'Generate Image',
            component: <></>
        },
    ];

    useEffect(() => {
        console.log(examStudent.examData)
        if (examStudent.examData) {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - examStudent.examData.startTime;
            const remainingTime = Math.max(0, examStudent.examData.timeLimit * 60 - elapsedTime);
            setRemainingTime(remainingTime);

            const timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
        else { dispatch(examRefresh()); }
    }, [examStudent.examData?.examId]);


    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);

    return (
        <>{examStudent.examData || remainingTime === 0 ? (<>
            <Flex justifyContent="flex-end">
                <Box p="2" bg="gray.200">
                    <Heading as="h3" size="md">Remaining Time: {minutes} : {seconds}</Heading>
                </Box>
            </Flex>

            <Stack spacing={8}>
                <Stepper colorScheme='green' index={examStudent.examStepIndex}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <Flex key={examStudent.examStepIndex} justifyContent="center" alignItems="center">
                    {steps[examStudent.examStepIndex].component}
                </Flex>
            </Stack>
        </>) : (<>Exam Is Over</>)
        }
        </>
    );
}
