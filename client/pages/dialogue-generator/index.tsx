import React, { useState, useEffect } from 'react';
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
    Flex,
    Button
} from '@chakra-ui/react';
import Form from '@/components/Form';
import DialogueSpeech from '@/components/DialogueSpeech';
import { DialogueImage } from '@/components/DialogueImage';
import DialogueQuestions from '@/components/DialogueQuestions';
import { useAppDispatch, useAppSelector, } from '@/store';
import { formActionCreators } from '@/store/slices';
import { generateImage } from '@/store/thunks';
import { useApi } from '@/hooks';
import { SpeechSample } from '@/components/SpeechSample';

export interface ISegment {
    segmentIndex: number;
    wordCount: number;
    startWordIndx?: number
    endWordIndx?: number
}

const DialoguePage = () => {
    const content = useAppSelector((store) => store.content);
    const contentForm = useAppSelector((store) => store.form);
    const dispatch = useAppDispatch();
    const appApi = useApi();
    const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);

    const handleOnclick = async () => {
        await dispatch(
            generateImage({
                axios: appApi,
                contentId: content?.data?._id!
            })
        );
    }
    const renderGenerateImageButton = () => {
        return (
            <Flex flexDirection="column" alignItems="center" width="100%" mb={4}>
                <SpeechSample audio={content?.data?.audio!} dialogues={content.data?.dialogues} onChange={setDisplayedSegmentIndex} />
                <Flex justifyContent="space-between" width="100%" mt={4}>
                    <Button
                        isLoading={content.isGenerating}
                        flex="1"
                        colorScheme="green"
                        mr={2}
                        onClick={handleOnclick}
                    >
                        Regenerate Image
                    </Button>
                    <Button
                        isDisabled={content.isGenerating}
                        flex="1"
                        colorScheme="green"
                        ml={2}
                        onClick={() => dispatch(formActionCreators.updateStepIndex(contentForm.stepIndex + 1))}
                    >
                        Next
                    </Button>
                </Flex>
            </Flex>
        );
    };


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
            description: 'Generate Image',
            component:
                <Flex flexDirection="column" alignItems="center">
                    {renderGenerateImageButton()}
                    <DialogueImage
                        image={content.data?.imageData?.image!}
                        faces={content.data?.imageData?.faces!}
                        displayedSegmentIndex={displayedSegmentIndex}
                        dialogues={content.data?.dialogues!}
                    />
                </Flex>
        },
        {
            title: 'Fourth',
            description: 'Generate Questions',
            component: <DialogueQuestions
                isGenerating={content?.isGenerating}
                content={content?.data!} />
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
