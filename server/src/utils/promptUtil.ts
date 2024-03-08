export const replacePromptPlaceholders = (
  promptTemplate: string,
  replacements: Record<string, any>
) =>
  Object.keys(replacements).reduce((acc, key) => {
    const placeholder = new RegExp(`\\\${${key}}`, "g");
    return acc.replace(placeholder, replacements[key]);
  }, promptTemplate);
