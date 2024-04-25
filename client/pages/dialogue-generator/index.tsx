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
} from '@chakra-ui/react';
import Form from '@/components/Form';
import DialogueSpeech from '@/components/DialogueSpeech';
import {
    useAppSelector,
} from '@/store';

const DialoguePage = () => {
    const content = useAppSelector((store) => store.content);
    const [activeComponent, setActiveComponent] = useState(<Form />);

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
    ];

    // {
    //     title: 'Third',
    //     description: 'Generate Image'
    // },

    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    React.useEffect(() => {
        if (steps[activeStep]?.component) {
            setActiveComponent(steps[activeStep].component);
        }
    }, [activeStep]);

    return (
        <Stack spacing={8}>
            <Stepper colorScheme='green' index={activeStep}>
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
                {activeStep === 0 && activeComponent}
        </Stack>
    );
};

export default DialoguePage;
