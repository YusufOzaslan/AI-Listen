import { FC, useEffect, useState } from 'react';
import { Box } from "@chakra-ui/react";
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
                            //console.log(`Segment ${i + increaseLastSegment}: Artakalan Kelimeler: ${lastWordIndex} - ${lastWordIndex + remainingWords - 1} (${dialogue.speaker})`);
                            lastWordIndex += remainingWords
                        }
                    }
                    else {
                        indexesRight.push({ segmentIndex: i, wordCount: 4, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + 3 });
                        lastWordIndex += 4
                        if (remainingWords > 0 && i + 1 === lastSegment + segmentCount) {
                            increaseLastSegment += 1
                            indexesRight.push({ segmentIndex: i + 1, wordCount: remainingWords, startWordIndx: lastWordIndex, endWordIndx: lastWordIndex + remainingWords - 1 });
                            //console.log(`Segment ${i + increaseLastSegment}: Artakalan Kelimeler: ${lastWordIndex} - ${lastWordIndex + remainingWords - 1} (${dialogue.speaker})`);
                            lastWordIndex += remainingWords
                        }
                    }
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
    let leftX = faces[0].bottom_right_x - 50;
    let leftY = faces[0].top_left_y - 150;

    // Coordinates for the second person
    let rightX = faces[1].top_left_x! - 150;
    let rightY = faces[1].top_left_y! - 150;

    // Check and set coordinates to 0 if necessary
    leftX = leftX < 0 ? 0 : leftX;
    leftY = leftY < 0 ? 0 : leftY;
    rightX = rightX < 0 ? 0 : rightX;
    rightY = rightY < 0 ? 0 : rightY;

    // Adjust the positions if the distance between the two people is less than 150
    if (rightX - leftX < 150) {
        rightX = rightX + (rightX - leftX) / 2
        leftX = leftX - (rightX - leftX) / 2
    }

    return (
        <Box
            bgImage={`url(${image})`}
            bgSize="contain"
            bgPosition="center"
            bgRepeat="no-repeat"
            position="relative"
            width={{base:"256px", md:"512px", lg:"1024px"}}
            height={{base:"256px", md:"512px", lg:"1024px"}}
            margin="auto"
        >
            {/* Speech bubble for the first person */}
            <Box
                position="absolute"
                left={`${leftX}px`}
                top={`${leftY}px`}
                w="200px"
                opacity="0.75"
            >
                <img src={speechBubbleleft.src} alt="Speech Bubble" />
                {/* Text inside the speech bubble */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    color="black"
                    fontSize="14px"
                    fontWeight="bold"
                    pb="16px"
                >
                    {leftText}
                </Box>
            </Box>
            {/* Speech bubble for the second person */}
            <Box
                position="absolute"
                left={`${rightX}px`}
                top={`${rightY}px`}
                w="200px"
                opacity="0.75"
            >
                <img src={speechBubbleRight.src} alt="Speech Bubble" />
                {/* Text inside the speech bubble */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    color="black"
                    fontSize="14px"
                    fontWeight="bold"
                    pb="16px"
                >
                    {rightText}
                </Box>
            </Box>
        </Box>
    )
};

export { DialogueImage };
