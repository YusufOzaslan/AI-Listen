import { FC, useEffect } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import {
    MdPlayCircle,
    MdPauseCircle,
} from 'react-icons/md';
import { useAudio } from '../hooks';
import { Bars } from 'react-loader-spinner';

const AudioLoadingSpinner = () => {
    const color = useColorModeValue('gray', 'white');

    return (
        <Bars
            height="40"
            width="40"
            color={color}
            ariaLabel="audio-loading"
            visible={true}
        />
    );
};

interface IProps {
    audio: string;
    start?: boolean;
}

const SpeechSample: FC<IProps> = ({ audio, start = false }) => {
    const bgColor = useColorModeValue('gray', 'white');
    const {
        audioRef,
        isPaused,
        play,
        pause,
        handleCanPlay,
        handleTimeUpdate,
        handleEnded,
    } = useAudio();


    const handlePlay = () => {
        if (isPaused) {
            play();
        } else {
            pause();
        }
    };

    useEffect(() => {
        if (start) {
            play()
        }
    }, [audio])

    const PauseButton = (
        <Box cursor="pointer" _hover={{ opacity: 0.8 }} onClick={handlePlay}>
            {isPaused ? (
                <MdPlayCircle color={bgColor} size={40} />
            ) : (
                <MdPauseCircle color={bgColor} size={40} />
            )}
        </Box>
    );
    return (
        <>{!start &&
            <Flex justifyContent="center" alignItems="center" gap={4} my={2}>
                {true ? (
                    <Flex justifyContent="center" alignItems="center" gap={1}>
                        {PauseButton}
                    </Flex>
                ) : (
                    <AudioLoadingSpinner />
                )}
            </Flex>}
            <audio
                ref={audioRef}
                src={audio}
                onCanPlay={handleCanPlay}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />
        </>
    );
};

export { SpeechSample };
