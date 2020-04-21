import { object, string } from 'yup';

const urlSchema = object().shape({
  url: string().url()
});

// URLs must start with http:// or https://
// It may contain www or omit it
// Domain extensions are *not* enforced
// Good URL examples: https://www.sample.com, http://sample.com, http://www.sample
// Bad URL examples: www.sample.com, sample.com, hp://sample
const isValidURL = async (url: string): Promise<boolean> => {
  if (url === '') {
    return false;
  }
  return await urlSchema.isValid({ url: url });
};

// Prepend 'http://' to attempt to correct the URL
// On success, return the corrected URL
// On failure, return undefined
const recoverURL = async (url: string): Promise<string | undefined> => {
  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    const recoveredURL = 'http://' + url;
    if (await isValidURL(recoveredURL)) {
      return recoveredURL;
    }
  }
  return undefined;
};

export { isValidURL, recoverURL };
