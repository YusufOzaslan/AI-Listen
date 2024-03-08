import React from 'react';
import { useFormik } from 'formik';
import { Button, Box, FormControl, FormLabel, FormHelperText, Textarea, Select } from '@chakra-ui/react';
import { level, ageGroup, listeningTaskOptions, listeningCategoriesMap, TaskOptionType, numberOfWordsOptions } from './constant';
import { formValidation } from '@/validations';

function Form() {
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
            console.log(values);
            // Burada formun gönderilmesi işlemleri yapılabilir
        }
    });

    const updateListeningCategories = (taskOption: TaskOptionType) => {
        const categories = listeningCategoriesMap[taskOption] || [];
        formik.setFieldValue('listeningTaskOption', taskOption);
        formik.setFieldValue('listeningTaskCategory', categories[0] || '');
    };

    const handleTaskOptionChange = (selectedtaskOption: any) => {
        console.log(selectedtaskOption)
        console.log(selectedtaskOption.value)
        updateListeningCategories(selectedtaskOption.value);
    };
    
    const handleGenerateIdea = () => {
        console.log('Generate Idea button clicked');
    };

    return (
        <Box bg="gray.200" minHeight="100vh" py="20">
            <Box maxW="md" mx="auto" p="4" borderWidth="1px" borderRadius="lg" bg="white" boxShadow="md">
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mb="4">
                        <FormLabel>Level</FormLabel>
                        <Select placeholder="Select level" onChange={(event) => formik.setFieldValue('level', event.target.value)}>
                            {level.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Age Group</FormLabel>
                        <Select placeholder="Select age group" onChange={(event) => formik.setFieldValue('ageGroup', event.target.value)}>
                            {ageGroup.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Number Of Words</FormLabel>
                        <Select placeholder="Select number of words" onChange={(event) => formik.setFieldValue('numberOfWords', event.target.value)}>
                            {numberOfWordsOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Listening Task Options</FormLabel>
                        <Select placeholder="Select task option" onChange={(event) => handleTaskOptionChange(event.target)}>
                            {listeningTaskOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Listening Task Categories</FormLabel>
                        <Select placeholder="Select task category" onChange={(event) => formik.setFieldValue('listeningTaskCategory', event.target.value)}>
                            {listeningCategoriesMap[formik.values.listeningTaskOption]?.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl mb="4">
                        <FormLabel>Listening Topic - Idea Generator</FormLabel>
                        <Textarea placeholder="Write something here..."
                            onChange={formik.handleChange}
                            value={formik.values.listeningTopic}
                            name="listeningTopic" />
                    </FormControl>

                    <Box textAlign="right">
                        <Button colorScheme="blue" mt="4" onClick={handleGenerateIdea}>Generate Ideas</Button>
                    </Box>

                    <Box textAlign="center">
                        <FormControl mb="4">
                            <FormLabel>Idea</FormLabel>
                            <Select placeholder="Select idea" onChange={(event) => formik.setFieldValue('idea', event.target.value)}>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </Select>
                        </FormControl>

                        <FormControl mb="4">
                            <FormLabel>Words For Script</FormLabel>
                            <Textarea placeholder="Write something here..."
                                onChange={formik.handleChange}
                                value={formik.values.wordsForScript}
                                name="wordsForScript" />
                        </FormControl>
                        <Button colorScheme="blue" mt="4" type="submit">Next</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Form;
