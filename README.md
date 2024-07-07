# Listening Skills Development Application

This application provides a platform for English teachers to create customized lesson materials to help their students improve their listening skills and share these materials with their students. The platform offers dialogue texts generated with the OpenAI GPT-4 model and content voiced with Microsoft Azure's text-to-speech service, aiming to enhance users' listening skills. In addition to listening activities, the application includes tools that generate questions suitable for the produced content, helping students reinforce their learning processes.

## Technologies Used

- **OpenAI GPT-4**: For dialogue text generation. This advanced language model helps create realistic and contextually relevant dialogues.
- **Microsoft Azure Text-to-Speech**: For converting text to speech. It provides voices to enhance the listening experience.
- **YOLOv8-face**: For face detection in visuals. This model detects faces in the generated images to accurately position speech bubbles.
- **Next.js**
- **Node.js**
- **MongoDB**
- **Docker**

## System Architecture

![System Architecture](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/6cfde0fc-b751-4fca-8639-0b096f405c36)

## Features

1. **Dialogue Text Generation:**
   Inputs are taken to produce customized content, and these inputs are used to generate dialogue texts.
   
   ![Dialogue Text Generation](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/067d95ce-fbab-48f2-a4a2-1d3e5a374c12)

2. **Voice Selection:**
   Separate voice selections are made for the two people in the generated dialogue. There are nine different voice samples, four male and five female. The desired voice is selected by listening to these samples, and the dialogue voicing step is completed.
   
   ![Voice Selection](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/96f863b1-8d44-478d-8184-5eb86dc08cbd)

3. **Visual Production:**
   A visual suitable for the content of the dialogue is produced.
   
   ![Visual Production](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/c3570e15-7234-49b9-87d5-43d30d44eaf7)

4. **Face Detection:**
   The faces of the two people speaking in the produced visual are detected. Face detection is done to position the speech bubbles. The YOLOv8-face model is used for face detection.
   
   ![Face Detection](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/a2ef3329-8afa-4030-ae1d-e94939f4b810)

5. **Question Generation:**
   Questions suitable for the content are generated. The number of questions to be produced is selected, and the selected number of questions is generated.
   
   ![Question Generation](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/dbb82c62-b770-44e6-8351-63e3f31b3df3)

6. **Exam Creation:**
   The produced content is accessed from the "My Content" page. On this page, the teacher reviews the content and creates an exam by clicking the create exam button. After the exam is created, the exam link is shared, allowing students to take the exam.
   
   ![Exam Creation](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/3ba7e5cb-2201-4e3c-975f-ca03975858ff)

7. **Exam Tracking:**
   The exam information of students who take the exam is tracked from the "My School" page.
   
   ![Exam Tracking](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/69953793-ca57-4ccc-94c5-9ea3a84ef40a)
   
   ![Exam Tracking](https://github.com/YusufOzaslan/hotel-booking/assets/74647471/173fb640-d00d-40cd-8bf1-489e49d2b37b)
