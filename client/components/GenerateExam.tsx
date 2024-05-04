import { useState } from 'react';
import { IExamFormData } from '@/pages/my-content/[id]';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Button,
    FormControl, FormLabel, Input
} from "@chakra-ui/react";

interface IProps {
    onCreateExam: (formData: IExamFormData) => void;
}

const GenerateExam: React.FC<IProps> = ({ onCreateExam }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<IExamFormData>({
        examName: '',
        school: '',
        class: '',
        capacity: 10,
        timeLimitInMinutes: 30,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onCreateExam(formData);
        setIsOpen(false);
    };

    return (
        <>
            <Button bg="rgb(32, 90, 52)" color="white" _hover={{ bg: "rgba(32, 65, 52, 0.8)" }} onClick={() => setIsOpen(true)}>
                Generate Exam
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Generate Exam</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="examName">
                            <FormLabel>Exam Name</FormLabel>
                            <Input type="text" name="examName" value={formData.examName} onChange={handleChange} /> {/* Yeni alan */}
                        </FormControl>
                        <FormControl id="school">
                            <FormLabel>School</FormLabel>
                            <Input type="text" name="school" value={formData.school} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="class">
                            <FormLabel>Class</FormLabel>
                            <Input type="text" name="class" value={formData.class} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="capacity">
                            <FormLabel>Maximum Student Count</FormLabel>
                            <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="timeLimitInMinutes">
                            <FormLabel>Time Limit (in minutes)</FormLabel>
                            <Input type="number" name="timeLimitInMinutes" value={formData.timeLimitInMinutes} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSubmit}>Create Exam</Button>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GenerateExam;
