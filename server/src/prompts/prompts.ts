export const dialoguePrompt =
  "Create the listening script to align with the chosen ${level} CEFR level, ${ageGroup} age group, and ${ideaGenerator} selection with a total of ${numberOfWords} words. Incorporate specified ${listeningTaskOptions}, ${listeningTaskCategories}, context ${ideaGenerator}, and vocabulary ${wordsforScript}. The script should be crafted to reflect the ${ideaGenerator} Idea Generator's theme, adhering to the educational goals and engaging the specified ${ageGroup} age group. Depending on the selection, create a script that fits a monologue or dialogue format, ensuring it's tailored to the ${listeningTaskOptions} listening task and ${listeningTaskCategories} layout preferences. The number of words should never exceed ${numberOfWords}. This is a function call. Make a return in accordance with the submitted scheme.";
export const questionsPromt =
  "Listening dialogue: ${text}\n\nBased on the listening dialogue, create ${numberOfQuestions} multiple-choice questions suitable for English education at ${level} level, with their respective options and correct answers. There should be 4 options. Options should only contain the answer content. ";
export const ideaPrompt =
  "Create three distinct and engaging topic ideas for ${listeningTaskOptions} within the ${listeningTaskCategories} category, aimed at ${ageGroup} learners at the ${level} CEFR level. For each topic, offer a concise and short description that integrates the ${ideaGenerator} and is designed to incorporate ${numberOfWords} effectively. These ideas should inspire listening scripts that are culturally inclusive, educationally enriching, and perfectly aligned with the learners' linguistic and developmental stage, utilizing specific vocabulary or themes as provided. While you are generating the ideas, consider the user selected ${level} level and make this appropriate according to your knowledge based. The ideas together with idea title should not exceed 40 words maximum. This is a function call. Make a return in accordance with the submitted scheme.";

export const imagePrompt =
  "Create a image suitable for the dialogue produced for the English listening activity. There must be two people in the picture. The faces of the people speaking must be visible in the image. They should talk while looking at each other. Dialogue: ${content}\n\nThe gender of the speaker named ${name1} should be ${gender1} and should be on the left side of the picture, the gender of the speaker named ${name2} should be ${gender2} and should be positioned on the right side of the picture.\nThere should be no speech bubbles in the image.";
