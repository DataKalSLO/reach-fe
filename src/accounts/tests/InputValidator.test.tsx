import { isValidEmail, isValidPassword } from '../InputValidator';

describe('validateInputEmail', () => {
  it('succeed for valid email', () => {
    expect(isValidEmail('test@gmail.com')).toEqual(true);
  });

  it('fails for invalid email', () => {
    expect(isValidEmail('invalid...')).toEqual(false);
  });

  it('fails for invalid email', () => {
    expect(isValidEmail('invalid@com')).toEqual(false);
  });

  it('fails for invalid email', () => {
    expect(isValidEmail('invalid.com')).toEqual(false);
  });
});

describe('validateInputPassword', () => {
  it('succeed for valid password', () => {
    expect(isValidPassword('abc456!')).toEqual(true);
  });

  it('fails for invalid password', () => {
    expect(isValidPassword('password')).toEqual(false);
  });
});
