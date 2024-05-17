import React, { useState, FormEvent } from 'react';
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
    Link,
    FormControl,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/store';
import { signIn, signUp } from '@/store/thunks';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignInPage = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((store) => store.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;
        if (!showSignUp) {
            dispatch(signIn({
                body: { email, password }
            }));
        }
        else {
            dispatch(signUp({
                body: { name, email, password }
            }));
        }
    };

    const handleSignUpClick = () => {
        setShowSignUp(!showSignUp);
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
                <Heading color="teal.400">Welcome to AI Listen</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            {showSignUp &&
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                        />
                                        <Input type="text" placeholder="User Name" name="name" />
                                    </InputGroup>
                                </FormControl>
                            }
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    //children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="email" placeholder="Email address" name="email" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    //children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                {showSignUp ? ("Sign Up") : "Login"}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                {!showSignUp ? ("New to us?") : "Have an account?"}
                {" "}
                <Link color="teal.500" onClick={handleSignUpClick}>
                    {showSignUp ? ("Login") : "Sign Up"}
                </Link>
            </Box>

            {auth.error &&
                <Box textColor={"red"}>
                    {auth.error}
                </Box>}
        </Flex>
    );
};

export default SignInPage;
