import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useAppSelector } from "@/store";
import speechBubbleleft from "@/statics/speech-bubble-left.png";
import speechBubbleRight from "@/statics/speech-bubble-right.png";

const ImagePage = () => {
  const router = useRouter();
  const content = useAppSelector((store) => store.content);
  const [coordinatesLeft, setCoordinatesLeft] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [coordinatesRight, setCoordinatesRight] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // İnsan kafalarının koordinatlarını almak için gerekli işlemleri burada yapabilirsiniz.
    // Örnek olarak, varsayılan koordinatlar { x: 100, y: 100 } olarak ayarlandı.
    // Gerçek koordinatlarınızı belirlemek için projenize uygun bir yöntem kullanabilirsiniz.
    // Bu örnekte, sabit koordinatlar kullanılıyor.
    setCoordinatesLeft({ x: 750, y: 10 });
    setCoordinatesRight({ x: 900, y: 150 });
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <img
        src={content.data?.image}
        alt="Dialogue Image"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      {/* İlk kişinin baloncuk */}
      <Box
        position="absolute"
        left={`${coordinatesLeft.x}px`}
        top={`${coordinatesLeft.y}px`}
        style={{ maxWidth: "250px" }}
      >
        <img src={speechBubbleleft.src} alt="Speech Bubble" style={{ maxWidth: "100%", height: "auto" }} />
        {/* Baloncuk içindeki metin */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="black"
          fontSize="16px"
          fontWeight="bold"
        >
          Hello, how are you?
        </Box>
      </Box>
      {/* İkinci kişinin baloncuk */}
      <Box
        position="absolute"
        left={`${coordinatesRight.x}px`}
        top={`${coordinatesRight.y}px`}
        style={{ maxWidth: "250px" }}
      >
        <img src={speechBubbleRight.src} alt="Speech Bubble" style={{ maxWidth: "100%", height: "auto" }} />
        {/* Baloncuk içindeki metin */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="black"
          fontSize="16px"
          fontWeight="bold"
        >
          I'm fine, thank you!
        </Box>
      </Box>
    </Box>
  );
};

export default ImagePage;
