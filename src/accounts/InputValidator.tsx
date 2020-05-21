export function isValidEmail(emailName: string): boolean {
  const emailValidRegex = new RegExp('(?=.*[@])(?=.*[.])');
  return emailValidRegex.test(emailName);
}

export function isValidPassword(passwordVal: string): boolean {
  const passwordStrengthRegex = new RegExp(
    '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
  );
  return passwordStrengthRegex.test(passwordVal);
}
