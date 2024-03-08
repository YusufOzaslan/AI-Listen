interface Form {
    title: string;
    level: string;
    ageGroup: string;
    numberOfWords: number;
    listeningTaskOptions: string;
    listeningTaskCategories: string;
    idea: string;
    ideaGenerator: string;
    wordsforScript: string;
  }
  
  export interface IFormFetchedThreeIdeas {
    ideas: Array<{
      title: string;
      description: string;
    }>;
  }
  
  export interface IForm extends Partial<Form> {}
  