export const toNumber = (stringNumber?: string): number => {
  if (!stringNumber) {
    return 0;
  }

  return parseInt(stringNumber, 10);
}
