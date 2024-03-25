export const dialogueSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Title"
    },
    dialogues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          speaker: {
            type: "string",
            description: "Speaker"
          },
          text: {
            type: "string",
            description: "Text"
          },
        },
        required: ["speaker", "text"],
      },
    },
  },
  required: ["title", "dialogues"],
};
