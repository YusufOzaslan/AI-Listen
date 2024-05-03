import React, { useState } from 'react';
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
import { formActionCreators } from '@/store/slices';
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
    gender: string
}
interface IVoice {
    voice: string;
    avatar: string;
    speechSample: string;
    gender: string;
}
interface IProps {
    isGenerating: boolean
    content: IContentDialogue;
}

const selectOptions: SelectOption[] = [
    {
        label: 'Davis',
        value: 'en-US-DavisNeural',
        avatarUrl: Davis.src,
        speechSample: DavisAudio,
        gender: "Male"
    },
    {
        label: 'Emma',
        value: 'en-US-EmmaNeural',
        avatarUrl: Emma.src,
        speechSample: EmmaAudio,
        gender: "Female"
    },
    {
        label: 'Ava',
        value: 'en-US-AvaNeural',
        avatarUrl: Ava.src,
        speechSample: AvaAudio,
        gender: "Female"
    },
    {
        label: 'Andrew',
        value: 'en-US-AndrewNeural',
        avatarUrl: Andrew.src,
        speechSample: AndrewAudio,
        gender: "Male"

    },
    {
        label: 'Aria',
        value: 'en-US-AriaNeural',
        avatarUrl: Aria.src,
        speechSample: AriaAudio,
        gender: "Female"
    },
    {
        label: 'Brian',
        value: 'en-US-BrianNeural',
        avatarUrl: Brian.src,
        speechSample: BrianAudio,
        gender: "Male"
    },
    {
        label: 'Jeny',
        value: 'en-US-JennyNeural',
        avatarUrl: Jeny.src,
        speechSample: JenyAudio,
        gender: "Female"
    },
    {
        label: 'AIGenerate Male',
        value: 'en-US-AIGenerate1Neural',
        avatarUrl: AiGenerateMale.src,
        speechSample: AiGenerateMaleAudio,
        gender: "Male"
    },
    {
        label: 'AIGenerate Female',
        value: 'en-US-AIGenerate2Neural',
        avatarUrl: AiGenerateFemale.src,
        speechSample: AiGenerateFemaleAudio,
        gender: "Female"
    },
];


const DialogueSpeech: React.FC<IProps> = ({isGenerating, content}) => {
    if (!content) {
        return null; 
    }
    const { _id, title, dialogues, audio } = content;
    const dispatch = useAppDispatch();
    const contentForm = useAppSelector((store) => store.form);
    const appApi = useApi();

    const [voice, setVoice] = useState<IVoice[]>([
        {
            voice: 'en-US-AIGenerate2Neural',
            avatar: AiGenerateFemale.src,
            speechSample: AiGenerateMaleAudio,
            gender: "Female"
        },
        {
            voice: 'en-US-AIGenerate1Neural',
            avatar: AiGenerateMale.src,
            speechSample: AiGenerateMaleAudio,
            gender: "Male"
        }]);

    const handleSubmit = async () => {
        await dispatch(
            generateImage({
                axios: appApi,
                contentId: _id
            })
        );
        dispatch(formActionCreators.updateStepIndex(contentForm.stepIndex + 1))
    }

    const handleAddNarration = async () => {
        await dispatch(
            generateDialogueSpeech({
                axios: appApi,
                contentId: _id,
                body: {
                    voice: [voice[0].voice, voice[1].voice],
                    gender:[voice[0].gender, voice[1].gender]
                }
            })
        );
    }
    const handleVoice = (option: SelectOption, index: number) => {
        const updatedVoice = [...voice];
        updatedVoice[index].voice = option.value;
        updatedVoice[index].avatar = option.avatarUrl;
        updatedVoice[index].speechSample = option.speechSample;
        updatedVoice[index].gender = option.gender;
        setVoice(updatedVoice);
    };
    const color = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box maxW="lg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md" alignItems="center" height="auto" width="60%" overflowY="auto" >
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
                <Button isLoading={isGenerating} colorScheme="green" mt="4"
                    onClick={() => handleAddNarration()}>Add Narration</Button>
                <Button isLoading={isGenerating} isDisabled={audio === "" || audio == undefined || audio == null} colorScheme="green" mt="4"
                    onClick={() => handleSubmit()}>Next</Button>
            </VStack>
        </Box>
    )
}

export default DialogueSpeech;
