export const toLocaleDate = (date) => {
  return date.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Moscow',
  });
};
