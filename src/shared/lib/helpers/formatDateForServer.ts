export const formatDateForServer = (dateString: string | null | Date): string | null => {
  if (!dateString) return null;
  const date = dateString instanceof Date ? dateString : new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};
