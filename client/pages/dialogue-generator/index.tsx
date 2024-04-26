import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Stack, Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Flex,
} from '@chakra-ui/react';
import Form from '@/components/Form';
import DialogueSpeech from '@/components/DialogueSpeech';
import {
    useAppSelector,
} from '@/store';

const DialoguePage = () => {
    const content = useAppSelector((store) => store.content);
    const contentForm = useAppSelector((store) => store.form);

    const steps = [
        {
            title: 'First',
            description: 'Add Script',
            component: <Form />
        },
        {
            title: 'Second',
            description: 'Add Narration',
            component: <DialogueSpeech
                isGenerating={content?.isGenerating}
                content={content?.data!} />
        },
        {
            title: 'Third',
            description: 'Generate Image'
        },
    ];



    return (
        <Stack spacing={8}>
            <Stepper colorScheme='green' index={contentForm.stepIndex}>
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
            <Flex key={contentForm.stepIndex} justifyContent="center" alignItems="center">
                {steps[contentForm.stepIndex].component}
            </Flex>
        </Stack>
    );
};

export default DialoguePage;
