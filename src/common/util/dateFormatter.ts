export class DateFormatter extends Date {
  // request a weekday along with a long date
  toEnglishDateString = (): string => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return this.toLocaleDateString('en-US', options);
  };
}
