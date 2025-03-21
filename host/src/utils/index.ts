export const getNameIntials = (name: string) => {
  if (!name) return null;

  const nameParts = name.split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2);
  } else {
    return nameParts
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2);
  }
};

export const calculateNights = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  return Math.max(0, nights);
};
