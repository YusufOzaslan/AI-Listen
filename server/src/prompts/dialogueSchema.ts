export const dialogueSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    scene: {
      type: "array",
      minItems: 8, // ?
      items: {
        type: "object",
        properties: {
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
        required: ["dialogues"],
      },
    },
  },
  required: ["title", "scenes"],
};
