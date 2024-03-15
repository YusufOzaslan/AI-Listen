export const dialogueSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    dialogues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          speaker: {
            type: "string",
          },
          text: {
            type: "string",
          },
        },
        required: ["speaker", "text"],
      },
    },
  },
  required: ["title", "dialogues"],
};
