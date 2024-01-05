const CURRENCY8FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "TND",
    style: "currency",
  });
  
  const formatCurrency = (number) => {
    return CURRENCY8FORMATTER.format(number);
  };
  
  export default formatCurrency;
  