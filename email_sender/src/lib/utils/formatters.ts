export const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

export const formatNumber = (num: number) => {
  return num.toLocaleString();
};
