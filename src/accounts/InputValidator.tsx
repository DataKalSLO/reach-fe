export function isValidEmail(emailName: string): boolean {
  // source: https://www.w3resource.com/javascript/form/email-validation.php
  const emailValidRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return emailValidRegex.test(emailName);
}

export function isValidPassword(passwordVal: string): boolean {
  const passwordStrengthRegex = new RegExp(
    '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
  );
  return passwordStrengthRegex.test(passwordVal);
}
