import { isValidURL } from './urlValidation';

describe('Yup hyperlink validation', () => {
  it('accepts correctly formatted URLs', async () => {
    const validURLs = [
      'https://www.sample.com',
      'http://www.sample.com',
      'https://sample.com',
      'http://sample.com',
      'www.sample.com',
      'sample.com'
    ];

    validURLs.forEach((url) => {
      expect(isValidURL(url)).toBeTruthy();
    });
  });

  it('rejects poorly formatted URLs', () => {
    const badURLs = [
      'https://www.sample',
      'http://www.sample',
      'https://sample',
      'http://sample',
      'www.sample',
      'sample',
      'hp://sample.com',
      'http:sample.com',
      '://sample.com'
    ];

    badURLs.forEach((url) => {
      expect(isValidURL(url)).toBeTruthy();
    });
  });
});
