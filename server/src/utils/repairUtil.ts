import { jsonrepair } from "jsonrepair";
import Joi from "joi";

export const parseAndRepair = (jsonString: string) => {
  const repaired = jsonrepair(jsonString);
  return JSON.parse(repaired);
};

export const processQuestionCompletion = (completion: string) => {
  const json = parseAndRepair(completion);

  const questionSchema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().items(Joi.string()).min(2).max(4).required(),
    answer: Joi.string().required(),
  });

  const rawQuestions: Record<string, any>[] = json.questions.filter(
    (question: Record<string, any>) => {
      const results = questionSchema.validate(question);
      return !results.error;
    }
  );
  const questions = rawQuestions.map((rawQuestion: any) => {
    const question = rawQuestion.question.trim();
    const options = rawQuestion.options.map((o: string) => o.trim());
    const answer = rawQuestion.answer.trim();
    return {
      question,
      options: options.map((o: string) => o),
      answer,
    };
  });

  if (!questions.length)
    throw Error("Parsing Error: parsing results cannot be empty");

  return questions;
};
