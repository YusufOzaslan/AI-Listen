import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    FormControl,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { startExam } from '@/store/thunks';

export default function ExamStarterPage() {
    const router = useRouter();
    const appApi = useApi();
    const dispatch = useAppDispatch();
    const examStudent = useAppSelector((store) => store.examStudent);

    const CFaUserAlt = chakra(FaUserAlt);
    const CIoSchoolSharp = chakra(IoSchoolSharp);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        const examCode = router.query.id as any;

        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const studentName = formData.get('name') as string;
        const studentNumber = formData.get('studentNumber') as string;
        const response = await dispatch(
            startExam({
                examCode,
                axios: appApi,
                body: {
                    studentName,
                    studentNumber
                },
            }),
        );

        if (response.meta.requestStatus === 'rejected') return;
        router.push(`exam-page`)
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="teal.400">AI Listen Exam</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    //children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="Name" name="name" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    //children={<CIoSchoolSharp color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="Student ID" name="studentNumber" />
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Start Exam
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            {examStudent.error && (
                <Box mt={4}>
                    <p style={{ color: 'red' }}>{examStudent.error}</p>
                </Box>
            )}
        </Flex>
    );
}
