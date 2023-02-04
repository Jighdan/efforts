export const getLocaleDate = (date = new Date(), locale = 'en-us') => {
  const month = date.toLocaleDateString(locale, { month: 'short' });
  const day = date.toLocaleDateString(locale, { day: '2-digit' });
  const weekday = date.toLocaleDateString(locale, { weekday: 'long' });

  return { month, day, weekday };
};

export const getLocaleTime = (date = new Date(), locale = 'en-us') => {
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

export const getDateStartTime = (date = new Date()) => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export const getDateEndTime = (date = new Date()) => {
  date.setUTCHours(23,59,59,999);
  return date;
};
