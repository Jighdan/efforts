export const getLocaleDate = (date = new Date(), locale = 'en-us') => {
  const month = date.toLocaleDateString(locale, { month: 'short' });
  const day = date.toLocaleDateString(locale, { day: '2-digit' });
  const weekday = date.toLocaleDateString(locale, { weekday: 'long' });

  return { month, day, weekday };
};
