import React, { useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Table, Tbody, Tr, Td, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/store';
import { getExamResults } from '@/store/thunks';
import { useApi } from '@/hooks';

export default function MySchool() {
  const examTeacher = useAppSelector((store) => store.examTeacher);
  const dispatch = useAppDispatch();
  const appApi = useApi();

  useEffect(() => {
    dispatch(getExamResults(appApi));
  }, []);

  return (
    <Accordion allowToggle>
      {examTeacher.examResults?.map((exam, index) => (
        <AccordionItem key={index}>
          <Text>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <b>{exam.examName}</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
            <Text><b>Exam Name:</b> {exam.examName}</Text>
            <Text><b>Content Title:</b> {exam.contentTitle}</Text>
            <Text><b>School:</b> {exam.school}</Text>
            <Text><b>Class:</b> {exam.class}</Text>
            <Text><b>Time Limit:</b> {exam.timeLimitInMinutes} minutes</Text>
            <Text><b>Capacity:</b> {exam.capacity}</Text>
            <Table variant="simple" mt={2}>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Student Name</Td>
                  <Td fontWeight="bold">Student Number</Td>
                  <Td fontWeight="bold">True Answer</Td>
                  <Td fontWeight="bold">False Answer</Td>
                  <Td fontWeight="bold">Start Time</Td>
                  <Td fontWeight="bold">Finish Time</Td>
                </Tr>
                {exam.students.map((student, i) => (
                  <Tr key={i}>
                    <Td>{student.name}</Td>
                    <Td>{student.studentNumber}</Td>
                    <Td>{student.score?.trueCount}</Td>
                    <Td>{student.score?.falseCount}</Td>
                    <Td>{new Date(student.startTime * 1000).toLocaleString()}</Td>
                    <Td>{student.finishTime ? new Date(student.finishTime * 1000).toLocaleString() : '-'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
