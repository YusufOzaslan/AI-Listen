interface Form {
  level: string;
  ageGroup: string;
  numberOfWords: string;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  idea: string;
  ideaGenerator: string;
  wordsForScript: string;
}

export interface IFormFetchedThreeIdeas {
  ideas: Array<{
    title: string;
    description: string;
  }>;
}

export interface IForm extends Partial<Form> {}
