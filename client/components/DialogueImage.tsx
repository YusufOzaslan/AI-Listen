import { FC } from 'react';
import { Box } from "@chakra-ui/react";
import { IFaceCoordinates } from '@/store/slices';
import speechBubbleleft from "@/statics/speech-bubble-left.png";
import speechBubbleRight from "@/statics/speech-bubble-right.png";

interface IProps {
    image: string;
    faces: IFaceCoordinates[];
}

const DialogueImage: FC<IProps> = ({ image, faces }) => {
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
            width="1024px"
            height="1024px"
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
                    fontSize="16px"
                    fontWeight="bold"
                    pb="12px"
                >
                    Hello, how are you?
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
                    fontSize="16px"
                    fontWeight="bold"
                    pb="12px"
                >
                    I'm fine, thank you!
                </Box>
            </Box>
        </Box>
    )
};

export { DialogueImage };
