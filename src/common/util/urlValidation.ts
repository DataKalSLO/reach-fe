import * as yup from 'yup';

const urlSchema = yup.object().shape({
  url: yup.string().url()
});

const isValidURL = async (url: string): Promise<boolean> => {
  return await urlSchema.isValid({ url: url });
};

export { isValidURL };
