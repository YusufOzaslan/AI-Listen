import * as Yup from "yup";

export const formValidation = {
  schema: Yup.object().shape({
    level: Yup.string()
      .oneOf(["A1", "A2", "B1", "B2", "C1", "C2"])
      .required("Level is required"),
    ageGroup: Yup.string()
      .oneOf([
        "Young Learners 7-12",
        "Teens 13-18",
        "Adult & Young Adults 19-35",
      ])
      .required("Age group is required"),

    numberOfWords: Yup.string().required("Number of words is required"),
    listeningTaskOption: Yup.string().required("Number of words is required"),
    listeningTaskCategory: Yup.string().required("Number of words is required"),
  }),
  initialValues: {
    level: "",
    ageGroup: "",
    numberOfWords: "",
    listeningTaskOption: "",
    listeningTaskCategory: "",
    listeningTopic: "",
    idea: "",
    wordsForScript: "",
  },
};
