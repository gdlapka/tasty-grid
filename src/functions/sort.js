import naturalCompare from 'natural-compare';

export const compare = field => {
  return (a, b) => {
    const aField = a?.[field];
    const bField = b?.[field];
    return naturalCompare(aField, bField);
  }
}
