import { validateInputEmail, validateInputPassword } from '../InputValidator';

describe('validateInputEmail', () => {
  it('succeed for valid email', () => {
    expect(validateInputEmail('test@gmail.com')).toEqual(true);
  });

  it('fails for invalid email', () => {
    expect(validateInputEmail('invalid...')).toEqual(false);
  });
});

describe('validateInputPassword', () => {
  it('succeed for valid password', () => {
    expect(validateInputPassword('abc456!')).toEqual(true);
  });

  it('fails for invalid password', () => {
    expect(validateInputPassword('password')).toEqual(false);
  });
});
