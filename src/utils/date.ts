export function isRamadan(date: Date) {
  return getHijriMonth(date) === '9';
}

function getHijriMonth(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const format = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', options);
  const parts = format.formatToParts(date);

  // Extract the month from the formatted parts
  const monthPart = parts.find((part) => part.type === 'month');

  return monthPart ? monthPart.value : '';
}
