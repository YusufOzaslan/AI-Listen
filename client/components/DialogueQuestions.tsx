import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button, Box, FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { IContentDialogue } from "@/store/slices/content.slice"
import { useApi } from '@/hooks';
import { generateQuestions } from '@/store/thunks';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store';
import dotenv from 'dotenv';
dotenv.config();


interface IProps {
  isGenerating: boolean
  content: IContentDialogue;
}

const DialogueQuestions: React.FC<IProps> = ({ isGenerating, content }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((store) => store.content.dataQuestions);
  const appApi = useApi();
  const initialValues = {
    numberOfQuestions: 3,
  };

  const numberOfQuestionsOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' }
  ];


  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => { }
  });


  const handleSubmit = async (numberOfQuestions: any) => {
    await dispatch(
      generateQuestions({
        contentId: content._id!,
        body: {
          numberOfQuestions: numberOfQuestions.value,
        },
        axios: appApi
      }),
    );
  }

  return (
    <Box alignItems="center" height="auto" width="60%" maxW="lg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
      <form >
        <FormControl mb="4">
          <FormLabel>Number Of Questions</FormLabel>
          <Select
            placeholder="Select number of questions"
            onChange={(selectedOption) => formik.setFieldValue('numberOfQuestions', selectedOption)}
            options={numberOfQuestionsOptions}
          />
        </FormControl>
        <Box textAlign="center">
          <Button isLoading={isGenerating} colorScheme="green" mt="4"
            onClick={() => handleSubmit(formik.values.numberOfQuestions)}>Generate Questions</Button>
        </Box>
      </form>
    </Box>
  );
}

export default DialogueQuestions;
