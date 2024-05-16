import { FC, useEffect, useState } from 'react';
import { Box, Image, Text } from "@chakra-ui/react";
import { IFaceCoordinates } from '@/store/slices';
import speechBubbleleft from "@/statics/speech-bubble-left.png";
import speechBubbleRight from "@/statics/speech-bubble-right.png";
import { ISegment } from '@/pages/dialogue-generator';

interface IProps {
    image: string;
    faces: IFaceCoordinates[];
    displayedSegmentIndex: number;
    dialogues: {
        speaker: string;
        text: string;
    }[];
}

const DialogueImage: FC<IProps> = ({ image, faces, dialogues, displayedSegmentIndex }) => {

    const [segmentIndexesLeft, setSegmentIndexesLeft] = useState<ISegment[]>([]);
    const [segmentIndexesRight, setSegmentIndexesRight] = useState<ISegment[]>([]);
    const [leftText, setLeftText] = useState<string>();
    const [rightText, setRightText] = useState<string>();
    const [dialogueText, setDialogueText] = useState<string>();
    const [isLeftVisible, setIsLeftVisible] = useState<boolean>(false);
    const [isRightVisible, setIsRightVisible] = useState<boolean>(false);

    useEffect(() => {
        if (dialogues) {
            setDialogueText(dialogues.map(dialogue => dialogue.text).join(" "))
            let indexesLeft: ISegment[] = [];
            let indexesRight: ISegment[] = [];
            let lastSegment = 0
            let lastWordIndex = 0

            dialogues.forEach((dialogue, index) => {
                let increaseLastSegment = 0;
                const text = dialogue.text;
                const words = text.split(" ");
                const segmentCount = Math.floor(words.length / 4);
                const remainingWords = words.length % 4;

                //console.log(`Konuşmacı: ${dialogue.speaker}`);

                for (let i = lastSegment; i < lastSegment + segmentCount; i++) {
                    //console.log(`Segment ${i}: Kelimeler ${lastWordIndex} - ${lastWordIndex + 3} (${dialogue.speaker})`);
                    if (index % 2 === 0) {
                        indexesLeft.push({ segmentIndex: i, wordCount: 4, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + 3 });
                        lastWordIndex += 4
                        if (remainingWords > 0 && i + 1 === lastSegment + segmentCount) {
                            increaseLastSegment += 1
                            indexesLeft.push({ segmentIndex: i + 1, wordCount: remainingWords, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + remainingWords - 1 });
                            // console.log(`Segment ${i + increaseLastSegment}: Artakalan Kelimeler: ${lastWordIndex} - ${lastWordIndex + remainingWords - 1} (${dialogue.speaker})`);
                            lastWordIndex += remainingWords
                        }
                    }
                    else {
                        indexesRight.push({ segmentIndex: i, wordCount: 4, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + 3 });
                        lastWordIndex += 4
                        if (remainingWords > 0 && i + 1 === lastSegment + segmentCount) {
                            increaseLastSegment += 1
                            indexesRight.push({ segmentIndex: i + 1, wordCount: remainingWords, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + remainingWords - 1 });
                            // console.log(`Segment ${i + increaseLastSegment}: Artakalan Kelimeler: ${lastWordIndex} - ${lastWordIndex + remainingWords - 1} (${dialogue.speaker})`);
                            lastWordIndex += remainingWords
                        }
                    }
                }
                if (index % 2 === 0 && segmentCount === 0 && remainingWords > 0) {
                    indexesLeft.push({ segmentIndex: lastSegment, wordCount: remainingWords, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + remainingWords - 1 });
                    lastWordIndex += remainingWords
                    increaseLastSegment += 1
                }
                else if (index % 2 === 1 && segmentCount === 0 && remainingWords > 0) {
                    indexesRight.push({ segmentIndex: lastSegment, wordCount: remainingWords, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + remainingWords - 1 });
                    lastWordIndex += remainingWords
                    increaseLastSegment += 1
                }
                lastSegment += segmentCount + increaseLastSegment
            });
            setSegmentIndexesLeft(indexesLeft);
            setSegmentIndexesRight(indexesRight);
            // console.log("Segment Indexes Left:", indexesLeft);
            // console.log("Segment Indexes Right:", indexesRight);
        }
    }, [dialogues]);

    useEffect(() => {
        if (dialogues) {
            if (segmentIndexesLeft.some(segment => segment.segmentIndex === displayedSegmentIndex)) {
                setRightText("")
                setIsLeftVisible(true)
                setIsRightVisible(false)
                const matchedSegment = segmentIndexesLeft.find(segment => segment.segmentIndex === displayedSegmentIndex);
                if (matchedSegment) {
                    const words = dialogueText?.split(" ");
                    if (words) {
                        const leftWords = words.slice(matchedSegment.startWordIndx, matchedSegment.endWordIndx! + 1);
                        setLeftText(leftWords.join(" "));
                        //console.log("Matched Segment LEFT:", matchedSegment);
                    }
                }
            }
            if (segmentIndexesRight.some(segment => segment.segmentIndex === displayedSegmentIndex)) {
                setLeftText("")
                setIsRightVisible(true)
                setIsLeftVisible(false)
                const matchedSegment = segmentIndexesRight.find(segment => segment.segmentIndex === displayedSegmentIndex);
                if (matchedSegment) {
                    const words = dialogueText?.split(" ");
                    if (words) {
                        const rightWords = words.slice(matchedSegment.startWordIndx, matchedSegment.endWordIndx! + 1);
                        setRightText(rightWords.join(" "));
                        //console.log("Matched Segment RIGHT:", matchedSegment);
                    }
                }
            }
        }
    }, [displayedSegmentIndex]);


    if (!image || !faces) {
        return <>Image not found</>;
    }

    // Coordinates for the first person
    let leftX = faces[0]?.bottom_right_x;
    let leftY = faces[0]?.top_left_y;

    // Coordinates for the second person
    let rightX = faces[1]?.top_left_x!;
    let rightY = faces[1]?.top_left_y!;

    return (
        <Box
            bgImage={`url(${image})`}
            bgSize="contain"
            bgPosition="center"
            bgRepeat="no-repeat"
            position="relative"
            width={{ base: "256px", md: "512px", lg: "1024px" }}
            height={{ base: "256px", md: "512px", lg: "1024px" }}
            margin="auto"
        >
            {isLeftVisible && (
                /* Speech bubble for the first person */
                <Box
                    position="absolute"
                    left={{
                        base: `${leftX = faces[0]?.bottom_right_x / 4 < 0 ? 0 : faces[0]?.bottom_right_x / 4}px`,
                        md: `${leftX = faces[0]?.bottom_right_x / 2 < 0 ? 0 : faces[0]?.bottom_right_x / 2}px`,
                        lg: `${leftX = faces[0]?.bottom_right_x < 0 ? 0 : faces[0]?.bottom_right_x}px`
                    }}

                    top={{
                        base: `${leftY = faces[0]?.top_left_y - 180 < 0 ? 0 : (faces[0]?.top_left_y - 180) / 4}px`,
                        md: `${leftY = faces[0]?.top_left_y - 180 < 0 ? 0 : (faces[0]?.top_left_y - 180) / 2}px`,
                        lg: `${leftY = faces[0]?.top_left_y - 180 < 0 ? 0 : faces[0]?.top_left_y - 180}px`
                    }}
                    width={{ base: "100px", md: "200px", lg: "320px" }}
                    opacity="0.75"
                >
                    <Image src={speechBubbleleft.src} />
                    {/* Text inside the speech bubble */}
                    <Text
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        textAlign="center"
                        color="black"
                        fontSize={{ base: "8px", md: "16px", lg: "24px" }}
                        fontWeight="bold"
                        pb="20px"
                    >
                        {leftText}
                    </Text>
                </Box>
            )}
            {isRightVisible && (
                /* Speech bubble for the second person */
                <Box
                    position="absolute"
                    left={{
                        base: `${rightX = faces[1]?.top_left_x! - 100 < 0 ? 0 : faces[1]?.top_left_x! / 4 - 100}px`,
                        md: `${rightX = faces[1]?.top_left_x! - 180 < 0 ? 0 : faces[1]?.top_left_x! / 2 - 200}px`,
                        lg: `${rightX = faces[1]?.top_left_x! - 320 < 0 ? 0 : faces[1]?.top_left_x! - 320}px`
                    }}
                    top={{
                        base: `${rightY = faces[1]?.top_left_y! - 180 < 0 ? 0 : (faces[1]?.top_left_y! - 180) / 4}px`,
                        md: `${rightY = faces[1]?.top_left_y! - 180 < 0 ? 0 : (faces[1]?.top_left_y! - 180) / 2}px`,
                        lg: `${rightY = faces[1]?.top_left_y! - 180 < 0 ? 0 : faces[1]?.top_left_y! - 180}px`
                    }}
                    width={{ base: "100px", md: "200px", lg: "320px" }}
                    opacity="0.75"
                >
                    <Image src={speechBubbleRight.src} />
                    {/* Text inside the speech bubble */}
                    <Text
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        textAlign="center"
                        color="black"
                        fontSize={{ base: "8px", md: "16px", lg: "28px" }}
                        fontWeight="bold"
                        pb="20px"
                    >
                        {rightText}
                    </Text>
                </Box>
            )}
        </Box>
    );

};

export { DialogueImage };
