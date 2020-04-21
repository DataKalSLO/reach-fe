import { isValidURL, recoverURL } from './urlValidation';

describe('Hyperlink validation', () => {
  const goodURLs = [
    'https://www.sample.com',
    'http://www.sample.com',
    'https://sample.com',
    'http://sample.com',
    'https://www.sample',
    'http://www.sample'
  ];

  const badURLs = [
    'www.sample.com',
    'sample.com',
    'https://sample',
    'http://sample',
    'www.sample',
    'sample',
    'sample.',
    'hp://sample.com',
    'http:sample.com',
    '://sample.com',
    '',
    ' ',
    'http://',
    'https:// '
  ];

  const recoverableURLs = [
    ['sample.com', 'http://sample.com'],
    ['www.sample.com', 'http://www.sample.com'],
    ['www.sample', 'http://www.sample']
  ];

  const unrecoverableURLs = [
    'sample',
    'sample.',
    'hp://sample.com',
    'http:sample.com',
    '://sample.com',
    '',
    ' ',
    'http://',
    'https:// '
  ];

  it.each(goodURLs)('Accepts %s as a correctly formatted URL', async url => {
    isValidURL(url).then(result => expect(result).toBeTruthy());
  });

  it.each(badURLs)('Rejects %s as a poorly formatted URL', async url => {
    isValidURL(url).then(result => expect(result).toBeFalsy());
  });

  it.each(recoverableURLs)(
    'Recovers %s, corrects it to %s',
    async (original, expected) => {
      recoverURL(original).then(result => expect(result).toEqual(expected));
    }
  );

  it.each(unrecoverableURLs)('Fails to recover %s', async url => {
    recoverURL(url).then(result => expect(result).toBeUndefined());
  });
});
