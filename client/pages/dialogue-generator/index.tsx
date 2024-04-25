import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Avatar,
    WrapItem,
    Box,
    Heading,
    Wrap,
    Flex,
    VStack,
    HStack,
    useColorModeValue,
    Text,
    Button
} from '@chakra-ui/react';
import DialogueSpeech from '@/components/DialogueSpeech';
import {
    useAppSelector,
} from '@/store';

const DialoguePage = () => {
    const content = useAppSelector((store) => store.content);

    return (
        <DialogueSpeech isGenerating={content.isGenerating} content={content.data!} />
    )
}

export default DialoguePage;