import { isValidEmail, isValidPassword } from '../InputValidator';

describe('validateInputEmail', () => {
  it('succeeds for valid emails', () => {
    expect(isValidEmail('test@gmail.com')).toEqual(true);
    expect(isValidEmail('test123@fake.com')).toEqual(true);
    expect(isValidEmail('my.site@you.me.net')).toEqual(true);
  });

  it('fails for invalid emails', () => {
    expect(isValidEmail('')).toEqual(false);
    expect(isValidEmail('1234')).toEqual(false);
    expect(isValidEmail('invalid...')).toEqual(false);
    expect(isValidEmail('invalid@com')).toEqual(false);
    expect(isValidEmail('invalid@com.')).toEqual(false);
    expect(isValidEmail('invalid.com')).toEqual(false);
    expect(isValidEmail('@.')).toEqual(false);
    expect(isValidEmail('nodomain@.com')).toEqual(false);
    expect(isValidEmail('@gmail.com')).toEqual(false);
    expect(isValidEmail('double..dot@gmail.com')).toEqual(false);
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
