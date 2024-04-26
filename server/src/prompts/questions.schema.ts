export const questionsSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          options: {
            type: "array",
            items: {
              type: "string",
            },
          },
          answer: {
            type: "string",
          },
        },
        required: ["question", "options", "answer"],
      },
    },
  },
  required: ["questions"],
};
