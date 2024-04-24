import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
import { DialogueImage } from "@/components/DialogueImage";


const ImagePage = () => {
  const router = useRouter();
  const content = useAppSelector((store) => store.content);
  if (!content.data?.imageData) {
    return <>Image not found</>;
  }

  return (
    <DialogueImage image={content.data?.imageData?.image} faces={content.data?.imageData?.faces} />
  );
};


export default ImagePage;
