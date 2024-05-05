import { useRouter } from 'next/router';
import { useState, FormEvent } from 'react';
import { useApi } from '@/hooks';
import { useAppDispatch, useAppSelector, } from '@/store';
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
    const [displayedSegmentIndex, setDisplayedSegmentIndex] = useState(-1);
    const student = router.query.student as any;


    return (<></>
    );
}
