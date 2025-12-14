export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

