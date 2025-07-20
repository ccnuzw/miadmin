// Common utility functions can be added here
export const formatCurrency = (amount: number, currency: string = '¥') => {
  return `${currency}${amount.toFixed(2)}`;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
