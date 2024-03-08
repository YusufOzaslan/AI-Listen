export const ideaSchema = {
  type: "object",
  properties: {
    ideas: {
      type: "array",
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        required: ["title", "description"],
      },
    },
  },
  required: ["ideas"],
};
