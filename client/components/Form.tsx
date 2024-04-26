import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Button, Box, FormControl, FormLabel, Textarea, Center } from '@chakra-ui/react';
import Select from 'react-select';
import { level, ageGroup, listeningTaskOptions, listeningCategoriesMap, TaskOptionType, numberOfWordsOptions } from './constant';
import { formValidation } from '@/validations';
import { generateIdeas, generateDialogue } from '@/store/thunks';
import { useApi } from '@/hooks';
import {
    useAppDispatch,
    useAppSelector,
} from '@/store';
import { formActionCreators } from '@/store/slices';
import dotenv from 'dotenv';
dotenv.config();

function Form() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const contentForm = useAppSelector((store) => store.form);
    const content = useAppSelector((store) => store.content);
    const appApi = useApi();
    const initialValues = {
        level: '',
        ageGroup: '',
        numberOfWords: '',
        listeningTaskOption: '',
        listeningTaskCategory: '',
        listeningTopic: '',
        idea: '',
        wordsForScript: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: formValidation.schema,
        onSubmit: values => {
        }
    });

    const updateListeningCategories = (taskOption: TaskOptionType) => {
        const categories = listeningCategoriesMap[taskOption] || [];
        formik.setFieldValue('listeningTaskOption', taskOption);
        formik.setFieldValue('listeningTaskCategory', categories[0] || '');
    };

    const handleTaskOptionChange = (selectedtaskOption: any) => {
        updateListeningCategories(selectedtaskOption.value);
    };

    const handleGenerateIdea = async (values: typeof formValidation.initialValues) => {
        await dispatch(
            generateIdeas({
                body: {
                    level: values.level!,
                    ageGroup: values.ageGroup!,
                    numberOfWords: values.numberOfWords!,
                    listeningTaskOptions: values.listeningTaskOption!,
                    listeningTaskCategories: values.listeningTaskCategory!,
                    ideaGenerator: values.idea!
                },
                axios: appApi
            }),
        );
    };

    const handleSubmit = async (values: typeof formValidation.initialValues) => {
        await dispatch(
            generateDialogue({
                body: {
                    level: values.level!,
                    ageGroup: values.ageGroup!,
                    numberOfWords: values.numberOfWords!,
                    listeningTaskOptions: values.listeningTaskOption!,
                    listeningTaskCategories: values.listeningTaskCategory!,
                    ideaGenerator: values.idea!,
                    wordsforScript: values.wordsForScript!,
                },
                axios: appApi
            }),
        );
        dispatch(formActionCreators.updateStepIndex(contentForm.stepIndex + 1))
    }

    const handleGenerateIdeaClick = async () => {
        await handleGenerateIdea(formik.values);
    };

    return (
        <Box alignItems="center" height="auto" width="30%" overflowY="auto" >
            <Box maxW="lg" mx="auto" p="4" borderWidth="2px" borderRadius="lg" bg="white" boxShadow="md">
                <form >
                    <FormControl mb="4">
                        <FormLabel>Level</FormLabel>
                        <Select
                            placeholder="Select level"
                            onChange={(selectedOption) => formik.setFieldValue('level', selectedOption?.value)}
                            options={level.map((option) => ({ value: option.value, label: option.label }))}
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Age Group</FormLabel>
                        <Select
                            placeholder="Select age group"
                            onChange={(selectedOption) => formik.setFieldValue('ageGroup', selectedOption?.value)}
                            options={ageGroup.map((option) => ({ value: option.value, label: option.label }))}
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Number Of Words</FormLabel>
                        <Select
                            placeholder="Select number of words"
                            onChange={(selectedOption) => formik.setFieldValue('numberOfWords', selectedOption?.value)}
                            options={numberOfWordsOptions.map((option) => ({ value: option, label: option }))}
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Listening Task Options</FormLabel>
                        <Select
                            placeholder="Choose a Listening Task"
                            onChange={(selectedOption) => handleTaskOptionChange(selectedOption)}
                            options={listeningTaskOptions.map((option) => ({ value: option.value, label: option.label }))}
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Listening Task Categories</FormLabel>
                        <Select
                            placeholder="Choose a Listening Category"
                            onChange={(selectedOption) => formik.setFieldValue('listeningTaskCategory', selectedOption?.value)}
                            options={listeningCategoriesMap[formik.values.listeningTaskOption]?.map((category) => ({ value: category, label: category }))
                            }
                        />
                    </FormControl>
                    <FormControl mb="4">
                        <FormLabel>Listening Topic - Idea Generator</FormLabel>
                        <Textarea placeholder="Enter your keywords (e.g., concert, teamwork, holiday) and click on the dice to generate creative ideas for your listening task."
                            onChange={formik.handleChange}
                            value={formik.values.listeningTopic}
                            name="listeningTopic" />
                    </FormControl>
                    <Box textAlign="right">
                        <Button isLoading={contentForm.isGenerating} colorScheme="blue" mt="4" onClick={handleGenerateIdeaClick}>Generate Ideas</Button>
                    </Box>
                    <Box textAlign="center">
                        <FormControl mb="4" textAlign="left">
                            <FormLabel>Idea</FormLabel>
                            <Select
                                placeholder="Choose an idea"
                                onChange={(selectedOption: any) => formik.setFieldValue('idea', selectedOption.value)}
                                options={contentForm.fetchedData?.ideas?.map((option) => ({
                                    value: option.description,
                                    label: (
                                        <span>
                                            <strong>{option.title}:</strong> {option.description}
                                        </span>
                                    )
                                }))} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Words For Script</FormLabel>
                            <Textarea placeholder="Words provided here will be used as a part of listening script."
                                onChange={formik.handleChange}
                                value={formik.values.wordsForScript}
                                name="wordsForScript" />
                        </FormControl>
                        <Button isLoading={content.isGenerating} colorScheme="blue" mt="4"
                            onClick={() => handleSubmit(formik.values)}>Next</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Form;
