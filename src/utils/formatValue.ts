const formatValue = (value: number): string =>
  Intl.NumberFormat('brl', { currency: 'brl', style: 'currency' }).format(
    value,
  );

export default formatValue;
