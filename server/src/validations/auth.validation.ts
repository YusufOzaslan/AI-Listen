import Joi from "joi";

const signUp = {
  body: {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  },
};

const signIn = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

export const authValidation = {
  signUp,
  signIn,
};
