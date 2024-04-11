import React from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { useAppSelector } from "@/store";

const ImagePage = () => {
  const router = useRouter();
  const content = useAppSelector((store) => store.content);
console.log(content.data)
  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <img src={content.data?.image!} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </Box>
  );
};

export default ImagePage;
