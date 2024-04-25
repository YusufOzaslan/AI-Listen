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
import { SpeechSample } from '@/components/SpeechSample';
import { IContentDialogue } from "@/store/slices/content.slice"
import { generateDialogueSpeech, generateImage } from '@/store/thunks';
import { useApi } from '@/hooks';
import {
    useAppDispatch,
    useAppSelector,
} from '@/store';
import Select from 'react-select';
import Jeny from "@/statics/avatars/Jeny.webp"
import Aria from "@/statics/avatars/Aria.webp"
import Davis from "@/statics/avatars/Davis.webp"
import Emma from "@/statics/avatars/Emma.webp"
import Ava from "@/statics/avatars/Ava.webp"
import Brian from "@/statics/avatars/Brian.webp"
import Andrew from "@/statics/avatars/Andrew.webp"
import AiGenerateFemale from "@/statics/avatars/AiGenerateFemale.webp"
import AiGenerateMale from "@/statics/avatars/AiGenerateMale.webp"
// @ts-ignore
import JenyAudio from "@/statics/audio/JenyAudio.mp3";
// @ts-ignore
import AriaAudio from "@/statics/audio/AriaAudio.mp3";
// @ts-ignore
import DavisAudio from "@/statics/audio/DavisAudio.mp3";
// @ts-ignore
import EmmaAudio from "@/statics/audio/EmmaAudio.mp3";
// @ts-ignore
import AvaAudio from "@/statics/audio/AvaAudio.mp3";
// @ts-ignore
import BrianAudio from "@/statics/audio/BrianAudio.mp3";
// @ts-ignore
import AndrewAudio from "@/statics/audio/AndrewAudio.mp3";
// @ts-ignore
import AiGenerateFemaleAudio from "@/statics/audio/AiGenerateFemaleAudio.mp3";
// @ts-ignore
import AiGenerateMaleAudio from "@/statics/audio/AiGenerateMaleAudio.mp3";

interface SelectOption {
    label: string;
    value: string;
    avatarUrl: string;
    speechSample: string;
}
interface IVoice {
    voice: string;
    avatar: string;
    speechSample: string;
}
interface IProps {
    isGenerating: boolean
    content: IContentDialogue;
}

const selectOptions: SelectOption[] = [
    {
        // Male
        label: 'Davis',
        value: 'en-US-DavisNeural',
        avatarUrl: Davis.src,
        speechSample: DavisAudio,
    },
    {
        // Female
        label: 'Emma',
        value: 'en-US-EmmaNeural',
        avatarUrl: Emma.src,
        speechSample: EmmaAudio
    },
    {
        // Female
        label: 'Ava',
        value: 'en-US-AvaNeural',
        avatarUrl: Ava.src,
        speechSample: AvaAudio

    },
    {
        // Male
        label: 'Andrew',
        value: 'en-US-AndrewNeural',
        avatarUrl: Andrew.src,
        speechSample: AndrewAudio

    },
    {
        //   // Female
        label: 'Aria',
        value: 'en-US-AriaNeural',
        avatarUrl: Aria.src,
        speechSample: AriaAudio
    },
    {
        // Male
        label: 'Brian',
        value: 'en-US-BrianNeural',
        avatarUrl: Brian.src,
        speechSample: BrianAudio
    },
    {
        // Female
        label: 'Jeny',
        value: 'en-US-JennyNeural',
        avatarUrl: Jeny.src,
        speechSample: JenyAudio
    },
    {
        // Male
        label: 'AIGenerate Male',
        value: 'en-US-AIGenerate1Neural',
        avatarUrl: AiGenerateMale.src,
        speechSample: AiGenerateMaleAudio
    },
    {
        // Female
        label: 'AIGenerate Female',
        value: 'en-US-AIGenerate2Neural',
        avatarUrl: AiGenerateFemale.src,
        speechSample: AiGenerateFemaleAudio
    },
];


const DialogueSpeech: React.FC<IProps> = ({isGenerating, content}) => {
    if (!content) {
        return null; 
    }
    const { _id, title, dialogues, audio } = content;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const contentForm = useAppSelector((store) => store.form);
    const appApi = useApi();

    const [voice, setVoice] = useState<IVoice[]>([
        {
            voice: 'en-US-AIGenerate2Neural',
            avatar: AiGenerateFemale.src,
            speechSample: AiGenerateMaleAudio
        },
        {
            voice: 'en-US-AIGenerate1Neural',
            avatar: AiGenerateMale.src,
            speechSample: AiGenerateMaleAudio
        }]);

    const handleSubmit = async () => {
        await dispatch(
            generateImage({
                axios: appApi,
                contentId: _id
            })
        );
        router.push('/image');
    }

    const handleAddNarration = async () => {
        await dispatch(
            generateDialogueSpeech({
                axios: appApi,
                contentId: _id,
                body: {
                    voice: [voice[0].voice, voice[1].voice]
                }
            })
        );
    }
    const handleVoice = (option: SelectOption, index: number) => {
        const updatedVoice = [...voice];
        updatedVoice[index].voice = option.value;
        updatedVoice[index].avatar = option.avatarUrl;
        updatedVoice[index].speechSample = option.speechSample;
        setVoice(updatedVoice);
    };
    const color = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box maxW="lg" mx="auto" p="4" borderWidth="1px" borderRadius="lg" bg="gray.200" boxShadow="md">
            <Box mb={5}>
                <Heading textAlign="center">{title}</Heading>
            </Box>
            <Flex direction="column" alignItems="center">
                <Box width="full" display="flex" justifyContent="center">
                    <Wrap spacing="50px" justify="center">
                        {voice.map((item, index) => (
                            <WrapItem key={index}>
                                <Box>
                                    <Avatar ms={4} size="xl" src={item.avatar} loading="lazy" />
                                    <SpeechSample audio={item.speechSample} />
                                    <Box mt={8} width="130px">
                                        <Select
                                            placeholder="Select Speaker"
                                            options={selectOptions}
                                            onChange={(option) =>
                                                handleVoice(option as SelectOption, index)
                                            }
                                        />
                                    </Box>
                                </Box>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
            </Flex>

            <VStack w="full" align="stretch" p={5}>
                {dialogues?.map((item, index) => {
                    const avatarUrl =
                        voice.length === 2
                            ? voice[index % 2]?.avatar
                            : voice[0]?.avatar || '';
                    return (
                        <HStack spacing={4} alignItems="center" key={index}>
                            <Box>
                                {avatarUrl && (
                                    <Avatar name={item.speaker} src={avatarUrl} loading="lazy" />
                                )}
                            </Box>
                            <Box bg={color} borderRadius="lg" maxWidth="100%" p={3}>
                                <Text> <b>{item.speaker}:</b> {item.text}</Text>
                            </Box>
                        </HStack>
                    );
                })}
                {!!audio && <SpeechSample audio={audio} />}
                <Button isLoading={isGenerating} colorScheme="blue" mt="4"
                    onClick={() => handleAddNarration()}>Add Narration</Button>
                <Button isLoading={isGenerating} isDisabled={audio === "" || audio == undefined || audio == null} colorScheme="blue" mt="4"
                    onClick={() => handleSubmit()}>Next</Button>
            </VStack>
        </Box>
    )
}

export default DialogueSpeech;
